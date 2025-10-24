# Exercise 7
**Scenario:**
You need to build a form for a user to create a new invoice. An invoice has three main fields:
* `invoiceNumber`: a string that must be unique.
* `invoiceDate`: a date that cannot be in the future.
* `customerEmail`: a valid email format.

**Task:**
1. Write a function called `validateInvoice(data)` that takes an object containing these three fields and returns an object of validation errors (e.g., `{ invoiceNumber: 'Invoice number is already taken.', invoiceDate: 'Date cannot be in the future.' }`).
2. Your validation logic for `invoiceNumber` should simulate an **asynchronous check** against a backend service to ensure it's unique.
3. Show how you would **display these errors** to the user in the UI, ensuring the user can correct the input and resubmit the form.

