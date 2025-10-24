import { validateInvoice } from '../lib/validateInvoice'
import { InvoiceData } from '../types'
import { addDays, format } from 'date-fns'

describe('validateInvoice - Unit Tests', () => {
  it('should return null (no errors) for valid data', async () => {
    const validData: InvoiceData = {
      invoiceNumber: 'INV-999',
      invoiceDate: '2025-01-01',
      customerEmail: 'customer@example.com',
    }

    const errors = await validateInvoice(validData)
    expect(errors).toBeNull()
  })

  it('should return error object for duplicate invoice number (async check)', async () => {
    const data: InvoiceData = {
      invoiceNumber: 'INV-001',
      invoiceDate: '2025-01-01',
      customerEmail: 'test@example.com',
    }

    const errors = await validateInvoice(data)
    expect(errors).toEqual({
      invoiceNumber: 'Invoice number is already taken.',
    })
  })

  it('should return multiple validation errors', async () => {
    const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd')

    const data: InvoiceData = {
      invoiceNumber: '',
      invoiceDate: tomorrow,
      customerEmail: 'invalid-email',
    }

    const errors = await validateInvoice(data)
    expect(errors).toEqual({
      invoiceNumber: 'Invoice number is required.',
      invoiceDate: 'Date cannot be in the future.',
      customerEmail: 'Please enter a valid email address.',
    })
  })
})
