'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { invoiceSchema, validateInvoice } from '../lib/validateInvoice'
import { InvoiceData } from '../types'
import { format } from 'date-fns'

export const InvoiceForm = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [createdInvoiceNumbers, setCreatedInvoiceNumbers] = useState<Set<string>>(new Set())

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm<InvoiceData>({
    resolver: yupResolver(invoiceSchema),
    mode: 'onSubmit',
  })

  const watchedFields = watch()
  const isFormValid =
    watchedFields.invoiceNumber?.trim() &&
    watchedFields.invoiceDate?.trim() &&
    watchedFields.customerEmail?.trim()

  const onSubmit = async (data: InvoiceData) => {
    setSubmitSuccess(false)
    clearErrors()

    const validationErrors = await validateInvoice(data, createdInvoiceNumbers)
    if (validationErrors) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setError(field as keyof InvoiceData, {
          type: 'manual',
          message,
        })
      })
      return
    }

    // simulated backend call
    await new Promise((resolve) => setTimeout(resolve, 100))
    setCreatedInvoiceNumbers((prev) => new Set([...prev, data.invoiceNumber.toUpperCase()]))
    setSubmitSuccess(true)
    reset()
  }

  const getTodayDate = () => format(new Date(), 'yyyy-MM-dd')

  const isSubmitDisabled = isSubmitting || !isFormValid || Object.keys(errors).length > 0

  // UI can be componetized here, but for demo purposes and time limits it's kept in the same file
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-blue-200 rounded-lg p-6 shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="invoice-heading"
        noValidate
        className="space-y-6"
      >
        <fieldset className="space-y-4 border-0 p-0 m-0">
          <legend id="invoice-heading" className="text-2xl font-bold mb-2 text-foreground">
            Create New Invoice
          </legend>

          <p className="text-sm text-muted-foreground mb-4">
            Fill in the details to create a new invoice.
          </p>

          <div className="space-y-2">
            <Label htmlFor="invoiceNumber" className="text-foreground font-medium">
              Invoice Number
              <span aria-label="required" className="text-destructive ml-1">
                *
              </span>
            </Label>
            <Input
              id="invoiceNumber"
              type="text"
              placeholder="INV-004"
              aria-required="true"
              aria-invalid={!!errors.invoiceNumber}
              aria-describedby={errors.invoiceNumber ? 'invoiceNumber-error' : undefined}
              disabled={isSubmitting}
              className="text-foreground bg-white border-input focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-zinc-500"
              {...register('invoiceNumber')}
            />
            {errors.invoiceNumber && (
              <p
                id="invoiceNumber-error"
                role="alert"
                className="text-sm text-destructive mt-1 font-medium"
                aria-live="polite"
              >
                {errors.invoiceNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoiceDate" className="text-foreground font-medium">
              Invoice Date
              <span aria-label="required" className="text-destructive ml-1">
                *
              </span>
            </Label>
            <Input
              id="invoiceDate"
              type="date"
              max={getTodayDate()}
              aria-required="true"
              aria-invalid={!!errors.invoiceDate}
              aria-describedby={errors.invoiceDate ? 'invoiceDate-error' : undefined}
              disabled={isSubmitting}
              className="text-foreground bg-white border-input focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              {...register('invoiceDate')}
            />
            {errors.invoiceDate && (
              <p
                id="invoiceDate-error"
                role="alert"
                className="text-sm text-destructive mt-1 font-medium"
                aria-live="polite"
              >
                {errors.invoiceDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail" className="text-foreground font-medium">
              Customer Email
              <span aria-label="required" className="text-destructive ml-1">
                *
              </span>
            </Label>
            <Input
              id="customerEmail"
              type="email"
              placeholder="customer@example.com"
              aria-required="true"
              aria-invalid={!!errors.customerEmail}
              aria-describedby={errors.customerEmail ? 'customerEmail-error' : undefined}
              disabled={isSubmitting}
              autoComplete="email"
              className="text-foreground bg-white border-input focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-zinc-500"
              {...register('customerEmail')}
            />
            {errors.customerEmail && (
              <p
                id="customerEmail-error"
                role="alert"
                className="text-sm text-destructive mt-1 font-medium"
                aria-live="polite"
              >
                {errors.customerEmail.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitDisabled}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Validating...' : 'Create Invoice'}
          </Button>

          {submitSuccess && (
            <div
              role="alert"
              data-testid="success-message"
              className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800"
              aria-live="polite"
            >
              <p className="font-medium">Success!</p>
              <p className="text-sm mt-1">Invoice created successfully.</p>
            </div>
          )}
        </fieldset>
      </form>

      <div className="mt-6 pt-6 border-t border-zinc-200">
        <p className="text-sm text-zinc-600 mb-2">
          <strong>Try it:</strong> Existing invoice numbers to test uniqueness check:
        </p>
        <ul className="text-sm text-zinc-600 space-y-1">
          <li>• INV-001 (will show error)</li>
          <li>• INV-002 (will show error)</li>
          {Array.from(createdInvoiceNumbers).map((num) => (
            <li key={num}>• {num} (will show error - created in this session)</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
