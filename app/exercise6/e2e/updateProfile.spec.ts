import { test, expect } from '@playwright/test'

test.describe('Profile Update - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/exercise6')
  })

  test('should display profile update form', async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/bio/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /update profile/i })).toBeVisible()
  })

  test('should successfully update profile with valid data', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')
    await page.getByLabel(/bio/i).fill('Software developer passionate about testing')

    await page.getByRole('button', { name: /update profile/i }).click()

    const alert = page.getByTestId('profile-message')
    await expect(alert).toBeVisible({ timeout: 5000 })
    await expect(alert).toContainText(/profile updated successfully/i)
  })

  test('should show error for invalid email', async ({ page }) => {
    const emailInput = page.getByLabel(/email/i)
    await emailInput.fill('invalid-email')
    await emailInput.blur()

    await page.getByRole('button', { name: /update profile/i }).click()

    const alert = page.getByTestId('profile-message')
    await expect(alert).toBeVisible({ timeout: 5000 })
    await expect(alert).toContainText(/invalid email format/i)
  })

  test('should show error when all fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: /update profile/i }).click()

    const alert = page.getByTestId('profile-message')
    await expect(alert).toBeVisible()
    await expect(alert).toContainText(/profile data cannot be empty/i)
  })

  test('should show loading state during update', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')

    await page.getByRole('button', { name: /update profile/i }).click()

    const button = page.getByRole('button', { name: /updating/i })
    await expect(button).toBeVisible()
  })

  test('should handle network errors gracefully', async ({ page }) => {
    await page.context().setOffline(true)

    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')
    await page.getByRole('button', { name: /update profile/i }).click()

    const alert = page.getByTestId('profile-message')
    await expect(alert).toBeVisible({ timeout: 5000 })

    await page.context().setOffline(false)
  })

  test('should support keyboard navigation', async ({ page }) => {
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

  test('should allow partial profile updates', async ({ page }) => {
    // Use pressSequentially to type character by character for webkit compatibility
    const nameInput = page.getByLabel(/name/i)
    await nameInput.click()
    await nameInput.pressSequentially('Jane Smith', { delay: 50 })

    await expect(nameInput).toHaveValue('Jane Smith')

    await page.getByRole('button', { name: /update profile/i }).click()

    const alert = page.getByTestId('profile-message')
    await expect(alert).toBeVisible({ timeout: 10000 })
    await expect(alert).toContainText(/profile updated successfully/i)
  })
})
