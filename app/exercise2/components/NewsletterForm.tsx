'use client'

import { useState, FormEvent, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type SubmitStatus = 'idle' | 'success' | 'error'
type ValidationError = 'required' | 'invalid' | 'duplicate' | 'network'

interface NewsletterFormState {
  email: string
  isSubmitting: boolean
  submitStatus: SubmitStatus
  validationError: ValidationError | null
  registeredEmails: Set<string>
}

const ERROR_MESSAGES: Record<ValidationError, string> = {
  required: 'Email address is required.',
  invalid: 'Please enter a valid email address.',
  duplicate: 'This email is already registered.',
  network: 'Failed to subscribe. Please try again.',
}

export const NewsletterForm = () => {
  // This ideally should be handled by react-hook-form but for demo purposes useState is fine
  const [state, setState] = useState<NewsletterFormState>({
    email: '',
    isSubmitting: false,
    submitStatus: 'idle',
    validationError: null,
    registeredEmails: new Set(),
  })

  const formRef = useRef<HTMLFormElement>(null)

  // This is a simple email validation but ideally should be handled with react-hook-form and yup for schema validation
  const validateEmail = useCallback(
    (email: string): ValidationError | null => {
      if (!email.trim()) return 'required'

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) return 'invalid'

      if (state.registeredEmails.has(email.toLowerCase())) return 'duplicate'

      return null
    },
    [state.registeredEmails]
  )

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const trimmedEmail = state.email.trim()
      const validationError = validateEmail(trimmedEmail)

      if (validationError) {
        setState((prev) => ({ ...prev, validationError, submitStatus: 'error' }))
        return
      }

      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        validationError: null,
        submitStatus: 'idle',
      }))

      try {
        // Simulate API call with 10% failure rate for testing
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.9) {
              reject(new Error('Network error'))
            } else {
              resolve(void 0)
            }
          }, 1200)
        })

        setState((prev) => ({
          ...prev,
          submitStatus: 'success',
          isSubmitting: false,
          registeredEmails: new Set([...prev.registeredEmails, trimmedEmail.toLowerCase()]),
          email: '',
        }))
      } catch {
        setState((prev) => ({
          ...prev,
          submitStatus: 'error',
          validationError: 'network',
          isSubmitting: false,
        }))
      }
    },
    [state.email, validateEmail]
  )

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setState((prev) => ({
      ...prev,
      email: newEmail,
      validationError: null,
      submitStatus: 'idle',
    }))
  }, [])

  // Focus management for accessibility
  useEffect(() => {
    if (state.submitStatus === 'success') {
      const emailInput = formRef.current?.querySelector('#email-input') as HTMLInputElement
      emailInput?.focus()
    }
  }, [state.submitStatus])

  const hasError = state.validationError !== null
  const errorMessage = state.validationError ? ERROR_MESSAGES[state.validationError] : ''
  const isFormValid = state.email.trim().length > 0

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-blue-200 rounded-lg p-6 shadow-sm">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-labelledby="newsletter-heading"
        aria-describedby="newsletter-description"
        noValidate
        className="space-y-6"
      >
        <fieldset className="space-y-4 border-0 p-0 m-0">
          <legend id="newsletter-heading" className="text-2xl font-bold mb-2 text-foreground">
            Subscribe to Fever Newsletter
          </legend>

          <p id="newsletter-description" className="text-sm text-muted-foreground mb-4">
            Get the latest updates and exclusive content delivered to your inbox.
          </p>

          <div className="space-y-2">
            <Label htmlFor="email-input" className="text-foreground font-medium">
              Email Address
              <span aria-label="required" className="text-destructive ml-1">
                *
              </span>
            </Label>

            <Input
              id="email-input"
              type="email"
              name="email"
              value={state.email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              required
              aria-required="true"
              aria-invalid={hasError}
              aria-describedby={`newsletter-description${hasError ? ' email-error' : ''}`}
              disabled={state.isSubmitting}
              autoComplete="email"
              className="text-foreground bg-white border-input focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-zinc-500"
            />

            {hasError && (
              <p
                id="email-error"
                role="alert"
                className="text-sm text-destructive mt-1 font-medium"
                aria-live="polite"
              >
                {errorMessage}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={state.isSubmitting || !isFormValid}
            aria-busy={state.isSubmitting}
          >
            {state.isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>

          {state.submitStatus === 'success' && (
            <div
              role="alert"
              className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800"
              aria-live="polite"
            >
              <p className="font-medium">Success!</p>
              <p className="text-sm mt-1">
                You&apos;ve been successfully subscribed to our newsletter.
              </p>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  )
}
