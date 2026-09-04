import { test, expect } from '@playwright/test';

test.describe('Student Authentication Flow', () => {
  const testEmail = `test.student.${Date.now()}@example.com`;
  const password = 'Password123!';

  test('E2E TEST 1: Student Registration', async ({ page }) => {
    await page.goto('/register');
    
    // Test invalid input / missing fields
    await page.getByRole('button', { name: /sign up/i }).click();
    await expect(page.locator('text=Name is required').first()).toBeVisible();

    // Valid registration
    await page.getByLabel(/full name/i).fill('Test Student');
    await page.getByLabel(/email address/i).fill(testEmail);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole('button', { name: /sign up/i }).click();

    // Verify redirect to login
    await expect(page).toHaveURL('/login');

    // Test duplicate email
    await page.goto('/register');
    await page.getByLabel(/full name/i).fill('Test Student 2');
    await page.getByLabel(/email address/i).fill(testEmail);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole('button', { name: /sign up/i }).click();
    
    // Since we handle errors with alert or toast, check if an error is shown
    await expect(page.locator('text=already exists').first()).toBeVisible();
  });

  test('E2E TEST 2: Student Login', async ({ page }) => {
    await page.goto('/login');

    // Invalid email format
    await page.getByLabel(/email address/i).fill('invalid-email');
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // HTML5 validation or manual validation
    // Playwright handles HTML5 validation by not submitting, so we check if URL stays same
    await expect(page).toHaveURL('/login');

    // Wrong password
    await page.getByLabel(/email address/i).fill('student1@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.locator('text=Invalid email or password').first()).toBeVisible();

    // Successful login
    await page.getByLabel(/email address/i).fill('student1@example.com');
    await page.getByLabel(/password/i).fill('password123'); // Assuming student1 exists from seed
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Dashboard should load properly
    await expect(page.getByRole('heading', { name: /welcome, student one/i })).toBeVisible();
  });
});
