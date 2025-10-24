# Exercise 6 Solution: Testing Strategy

## Implementation Overview

This solution demonstrates **comprehensive testing strategies** for a profile update feature using:

- ✅ **Jest** for unit tests (isolated function testing)
- ✅ **Playwright** for E2E tests (user flow testing)
- ✅ Success and failure scenario coverage
- ✅ Input validation and error handling
- ✅ TypeScript type safety

## Architecture

### File Structure

```
exercise6/
├── components/
│   └── ProfileUpdateDemo.tsx  # Demo UI component
├── lib/
│   └── updateProfile.ts       # Core function to test
├── __tests__/
│   └── updateProfile.test.tsx # Jest unit tests
├── e2e/
│   └── updateProfile.spec.ts  # Playwright E2E tests
├── types.ts                   # TypeScript interfaces
├── page.tsx                   # Exercise page
├── solution.md                # This file
└── README.md                  # Exercise instructions
```

## The Function Under Test

**`updateProfile(data: ProfileData): Promise<ProfileUpdateResponse>`**

```typescript
export const updateProfile = async (data: ProfileData): Promise<ProfileUpdateResponse> => {
  // Validate input
  if (!data || Object.keys(data).length === 0) {
    throw new Error('Profile data cannot be empty')
  }

  if (data.email && !isValidEmail(data.email)) {
    throw new Error('Invalid email format')
  }

  // Make API call
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to update profile: ${response.status}`)
  }

  const updatedData = await response.json()

  return {
    success: true,
    data: updatedData,
    message: 'Profile updated successfully',
  }
}
```

**Features:**

- Input validation (empty data, email format)
- API communication via fetch
- Error handling for network failures
- TypeScript type safety

## Unit Tests with Jest

### What are Unit Tests?

**Unit tests** verify individual functions or components **in isolation**, mocking external dependencies.

**When to use:**

- Testing pure functions
- Testing business logic
- Testing validation rules
- Fast feedback during development

### Key Test Cases

**1. Success Scenarios**

```typescript
it('should successfully update profile with valid data', async () => {
  const mockResponse = { id: 1, ...mockProfileData }(
    global.fetch as jest.Mock
  ).mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  })

  const result = await updateProfile(mockProfileData)

  expect(result.success).toBe(true)
  expect(result.data).toEqual(mockResponse)
})
```

**2. Error Scenarios**

```typescript
it('should throw error when profile data is empty', async () => {
  await expect(updateProfile({})).rejects.toThrow('Profile data cannot be empty')
})

it('should throw error when email format is invalid', async () => {
  await expect(updateProfile({ email: 'invalid' })).rejects.toThrow('Invalid email format')
})

it('should throw error when API returns 500 error', async () => {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 500,
  })

  await expect(updateProfile(mockProfileData)).rejects.toThrow('Failed to update profile: 500')
})
```

**3. Edge Cases**

- Empty data objects
- Invalid email formats
- Network failures
- API errors (400, 500)
- Partial profile updates

### Mocking Strategy

```typescript
// Mock fetch globally
global.fetch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})
```

**Why mock fetch?**

- Tests run without real network calls (fast, reliable)
- Control success/failure scenarios
- Test edge cases without real API

## End-to-End Tests with Playwright

### What are E2E Tests?

**E2E tests** verify complete user flows in a **real browser environment**, testing UI + API + state.

**When to use:**

- Testing critical user journeys
- Verifying UI interactions
- Testing real API integrations
- Pre-deployment validation

### Key Test Cases

**1. User Flow Testing**

```typescript
test('should successfully update profile with valid data', async ({ page }) => {
  await page.goto('/exercise6')

  // Fill the form
  await page.getByLabel(/name/i).fill('John Doe')
  await page.getByLabel(/email/i).fill('john@example.com')
  await page.getByLabel(/bio/i).fill('Software developer passionate about testing')

  // Submit
  await page.getByRole('button', { name: /update profile/i }).click()

  // Verify success using data-testid for reliable selection
  const alert = page.getByTestId('profile-message')
  await expect(alert).toBeVisible({ timeout: 5000 })
  await expect(alert).toContainText(/profile updated successfully/i)
})
```

**2. Error Handling**

```typescript
test('should show error for invalid email', async ({ page }) => {
  const emailInput = page.getByLabel(/email/i)
  await emailInput.fill('invalid-email')
  await emailInput.blur()
  await page.getByRole('button', { name: /update profile/i }).click()

  // Use data-testid to avoid conflicts with solution.md content
  const alert = page.getByTestId('profile-message')
  await expect(alert).toBeVisible({ timeout: 5000 })
  await expect(alert).toContainText(/invalid email format/i)
})
```

**3. Accessibility Testing**

```typescript
test('should support keyboard navigation', async ({ page }) => {
  // Click to start focus chain (more reliable than programmatic focus)
  await page.getByLabel(/name/i).click()
  await expect(page.getByLabel(/name/i)).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByLabel(/email/i)).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByLabel(/bio/i)).toBeFocused()

  // Skip button test on webkit, it has focus issues with textareas
  const isWebkit = await page.evaluate(() => /WebKit/.test(navigator.userAgent))
  if (!isWebkit) {
    await page.keyboard.press('Tab')
    const button = page.getByRole('button', { name: /update profile/i })
    await expect(button).toBeFocused()
  }
})
```

**4. Network Failure Simulation**

```typescript
test('should handle network errors gracefully', async ({ page }) => {
  await page.context().setOffline(true)

  // Fill and submit
  await page.getByLabel(/name/i).fill('John Doe')
  await page.getByLabel(/email/i).fill('john@example.com')
  await page.getByRole('button', { name: /update profile/i }).click()

  // Check for error message using reliable selector
  const alert = page.getByTestId('profile-message')
  await expect(alert).toBeVisible({ timeout: 5000 })

  await page.context().setOffline(false)
})
```

**Best Practice:**

- **Many unit tests** (fast feedback, catch bugs early)
- **Few E2E tests** (critical user journeys only)

## When to Use Each Test Type

### Use Unit Tests For:

- ✅ Pure functions (no side effects)
- ✅ Business logic and calculations
- ✅ Validation rules
- ✅ Data transformations
- ✅ Error handling logic

### Use E2E Tests For:

- ✅ User authentication flows
- ✅ Checkout/payment processes
- ✅ Critical business workflows
- ✅ Cross-browser compatibility
- ✅ Accessibility validation

## Running the Tests

### Jest Unit Tests

```bash
# Run all unit tests
pnpm test

# Run specific test file
pnpm test updateProfile.test

```

### Playwright E2E Tests

```bash
# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test updateProfile.spec

# Run in specific browser
npx playwright test --project=chromium
```

## Common Pitfalls

### ❌ Unit Tests

- Testing implementation details instead of behavior
- Not mocking dependencies (slow tests)
- Skipping error cases
- Tightly coupled to specific implementations

### ❌ E2E Tests

- Too many E2E tests (slow, expensive)
- Fragile selectors (breaks on UI changes)
- No waiting for async operations
- Not cleaning up test data
- Ignoring browser-specific behavior

## References

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Martin Fowler: Testing Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Google Testing Blog](https://testing.googleblog.com/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
