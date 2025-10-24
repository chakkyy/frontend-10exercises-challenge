import * as yup from 'yup'
import { isAfter, startOfToday } from 'date-fns'
import { InvoiceData } from '../types'

// Static existing invoice numbers (for demo purposes)
const staticExistingNumbers = new Set(['INV-001', 'INV-002'])

// Async validation for invoice number uniqueness
export const checkInvoiceNumberUnique = async (
  invoiceNumber: string,
  createdInvoiceNumbers: Set<string> = new Set()
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const normalizedNumber = invoiceNumber.toUpperCase()
  return (
    !staticExistingNumbers.has(normalizedNumber) && !createdInvoiceNumbers.has(normalizedNumber)
  )
}

export const invoiceSchema = yup.object().shape({
  invoiceNumber: yup.string().required('Invoice number is required.'),
  invoiceDate: yup
    .string()
    .required('Invoice date is required.')
    .test('not-future', 'Date cannot be in the future.', (value) => {
      if (!value) return true
      const inputDate = new Date(value)
      return !isAfter(inputDate, startOfToday())
    }),
  customerEmail: yup
    .string()
    .required('Customer email is required.')
    .email('Please enter a valid email address.'),
})

export const validateInvoice = async (
  data: InvoiceData,
  createdInvoiceNumbers: Set<string> = new Set()
): Promise<{ [key: string]: string } | null> => {
  try {
    await invoiceSchema.validate(data, { abortEarly: false })

    if (data.invoiceNumber) {
      const isUnique = await checkInvoiceNumberUnique(data.invoiceNumber, createdInvoiceNumbers)
      if (!isUnique) {
        return {
          invoiceNumber: 'Invoice number is already taken.',
        }
      }
    }

    return null
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors: { [key: string]: string } = {}
      err.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message
        }
      })
      return errors
    }
    throw err
  }
}
