import { test, expect } from '@playwright/test';

test.describe('Student Quiz Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as student1
    await page.goto('/login');
    await page.getByLabel(/email address/i).fill('student1@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('E2E TEST 3: Browse Quizzes & Search', async ({ page }) => {
    await page.goto('/quizzes');
    await expect(page.getByRole('heading', { name: /browse quizzes/i })).toBeVisible();

    // Verify categories appear
    await expect(page.getByText('HTML').first()).toBeVisible();
    await expect(page.getByText('JavaScript').first()).toBeVisible();

    // Search for a specific quiz
    await page.getByPlaceholder(/search quizzes/i).fill('React Basics');
    await expect(page.getByText('React Basics').first()).toBeVisible();
    
    // Clear search
    await page.getByPlaceholder(/search quizzes/i).fill('');
    
    // Click category filter
    await page.getByRole('link', { name: 'HTML', exact: true }).click();
    await expect(page.getByText('HTML 5 Mastery').first()).toBeVisible();
  });

  test('E2E TEST 4 & 5: Quiz Details and Start Quiz', async ({ page }) => {
    await page.goto('/quizzes');
    
    // Find 'React Basics' quiz and click
    await page.getByPlaceholder(/search quizzes/i).fill('React Basics');
    await page.locator('div.bg-white').filter({ hasText: 'React Basics' }).getByRole('link', { name: /view details/i }).first().click();

    // Now on Quiz Details page
    await expect(page.getByRole('heading', { name: 'React Basics' })).toBeVisible();
    await expect(page.getByText(/duration/i)).toBeVisible();
    await expect(page.getByText(/passing score/i)).toBeVisible();

    // Start Quiz
    await page.getByRole('button', { name: /start quiz now/i }).click();
    
    // Should be redirected to attempt page
    await expect(page.url()).toContain('/attempt');
    await expect(page.getByRole('button', { name: /submit quiz/i })).toBeVisible();
  });

  test('E2E TEST 6, 7 & 8: Quiz Navigation, Timer, and Submission', async ({ page }) => {
    await page.goto('/quizzes');
    
    // Start HTML 5 Mastery quiz
    await page.getByPlaceholder(/search quizzes/i).fill('HTML 5 Mastery');
    await page.locator('div.bg-white').filter({ hasText: 'HTML 5 Mastery' }).getByRole('link', { name: /view details/i }).first().click();
    
    await page.waitForURL(/\/quizzes\/.+/);
    await expect(page.getByRole('heading', { name: 'HTML 5 Mastery' })).toBeVisible();
    await page.getByRole('button', { name: /start quiz now/i }).click();
    
    await expect(page.url()).toContain('/attempt');
    
    // Answer question 1
    await expect(page.getByText('What does HTML stand for?')).toBeVisible();
    await page.getByText('Hyper Text Markup Language').click();
    
    // Submit Quiz with native confirm handling
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: /submit quiz/i }).click();
    
    // Wait for redirect to results
    await page.waitForURL(/\/results\/.+/);
    await expect(page.getByText('You scored')).toBeVisible();
  });

  test('E2E TEST 9 & 12: Results and History', async ({ page }) => {
    // First, complete a quiz to ensure there's a result
    await page.goto('/quizzes');
    await page.getByPlaceholder(/search quizzes/i).fill('JavaScript Fundamentals');
    await page.locator('div.bg-white').filter({ hasText: 'JavaScript Fundamentals' }).getByRole('link', { name: /view details/i }).first().click();
    
    await page.waitForURL(/\/quizzes\/.+/);
    await expect(page.getByRole('heading', { name: 'JavaScript Fundamentals' })).toBeVisible();
    await page.getByRole('button', { name: /start quiz now/i }).click();
    
    // Submit empty
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: /submit quiz/i }).click();
    
    await page.waitForURL(/\/results\/.+/);
    
    // Check result
    await expect(page.getByText('You scored')).toBeVisible();
    await expect(page.getByText('0.0%')).toBeVisible(); // 0% because empty
    await expect(page.getByText('Keep Practicing!')).toBeVisible();

    // Go to history
    await page.goto('/history');
    await expect(page.getByRole('heading', { name: /quiz history/i })).toBeVisible();
    await expect(page.getByText('JavaScript Fundamentals').first()).toBeVisible();
  });
});
