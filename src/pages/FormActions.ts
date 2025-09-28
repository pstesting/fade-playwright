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
   * Select a country from the dropdown
   */
  async selectCountry(country: string): Promise<void> {
    await expect(this.locators.countryDropdown).toBeVisible({timeout: 5000});
    await this.locators.countryDropdown.click();
    await this.locators.countryOption.filter({ hasText: country }).click();
  }


  /**
   * Submit the form and handle potential loading states
   */
  async submitForm(): Promise<void> {
    try {
      await expect(this.locators.registerButton).toBeVisible({ timeout: 5000 });
      await expect(this.locators.registerButton).toBeEnabled();

      // Click the register button
      await this.locators.registerButton.click();

      // Wait for form submission to process (loading indicator or navigation)
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to submit form: ${error}`);
    }
  }

  /**
   * Fill the complete form with provided data
   */
  async fillCompleteForm(formData: {
    name?: string;
    email?: string;
    country?: string;
  }): Promise<void> {
    // Fill text fields
    if (formData.name) {
      await this.fillName(formData.name);
    }

    if (formData.email) {
      await this.fillEmail(formData.email);
    }

    if (formData.country) {
      await this.selectCountry(formData.country);
    }
  }


  /**
   * Clear all form fields
   */
  async clearAllFields(): Promise<void> {
    const fields = [
      this.locators.nameInput,
      this.locators.emailInput,
    ];

    for (const field of fields) {
      try {
        await field.clear();
      } catch {
        // Field might not exist, continue with next field
      }
    }
  }

  /**
   * Verify specific field validation error
   */
  async verifyFieldError(field: 'name' | 'email' | 'country', expectedMessage?: string): Promise<void> {
    let errorLocator;

    switch (field) {
    case 'name':
      errorLocator = this.locators.nameErrorMessage;
      break;
    case 'email':
      errorLocator = this.locators.emailErrorMessage;
      break;
    case 'country':
      errorLocator = this.locators.countryErrorMessage;
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
}
