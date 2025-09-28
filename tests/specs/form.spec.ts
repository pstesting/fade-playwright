import { test, expect } from '@playwright/test';
import { FormActions } from '@pages/FormActions';
import { FormLocators } from '@pages/FormLocators';

test.describe('Fade Systems QA Test Form', () => {
  let formActions: FormActions;
  let formLocators: FormLocators;

  test.beforeEach(async ({ page }) => {
    formActions = new FormActions(page);
    formLocators = new FormLocators(page);

    // Navigate to the form page
    await formActions.navigateToForm();
  });

  test.describe('Form Load and Structure', () => {
    test('should load the form page successfully', async () => {
      // Verify the page loads and form is visible
      await expect(formLocators.formContainer).toBeVisible();

      // Check if page has a title
      await expect(formLocators.formTitle).toBeVisible();
    });

    test('should display all form fields', async () => {
      // Check that main form elements are present
      await expect(formLocators.nameInput).toBeVisible();
      await expect(formLocators.emailInput).toBeVisible();
      await expect(formLocators.countryDropdown).toBeVisible();

    });
  });

  test.describe('Form Submission - Valid Data', () => {
    test('should submit form with complete valid data', async () => {
      const validData = {
        name: 'John Doe',
        email: 'test@ps-testing.co.uk',
        country: 'Algeria',
      };

      // Fill the form with valid data
      await formActions.fillCompleteForm(validData);

      // Submit the form
      await formActions.submitForm();

      // Verify successful submission
      await formActions.verifyFormSuccess();
    });

    test('should submit form with minimal required data', async () => {
      const minimalData = {
        name: 'John Smith',
        email: '',
        country: 'Algeria',
      };

      // Fill only required fields
      await formActions.fillCompleteForm(minimalData);

      // Submit the form
      await formActions.submitForm();

      // Verify successful submission
      await formActions.verifyFormSuccess();
    });

  });


  test.describe('Form Validation - Required Fields', () => {
    test('should show validation error for completely empty form', async () => {
      // Try to submit empty form
      await formActions.submitForm();

      // Verify validation errors appear
      await formActions.verifyFieldError('name', 'Name is required.');
      await formActions.verifyFieldError('country', 'Country is required.');
    });
    test('should show a validation error for a missing name', async () => {

    });

  });

  test.describe('Form Validation - Field Format', () => {
    test('should validate email format', async () => {

      // Clear form and fill with invalid email
      await formActions.clearAllFields();

      const invalidEmailData = {
        name: 'Jane Doe',
        email: 'invalid-email-format',
        country: 'Algeria',
      };

      await formActions.fillCompleteForm(invalidEmailData);
      await formActions.submitForm();

      // Should show email validation error
      await formActions.verifyFieldError('email');

    });
  });

  test.describe('Form Accessibility and UX', () => {
    test('should be keyboard navigable', async () => {
      // Test keyboard navigation through form fields
      await formLocators.nameInput.focus();

      // Tab through fields
      await formActions.page.keyboard.press('Tab');
      await expect(formLocators.emailInput).toBeFocused();

      await formActions.page.keyboard.press('Tab');
      await expect(formLocators.countryField).toBeFocused();
    });
  });

  test.describe('Cross-Browser and Mobile Compatibility', () => {
    test('should work on mobile viewport', async () => {
      // Set mobile viewport
      await formActions.page.setViewportSize({ width: 375, height: 667 });

      // Form should still be functional
      const testData = {
        name: 'Mobile User',
        email: 'testMob@ps-testing.co.uk',
        country: 'Algeria',
      };
      await formActions.fillCompleteForm(testData);
      await formActions.submitForm();
      await formActions.verifyFormSuccess();
    });

    test('should work on tablet viewport', async () => {
      // Set tablet viewport
      await formActions.page.setViewportSize({ width: 768, height: 1024 });

      const testData = {
        name: 'Tablet User',
        email: 'testTab@ps-testing.co.uk',
        country: 'Algeria',
      };
      await formActions.fillCompleteForm(testData);
      await formActions.submitForm();
      await formActions.verifyFormSuccess();
    });

  });
});

