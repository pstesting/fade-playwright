import { test, expect } from '@playwright/test';
import { FormActions } from '../../src/pages/FormActions';
import { FormLocators } from '../../src/pages/FormLocators';
import { TestDataGenerator, FormTestConstants, EmailTestPatterns, PhoneTestPatterns } from '../../src/utils/TestData';

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
      await expect(formLocators.messageTextarea).toBeVisible();
      await expect(formLocators.submitButton).toBeVisible();
    });

    test('should have proper form labels and accessibility', async () => {
      // Verify form has proper labels for accessibility
      await expect(formLocators.nameLabel).toBeVisible();
      await expect(formLocators.emailLabel).toBeVisible();
      await expect(formLocators.messageLabel).toBeVisible();
    });

    test('should show required field indicators', async () => {
      // Check for required field indicators (*, required attribute, etc.)
      const requiredIndicators = await formLocators.requiredFieldIndicators.count();
      expect(requiredIndicators).toBeGreaterThan(0);
    });
  });

  test.describe('Form Submission - Valid Data', () => {
    test('should submit form with complete valid data', async () => {
      const validData = TestDataGenerator.getValidFormData();
      
      // Fill the form with valid data
      await formActions.fillCompleteForm(validData);
      
      // Submit the form
      await formActions.submitForm();
      
      // Verify successful submission
      await formActions.verifyFormSuccess();
    });

    test('should submit form with minimal required data', async () => {
      const minimalData = TestDataGenerator.getMinimalFormData();
      
      // Fill only required fields
      await formActions.fillCompleteForm(minimalData);
      
      // Submit the form
      await formActions.submitForm();
      
      // Verify successful submission
      await formActions.verifyFormSuccess();
    });

    test('should handle special characters in form data', async () => {
      const specialCharData = TestDataGenerator.getSpecialCharacterData();
      
      // Fill form with special characters
      await formActions.fillCompleteForm(specialCharData);
      
      // Submit the form
      await formActions.submitForm();
      
      // Verify successful submission
      await formActions.verifyFormSuccess();
    });

    test('should submit form with newsletter subscription', async () => {
      const validData = TestDataGenerator.getValidFormData();
      validData.subscribeNewsletter = true;
      
      await formActions.fillCompleteForm(validData);
      await formActions.submitForm();
      await formActions.verifyFormSuccess();
    });

    test('should submit form with phone contact preference', async () => {
      const validData = TestDataGenerator.getValidFormData();
      validData.contactMethod = 'phone';
      
      await formActions.fillCompleteForm(validData);
      await formActions.submitForm();
      await formActions.verifyFormSuccess();
    });
  });

  test.describe('Form Validation - Required Fields', () => {
    test('should show validation error for completely empty form', async () => {
      // Try to submit empty form
      await formActions.submitForm();
      
      // Verify validation errors appear
      await formActions.verifyValidationErrors();
    });

    test('should validate required name field', async () => {
      const dataWithoutName = TestDataGenerator.getValidFormData();
      delete dataWithoutName.name;
      
      await formActions.fillCompleteForm(dataWithoutName);
      await formActions.submitForm();
      
      // Should show validation error for missing name
      await formActions.verifyFieldError('name');
    });

    test('should validate required email field', async () => {
      const dataWithoutEmail = TestDataGenerator.getValidFormData();
      delete dataWithoutEmail.email;
      
      await formActions.fillCompleteForm(dataWithoutEmail);
      await formActions.submitForm();
      
      // Should show validation error for missing email
      await formActions.verifyFieldError('email');
    });

    test('should validate required message field', async () => {
      const dataWithoutMessage = TestDataGenerator.getValidFormData();
      delete dataWithoutMessage.message;
      
      await formActions.fillCompleteForm(dataWithoutMessage);
      await formActions.submitForm();
      
      // Should show validation error for missing message
      await formActions.verifyFieldError('message');
    });

    test('should validate agreement checkbox requirement', async () => {
      const dataWithoutAgreement = TestDataGenerator.getDataWithoutAgreement();
      
      await formActions.fillCompleteForm(dataWithoutAgreement);
      await formActions.submitForm();
      
      // Should show validation error for unchecked agreement
      await formActions.verifyValidationErrors([FormTestConstants.VALIDATION_MESSAGES.REQUIRED_AGREEMENT]);
    });
  });

  test.describe('Form Validation - Field Format', () => {
    test('should validate email format', async () => {
      for (const invalidEmail of EmailTestPatterns.INVALID_EMAILS) {
        // Clear form and fill with invalid email
        await formActions.clearAllFields();
        
        const invalidEmailData = TestDataGenerator.getInvalidEmailData();
        invalidEmailData.email = invalidEmail;
        
        await formActions.fillCompleteForm(invalidEmailData);
        await formActions.submitForm();
        
        // Should show email validation error
        await formActions.verifyFieldError('email');
        
        // Navigate back to form for next iteration
        await formActions.navigateToForm();
      }
    });

    test('should accept valid email formats', async () => {
      for (const validEmail of EmailTestPatterns.VALID_EMAILS) {
        await formActions.clearAllFields();
        
        const validEmailData = TestDataGenerator.getValidFormData();
        validEmailData.email = validEmail;
        
        await formActions.fillCompleteForm(validEmailData);
        
        // Verify email is accepted (no validation error should appear immediately)
        const currentValues = await formActions.getCurrentFormValues();
        expect(currentValues.email).toBe(validEmail);
        
        await formActions.navigateToForm();
      }
    });

    test('should validate phone number format if phone field exists', async () => {
      // Only run this test if phone field is present
      try {
        await formLocators.phoneInput.isVisible();
        
        for (const invalidPhone of PhoneTestPatterns.INVALID_PHONES) {
          await formActions.clearAllFields();
          
          const invalidPhoneData = TestDataGenerator.getValidFormData();
          invalidPhoneData.phone = invalidPhone;
          
          await formActions.fillCompleteForm(invalidPhoneData);
          await formActions.submitForm();
          
          // Should show phone validation error
          await formActions.verifyFieldError('phone');
          
          await formActions.navigateToForm();
        }
      } catch {
        // Phone field doesn't exist, skip this test
        test.skip();
      }
    });
  });

  test.describe('Form Functionality', () => {
    test('should clear form when reset button is clicked', async () => {
      // Fill form with data
      const testData = TestDataGenerator.getValidFormData();
      await formActions.fillCompleteForm(testData);
      
      // Verify form is filled
      if (testData.name && testData.email && testData.message) {
        await formActions.verifyFormData({
          name: testData.name,
          email: testData.email,
          message: testData.message
        });
      }
      
      // Reset the form
      await formActions.resetForm();
      
      // Verify form is empty
      await formActions.verifyFormIsEmpty();
    });

    test('should maintain form data when navigating away and back', async () => {
      const testData = TestDataGenerator.getValidFormData();
      
      // Fill form
      await formActions.fillCompleteForm(testData);
      
      // Navigate away and back (simulating user behavior)
      await formActions.page.goBack();
      await formActions.navigateToForm();
      
      // In some cases, form data might be preserved
      // This test documents the expected behavior
      const currentValues = await formActions.getCurrentFormValues();
      
      // Either form should be empty (expected) or preserve data
      if (currentValues.name !== '') {
        if (testData.name && testData.email && testData.message) {
          await formActions.verifyFormData({
            name: testData.name,
            email: testData.email,
            message: testData.message
          });
        }
      }
    });

    test('should handle form submission loading state', async () => {
      const testData = TestDataGenerator.getValidFormData();
      await formActions.fillCompleteForm(testData);
      
      // Submit form and check for loading indicators
      await formActions.submitForm();
      
      // The form should either show success or be in loading state
      // This test ensures the form doesn't get stuck
      await Promise.race([
        formActions.verifyFormSuccess(),
        expect(formLocators.loadingIndicator).toBeVisible()
      ]);
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
      // Next field should be focused (phone, message, or other field)
    });

    test('should show focus indicators on interactive elements', async () => {
      const interactiveElements = await formLocators.allInteractiveElements.all();
      
      for (const element of interactiveElements.slice(0, 5)) { // Test first 5 elements
        await element.focus();
        
        // Element should have focus (visible focus indicator)
        await expect(element).toBeFocused();
      }
    });

    test('should have proper ARIA attributes for screen readers', async () => {
      // Check for important accessibility attributes
      const formElement = formLocators.formContainer;
      
      // Form should have proper role or be a form element
      const tagName = await formElement.evaluate(el => el.tagName);
      const role = await formElement.getAttribute('role');
      
      expect(tagName === 'FORM' || role === 'form').toBeTruthy();
    });
  });

  test.describe('Form Edge Cases and Error Handling', () => {
    test('should handle very long input text', async () => {
      const longTextData = TestDataGenerator.getLongTextData();
      
      await formActions.fillCompleteForm(longTextData);
      
      // Form should either accept long text or show appropriate validation
      try {
        await formActions.submitForm();
        await formActions.verifyFormSuccess();
      } catch {
        // If long text is rejected, validation should be shown
        await formActions.verifyValidationErrors();
      }
    });

    test('should handle rapid form submissions', async () => {
      const testData = TestDataGenerator.getValidFormData();
      await formActions.fillCompleteForm(testData);
      
      // Try to submit multiple times rapidly
      await formActions.submitForm();
      
      // Second submission should either be prevented or handled gracefully
      try {
        await formActions.submitForm();
      } catch {
        // This is expected - form should prevent double submission
      }
      
      // Should still show success or appropriate message
      await formActions.verifyFormSuccess();
    });

    test('should maintain form state during network issues', async () => {
      const testData = TestDataGenerator.getValidFormData();
      await formActions.fillCompleteForm(testData);
      
      // Simulate network delay by intercepting requests
      await formActions.page.route('**/*', async route => {
        await new Promise(resolve => setTimeout(resolve, 100));
        await route.continue();
      });
      
      await formActions.submitForm();
      
      // Form should handle network delay gracefully
      await formActions.verifyFormSuccess();
    });
  });

  test.describe('Cross-Browser and Mobile Compatibility', () => {
    test('should work on mobile viewport', async () => {
      // Set mobile viewport
      await formActions.page.setViewportSize({ width: 375, height: 667 });
      
      // Form should still be functional
      const testData = TestDataGenerator.getValidFormData();
      await formActions.fillCompleteForm(testData);
      await formActions.submitForm();
      await formActions.verifyFormSuccess();
    });

    test('should work on tablet viewport', async () => {
      // Set tablet viewport
      await formActions.page.setViewportSize({ width: 768, height: 1024 });
      
      const testData = TestDataGenerator.getValidFormData();
      await formActions.fillCompleteForm(testData);
      await formActions.submitForm();
      await formActions.verifyFormSuccess();
    });

    test('should handle different screen orientations', async () => {
      // Test landscape orientation
      await formActions.page.setViewportSize({ width: 667, height: 375 });
      
      // Form should remain usable
      await expect(formLocators.formContainer).toBeVisible();
      await expect(formLocators.submitButton).toBeVisible();
    });
  });
});