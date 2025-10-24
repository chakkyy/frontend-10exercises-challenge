# Exercise 7 Solution: Invoice Form Validation

## Implementation Overview

This solution demonstrates **advanced form validation** with asynchronous checks, real-time error feedback, and comprehensive validation rules:

- ✅ **Async validation** for invoice number uniqueness
- ✅ **Date validation** preventing future dates
- ✅ **Real-time error display** for user correction
- ✅ **Unit tests** with Jest

## Architecture

### File Structure

```
exercise7/
├── components/
│   └── InvoiceForm.tsx         # Form UI component
├── lib/
│   └── validateInvoice.ts      # Validation logic
├── __tests__/
│   └── validateInvoice.test.tsx # Jest unit tests
├── types.ts                    # TypeScript interfaces
├── page.tsx                    # Exercise page
├── solution.md                 # This file
└── README.md                   # Exercise instructions
```

## The Validation Implementation

**Using Yup + React Hook Form + Separate Async Validation**

```typescript
// Yup schema for basic validation
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

// Separate validateInvoice function for async validation
export const validateInvoice = async (
  data: InvoiceData,
  createdInvoiceNumbers: Set<string> = new Set()
): Promise<{ [key: string]: string } | null> => {
  try {
    // yup basic validation
    await invoiceSchema.validate(data, { abortEarly: false })

    // uniqueness async validation
    if (data.invoiceNumber) {
      const isUnique = await checkInvoiceNumberUnique(data.invoiceNumber, createdInvoiceNumbers)
      if (!isUnique) {
        return { invoiceNumber: 'Invoice number is already taken.' }
      }
    }

    return null
  } catch (err) {
    // Handle validation errors...
  }
}
```

**Key Features:**

- Yup schema for sync validation only
- Separate async validation function as required by exercise instructions
- Case-insensitive invoice number checking
- Local state tracking of created invoices
- date-fns for reliable date comparisons

## References

- [HTML5 Date Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
- [ARIA Form Validation](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21)
- [Jest Async Testing](https://jestjs.io/docs/asynchronous)
- [Form Validation UX](https://www.nngroup.com/articles/errors-forms-design-guidelines/)
