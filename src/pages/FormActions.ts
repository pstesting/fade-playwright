import { Page, expect } from '@playwright/test';
import { FormLocators } from './FormLocators';

/**
 * Form actions class containing all the actions that can be performed on the form
 * This separates the actions from locators for better maintainability
 */
export class FormActions {
  readonly page: Page;
  readonly locators: FormLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new FormLocators(page);
  }

  /**
   * Navigate to the form page and wait for it to load
   */
  async navigateToForm(): Promise<void> {
    await this.page.goto('/');
    await this.waitForFormToLoad();
  }

  /**
   * Wait for the form to be fully loaded and visible
   */
  async waitForFormToLoad(): Promise<void> {
    await expect(this.locators.formContainer).toBeVisible({ timeout: 10000 });
    // Wait for any loading indicators to disappear
    await expect(this.locators.loadingIndicator).toBeHidden().catch(() => {
      // Loading indicator might not exist, which is fine
    });
  }

  /**
   * Fill a single form field with error handling
   */
  async fillField(locator: any, value: string, fieldName: string): Promise<void> {
    try {
      await expect(locator).toBeVisible({ timeout: 5000 });
      await locator.clear();
      await locator.fill(value);
      
      // Verify the value was set correctly
      await expect(locator).toHaveValue(value);
    } catch (error) {
      throw new Error(`Failed to fill ${fieldName} field with value "${value}": ${error}`);
    }
  }

  /**
   * Fill the name field
   */
  async fillName(name: string): Promise<void> {
    await this.fillField(this.locators.nameInput, name, 'name');
  }

  /**
   * Fill the email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.fillField(this.locators.emailInput, email, 'email');
  }

  /**
   * Fill the phone field
   */
  async fillPhone(phone: string): Promise<void> {
    await this.fillField(this.locators.phoneInput, phone, 'phone');
  }

  /**
   * Fill the message field
   */
  async fillMessage(message: string): Promise<void> {
    await this.fillField(this.locators.messageTextarea, message, 'message');
  }

  /**
   * Fill the company field
   */
  async fillCompany(company: string): Promise<void> {
    await this.fillField(this.locators.companyInput, company, 'company');
  }

  /**
   * Select a role from the dropdown
   */
  async selectRole(role: string): Promise<void> {
    try {
      await expect(this.locators.roleSelect).toBeVisible({ timeout: 5000 });
      await this.locators.roleSelect.selectOption(role);
      
      // Verify the selection was made
      await expect(this.locators.roleSelect).toHaveValue(role);
    } catch (error) {
      throw new Error(`Failed to select role "${role}": ${error}`);
    }
  }

  /**
   * Set checkbox state with verification
   */
  async setCheckbox(locator: any, checked: boolean, fieldName: string): Promise<void> {
    try {
      await expect(locator).toBeVisible({ timeout: 5000 });
      await locator.setChecked(checked);
      
      // Verify the checkbox state
      if (checked) {
        await expect(locator).toBeChecked();
      } else {
        await expect(locator).not.toBeChecked();
      }
    } catch (error) {
      throw new Error(`Failed to set ${fieldName} checkbox to ${checked}: ${error}`);
    }
  }

  /**
   * Set the agreement checkbox
   */
  async setAgreeToTerms(checked: boolean): Promise<void> {
    await this.setCheckbox(this.locators.agreeCheckbox, checked, 'agreement');
  }

  /**
   * Set the newsletter subscription checkbox
   */
  async setNewsletterSubscription(checked: boolean): Promise<void> {
    await this.setCheckbox(this.locators.newsletterCheckbox, checked, 'newsletter');
  }

  /**
   * Select contact method via radio button
   */
  async selectContactMethod(method: 'email' | 'phone'): Promise<void> {
    try {
      const radioLocator = method === 'email' 
        ? this.locators.emailContactRadio 
        : this.locators.phoneContactRadio;
      
      await expect(radioLocator).toBeVisible({ timeout: 5000 });
      await radioLocator.check();
      
      // Verify the radio button is selected
      await expect(radioLocator).toBeChecked();
    } catch (error) {
      throw new Error(`Failed to select contact method "${method}": ${error}`);
    }
  }

  /**
   * Submit the form and handle potential loading states
   */
  async submitForm(): Promise<void> {
    try {
      await expect(this.locators.submitButton).toBeVisible({ timeout: 5000 });
      await expect(this.locators.submitButton).toBeEnabled();
      
      // Click the submit button
      await this.locators.submitButton.click();
      
      // Wait for form submission to process (loading indicator or navigation)
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to submit form: ${error}`);
    }
  }

  /**
   * Reset the form
   */
  async resetForm(): Promise<void> {
    try {
      await expect(this.locators.resetButton).toBeVisible({ timeout: 5000 });
      await this.locators.resetButton.click();
    } catch (error) {
      throw new Error(`Failed to reset form: ${error}`);
    }
  }

  /**
   * Fill the complete form with provided data
   */
  async fillCompleteForm(formData: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    company?: string;
    role?: string;
    agreeToTerms?: boolean;
    subscribeNewsletter?: boolean;
    contactMethod?: 'email' | 'phone';
  }): Promise<void> {
    // Fill text fields
    if (formData.name) {
      await this.fillName(formData.name);
    }
    
    if (formData.email) {
      await this.fillEmail(formData.email);
    }
    
    if (formData.phone) {
      await this.fillPhone(formData.phone);
    }
    
    if (formData.message) {
      await this.fillMessage(formData.message);
    }
    
    if (formData.company) {
      await this.fillCompany(formData.company);
    }

    // Handle select dropdown
    if (formData.role) {
      await this.selectRole(formData.role);
    }

    // Handle checkboxes
    if (formData.agreeToTerms !== undefined) {
      await this.setAgreeToTerms(formData.agreeToTerms);
    }
    
    if (formData.subscribeNewsletter !== undefined) {
      await this.setNewsletterSubscription(formData.subscribeNewsletter);
    }

    // Handle radio buttons
    if (formData.contactMethod) {
      await this.selectContactMethod(formData.contactMethod);
    }
  }

  /**
   * Clear all form fields
   */
  async clearAllFields(): Promise<void> {
    const fields = [
      this.locators.nameInput,
      this.locators.emailInput,
      this.locators.phoneInput,
      this.locators.messageTextarea,
      this.locators.companyInput
    ];

    for (const field of fields) {
      try {
        await field.clear();
      } catch {
        // Field might not exist, continue with next field
        continue;
      }
    }
  }

  /**
   * Verify form validation errors
   */
  async verifyValidationErrors(expectedErrors?: string[]): Promise<void> {
    // Check for general error message
    await expect(this.locators.errorMessage).toBeVisible({ timeout: 5000 });
    
    if (expectedErrors && expectedErrors.length > 0) {
      for (const expectedError of expectedErrors) {
        await expect(this.locators.errorMessage).toContainText(expectedError);
      }
    }
  }

  /**
   * Verify specific field validation error
   */
  async verifyFieldError(field: 'name' | 'email' | 'phone' | 'message', expectedMessage?: string): Promise<void> {
    let errorLocator;
    
    switch (field) {
    case 'name':
      errorLocator = this.locators.nameFieldError;
      break;
    case 'email':
      errorLocator = this.locators.emailFieldError;
      break;
    case 'phone':
      errorLocator = this.locators.phoneFieldError;
      break;
    case 'message':
      errorLocator = this.locators.messageFieldError;
      break;
    }

    await expect(errorLocator).toBeVisible({ timeout: 5000 });
    
    if (expectedMessage) {
      await expect(errorLocator).toContainText(expectedMessage);
    }
  }

  /**
   * Verify successful form submission
   */
  async verifyFormSuccess(expectedMessage?: string): Promise<void> {
    await expect(this.locators.successMessage).toBeVisible({ timeout: 10000 });
    
    if (expectedMessage) {
      await expect(this.locators.successMessage).toContainText(expectedMessage);
    }
  }

  /**
   * Verify that all required fields have the required indicator
   */
  async verifyRequiredFields(): Promise<void> {
    const requiredFields = await this.locators.requiredFieldIndicators.count();
    expect(requiredFields).toBeGreaterThan(0);
  }

  /**
   * Get current form values for verification
   */
  async getCurrentFormValues(): Promise<Record<string, string>> {
    const values: Record<string, string> = {};

    try {
      values.name = await this.locators.nameInput.inputValue();
    } catch { values.name = ''; }

    try {
      values.email = await this.locators.emailInput.inputValue();
    } catch { values.email = ''; }

    try {
      values.phone = await this.locators.phoneInput.inputValue();
    } catch { values.phone = ''; }

    try {
      values.message = await this.locators.messageTextarea.inputValue();
    } catch { values.message = ''; }

    try {
      values.company = await this.locators.companyInput.inputValue();
    } catch { values.company = ''; }

    try {
      values.role = await this.locators.roleSelect.inputValue();
    } catch { values.role = ''; }

    return values;
  }

  /**
   * Verify form is completely empty (useful after reset)
   */
  async verifyFormIsEmpty(): Promise<void> {
    const values = await this.getCurrentFormValues();
    
    for (const [field, value] of Object.entries(values)) {
      expect(value, `${field} field should be empty`).toBe('');
    }
  }

  /**
   * Verify form contains expected data
   */
  async verifyFormData(expectedData: Record<string, string>): Promise<void> {
    const currentValues = await this.getCurrentFormValues();
    
    for (const [field, expectedValue] of Object.entries(expectedData)) {
      expect(currentValues[field], `${field} field value mismatch`).toBe(expectedValue);
    }
  }
}