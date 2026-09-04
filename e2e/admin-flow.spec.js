import { test, expect } from '@playwright/test';

test.describe('Admin Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/login');
    await page.getByLabel(/email address/i).fill('admin@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('E2E TEST 15 & 21: Admin Login and Analytics Dashboard', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /dashboard overview/i })).toBeVisible();
    await expect(page.getByText(/total students/i)).toBeVisible();
  });

  test('E2E TEST 16: Admin User Management', async ({ page }) => {
    await page.goto('/admin/users');
    await expect(page.getByRole('heading', { name: 'Manage Students' })).toBeVisible();
    
    // Check if student exists
    await expect(page.getByText('student1@example.com')).toBeVisible();
    
    // View profile
    await page.locator('a[title="View Profile"]').first().click();
    await expect(page).toHaveURL(/.*\/admin\/users\/.*/);
    await expect(page.getByRole('heading', { name: /student profile/i })).toBeVisible();
  });

  test('E2E TEST 17: Admin Category Management', async ({ page }) => {
    await page.goto('/admin/categories');
    await expect(page.getByRole('heading', { name: 'Categories' })).toBeVisible();
    
    // Check existing categories
    await expect(page.getByText('React').first()).toBeVisible();

    // Create new category
    await page.getByRole('button', { name: /add category/i }).click();
    await page.locator('input[type="text"]').fill('Testing Category');
    await page.locator('textarea').fill('This is an E2E test category');
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify new category
    await expect(page.getByText('Testing Category')).toBeVisible();
  });

  test('E2E TEST 18 & 19: Admin Quiz and Question Management', async ({ page }) => {
    await page.goto('/admin/quizzes');
    await expect(page.getByRole('heading', { name: 'Quizzes' })).toBeVisible();

    // Create quiz
    await page.getByRole('button', { name: /create quiz/i }).click();
    await page.locator('input[type="text"]').first().fill('E2E Test Quiz');
    await page.locator('textarea').fill('Description for E2E Test');
    await page.locator('select').first().selectOption({ label: 'React' });
    await page.locator('input[type="number"]').nth(0).fill('30'); // Duration
    await page.locator('input[type="number"]').nth(1).fill('70'); // Passing Score
    await page.locator('input[type="number"]').nth(2).fill('3'); // Max Attempts
    await page.getByRole('button', { name: /save/i }).click();

    await expect(page.getByText('E2E Test Quiz').first()).toBeVisible();
    
    // Check if it navigates to edit page
    const quizRow = page.locator('tr').filter({ hasText: 'E2E Test Quiz' }).first();
    await quizRow.locator('a[title="Manage Questions"]').click();
    
    // We should be on edit page with Manage Questions
    await expect(page.getByRole('heading', { name: /manage questions/i })).toBeVisible();

    // Add a question
    await page.getByRole('button', { name: /add question/i }).click();
    await page.locator('textarea').first().fill('What is 2 + 2?');
    await page.locator('input[type="number"]').fill('10');
    
    // Fill options
    await page.locator('input[type="text"]').nth(0).fill('3');
    await page.locator('input[type="text"]').nth(1).fill('4');
    await page.locator('input[type="text"]').nth(2).fill('5');
    await page.locator('input[type="text"]').nth(3).fill('6');
    
    // Mark correct (4 is correct, which is nth(1))
    await page.locator('input[type="radio"]').nth(1).check();
    
    await page.locator('form').getByRole('button', { name: /save/i }).click();

    // Verify question added
    await expect(page.getByText('What is 2 + 2?')).toBeVisible();
  });

  test('E2E TEST 20: Admin Results', async ({ page }) => {
    await page.goto('/admin/results');
    await expect(page.getByRole('heading', { name: /all quiz attempts/i })).toBeVisible();
    
    // Check the table loads
    await expect(page.locator('table').first()).toBeVisible();
  });
});
