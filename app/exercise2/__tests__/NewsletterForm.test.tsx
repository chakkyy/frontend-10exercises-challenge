import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { NewsletterForm } from '../components/NewsletterForm'

const mockMath = Object.create(global.Math)
mockMath.random = jest.fn(() => 0.5) // Always succeed
global.Math = mockMath

describe('NewsletterForm', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders form with proper accessibility', () => {
    render(<NewsletterForm />)

    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    expect(screen.getByLabelText('required')).toHaveTextContent('*')
  })

  it('shows success message for valid email', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<NewsletterForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole('button', { name: /subscribe/i })

    await user.type(emailInput, 'test@example.com')
    await user.click(submitButton)

    jest.advanceTimersByTime(1200)

    expect(await screen.findByRole('alert')).toHaveTextContent('Success!')
    expect(emailInput).toHaveValue('')
  })

  it('shows error for invalid email', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<NewsletterForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole('button', { name: /subscribe/i })

    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Please enter a valid email address.'
    )
  })

  it('prevents duplicate email registration', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<NewsletterForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole('button', { name: /subscribe/i })

    await user.type(emailInput, 'test@example.com')
    await user.click(submitButton)
    jest.advanceTimersByTime(1200)

    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument()
    })

    // Try same email again
    await user.type(emailInput, 'test@example.com')
    await user.click(submitButton)

    expect(await screen.findByRole('alert')).toHaveTextContent('This email is already registered.')
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<NewsletterForm />)

    const emailInput = screen.getByLabelText(/email address/i)

    await user.type(emailInput, 'test@example.com')
    await user.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: /subscribing/i })).toBeInTheDocument()
  })
})
