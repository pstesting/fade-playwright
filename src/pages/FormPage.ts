import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Fade Systems QA test form page
 * Contains locators and actions for form interactions
 */
export class FormPage {
  readonly page: Page;

  // Common form locators - these will need to be updated based on actual form structure
  readonly formContainer: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  // Input field locators - update these based on actual form fields
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly messageTextarea: Locator;
  readonly companyInput: Locator;
  readonly roleSelect: Locator;

  // Checkbox and radio button locators - update based on actual form
  readonly agreeCheckbox: Locator;
  readonly newsletterCheckbox: Locator;
  readonly contactMethodRadios: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators - these should be updated to match the actual form
    this.formContainer = page.locator('form, [role="form"], .form-container');
    this.submitButton = page.locator('button[type="submit"], input[type="submit"], .submit-btn');
    this.resetButton = page.locator('button[type="reset"], input[type="reset"], .reset-btn');
    this.errorMessage = page.locator('.error, .error-message, [role="alert"]');
    this.successMessage = page.locator('.success, .success-message, .confirmation');

    // Form field locators
    this.nameInput = page.locator('input[name="name"], input[id*="name"], #name');
    this.emailInput = page.locator('input[name="email"], input[type="email"], #email');
    this.phoneInput = page.locator('input[name="phone"], input[type="tel"], #phone');
    this.messageTextarea = page.locator('textarea[name="message"], textarea[id*="message"], #message');
    this.companyInput = page.locator('input[name="company"], input[id*="company"], #company');
    this.roleSelect = page.locator('select[name="role"], select[id*="role"], #role');

    // Checkboxes and radio buttons
    this.agreeCheckbox = page.locator('input[type="checkbox"][name*="agree"], input[type="checkbox"][id*="agree"]');
    this.newsletterCheckbox = page.locator('input[type="checkbox"][name*="newsletter"], input[type="checkbox"][id*="newsletter"]');
    this.contactMethodRadios = page.locator('input[type="radio"][name*="contact"]');
  }

  /**
   * Navigate to the form page
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForFormToLoad();
  }

  /**
   * Wait for the form to be fully loaded
   */
  async waitForFormToLoad(): Promise<void> {
    await expect(this.formContainer).toBeVisible({ timeout: 10000 });
  }

  /**
   * Fill out the name field
   */
  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  /**
   * Fill out the email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fill out the phone field
   */
  async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  /**
   * Fill out the message textarea
   */
  async fillMessage(message: string): Promise<void> {
    await this.messageTextarea.fill(message);
  }

  /**
   * Fill out the company field
   */
  async fillCompany(company: string): Promise<void> {
    await this.companyInput.fill(company);
  }

  /**
   * Select a role from dropdown
   */
  async selectRole(role: string): Promise<void> {
    await this.roleSelect.selectOption(role);
  }

  /**
   * Check or uncheck the agreement checkbox
   */
  async setAgreeCheckbox(checked: boolean): Promise<void> {
    await this.agreeCheckbox.setChecked(checked);
  }

  /**
   * Check or uncheck the newsletter checkbox
   */
  async setNewsletterCheckbox(checked: boolean): Promise<void> {
    await this.newsletterCheckbox.setChecked(checked);
  }

  /**
   * Select a contact method radio button
   */
  async selectContactMethod(method: string): Promise<void> {
    await this.contactMethodRadios.filter({ hasText: method }).check();
  }

  /**
   * Submit the form
   */
  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Reset the form
   */
  async resetForm(): Promise<void> {
    await this.resetButton.click();
  }

  /**
   * Fill out the entire form with provided data
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
    contactMethod?: string;
  }): Promise<void> {
    if (formData.name) await this.fillName(formData.name);
    if (formData.email) await this.fillEmail(formData.email);
    if (formData.phone) await this.fillPhone(formData.phone);
    if (formData.message) await this.fillMessage(formData.message);
    if (formData.company) await this.fillCompany(formData.company);
    if (formData.role) await this.selectRole(formData.role);
    if (formData.agreeToTerms !== undefined) await this.setAgreeCheckbox(formData.agreeToTerms);
    if (formData.subscribeNewsletter !== undefined) await this.setNewsletterCheckbox(formData.subscribeNewsletter);
    if (formData.contactMethod) await this.selectContactMethod(formData.contactMethod);
  }

  /**
   * Verify form validation errors
   */
  async verifyValidationError(expectedMessage?: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.errorMessage).toContainText(expectedMessage);
    }
  }

  /**
   * Verify successful form submission
   */
  async verifySuccessMessage(expectedMessage?: string): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.successMessage).toContainText(expectedMessage);
    }
  }

  /**
   * Get all form field values for verification
   */
  async getFormValues(): Promise<Record<string, string>> {
    return {
      name: await this.nameInput.inputValue(),
      email: await this.emailInput.inputValue(),
      phone: await this.phoneInput.inputValue(),
      message: await this.messageTextarea.inputValue(),
      company: await this.companyInput.inputValue(),
      role: await this.roleSelect.inputValue(),
    };
  }

  /**
   * Check if form fields are empty (useful for reset verification)
   */
  async verifyFormIsEmpty(): Promise<void> {
    await expect(this.nameInput).toHaveValue('');
    await expect(this.emailInput).toHaveValue('');
    await expect(this.phoneInput).toHaveValue('');
    await expect(this.messageTextarea).toHaveValue('');
    await expect(this.companyInput).toHaveValue('');
  }

  /**
   * Verify form fields are properly filled
   */
  async verifyFormData(expectedData: Record<string, string>): Promise<void> {
    for (const [field, expectedValue] of Object.entries(expectedData)) {
      switch (field) {
      case 'name':
        await expect(this.nameInput).toHaveValue(expectedValue);
        break;
      case 'email':
        await expect(this.emailInput).toHaveValue(expectedValue);
        break;
      case 'phone':
        await expect(this.phoneInput).toHaveValue(expectedValue);
        break;
      case 'message':
        await expect(this.messageTextarea).toHaveValue(expectedValue);
        break;
      case 'company':
        await expect(this.companyInput).toHaveValue(expectedValue);
        break;
      case 'role':
        await expect(this.roleSelect).toHaveValue(expectedValue);
        break;
      }
    }
  }
}