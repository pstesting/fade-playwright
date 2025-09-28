import { Page, Locator } from '@playwright/test';

/**
 * Centralized locators for the form page
 * This file contains all the selectors used in the form testing
 */
export class FormLocators {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Main form container locators
  get formContainer(): Locator {
    return this.page.locator('form, [role="form"], .form-container, .contact-form');
  }

  get formTitle(): Locator {
    return this.page.locator('h1, h2, .form-title, .page-title');
  }

  // Input field locators with multiple fallback selectors
  get nameInput(): Locator {
    return this.page.locator([
      'input[name="name"]',
      'input[id="name"]',
      'input[id*="name"]',
      'input[placeholder*="name" i]',
      '#name',
      '.name-input input'
    ].join(', '));
  }

  get emailInput(): Locator {
    return this.page.locator([
      'input[name="email"]',
      'input[type="email"]',
      'input[id="email"]',
      'input[id*="email"]',
      'input[placeholder*="email" i]',
      '#email',
      '.email-input input'
    ].join(', '));
  }

  get phoneInput(): Locator {
    return this.page.locator([
      'input[name="phone"]',
      'input[type="tel"]',
      'input[id="phone"]',
      'input[id*="phone"]',
      'input[placeholder*="phone" i]',
      '#phone',
      '.phone-input input'
    ].join(', '));
  }

  get messageTextarea(): Locator {
    return this.page.locator([
      'textarea[name="message"]',
      'textarea[id="message"]',
      'textarea[id*="message"]',
      'textarea[placeholder*="message" i]',
      '#message',
      '.message-input textarea',
      'textarea'
    ].join(', '));
  }

  get companyInput(): Locator {
    return this.page.locator([
      'input[name="company"]',
      'input[id="company"]',
      'input[id*="company"]',
      'input[placeholder*="company" i]',
      '#company',
      '.company-input input'
    ].join(', '));
  }

  get roleSelect(): Locator {
    return this.page.locator([
      'select[name="role"]',
      'select[id="role"]',
      'select[id*="role"]',
      '#role',
      '.role-select select',
      'select'
    ].join(', '));
  }

  // Button locators
  get submitButton(): Locator {
    return this.page.locator([
      'button[type="submit"]',
      'input[type="submit"]',
      'button:has-text("Submit")',
      'button:has-text("Send")',
      '.submit-btn',
      '.send-btn',
      '[role="button"]:has-text("Submit")'
    ].join(', '));
  }

  get resetButton(): Locator {
    return this.page.locator([
      'button[type="reset"]',
      'input[type="reset"]',
      'button:has-text("Reset")',
      'button:has-text("Clear")',
      '.reset-btn',
      '.clear-btn'
    ].join(', '));
  }

  // Checkbox locators
  get agreeCheckbox(): Locator {
    return this.page.locator([
      'input[type="checkbox"][name*="agree"]',
      'input[type="checkbox"][id*="agree"]',
      'input[type="checkbox"][name*="terms"]',
      'input[type="checkbox"][id*="terms"]',
      'input[type="checkbox"] + label:has-text("agree")',
      'input[type="checkbox"] + label:has-text("terms")'
    ].join(', '));
  }

  get newsletterCheckbox(): Locator {
    return this.page.locator([
      'input[type="checkbox"][name*="newsletter"]',
      'input[type="checkbox"][id*="newsletter"]',
      'input[type="checkbox"][name*="subscribe"]',
      'input[type="checkbox"][id*="subscribe"]',
      'input[type="checkbox"] + label:has-text("newsletter")',
      'input[type="checkbox"] + label:has-text("subscribe")'
    ].join(', '));
  }

  // Radio button locators
  get contactMethodRadios(): Locator {
    return this.page.locator([
      'input[type="radio"][name*="contact"]',
      'input[type="radio"][name*="method"]',
      'input[type="radio"][name*="preference"]'
    ].join(', '));
  }

  get emailContactRadio(): Locator {
    return this.page.locator('input[type="radio"][value*="email"], input[type="radio"] + label:has-text("email")');
  }

  get phoneContactRadio(): Locator {
    return this.page.locator('input[type="radio"][value*="phone"], input[type="radio"] + label:has-text("phone")');
  }

  // Message and status locators
  get errorMessage(): Locator {
    return this.page.locator([
      '.error',
      '.error-message',
      '.alert-error',
      '.danger',
      '[role="alert"]',
      '.validation-error',
      '.field-error'
    ].join(', '));
  }

  get successMessage(): Locator {
    return this.page.locator([
      '.success',
      '.success-message',
      '.alert-success',
      '.confirmation',
      '.thank-you',
      '.form-success',
      '[role="status"]'
    ].join(', '));
  }

  get loadingIndicator(): Locator {
    return this.page.locator([
      '.loading',
      '.spinner',
      '.loader',
      '[aria-label="Loading"]',
      '.form-loading'
    ].join(', '));
  }

  // Field validation error locators
  get nameFieldError(): Locator {
    return this.page.locator([
      '.name-error',
      'input[name="name"] + .error',
      'input[id*="name"] + .error',
      '[data-field="name"] .error'
    ].join(', '));
  }

  get emailFieldError(): Locator {
    return this.page.locator([
      '.email-error',
      'input[name="email"] + .error',
      'input[type="email"] + .error',
      '[data-field="email"] .error'
    ].join(', '));
  }

  get phoneFieldError(): Locator {
    return this.page.locator([
      '.phone-error',
      'input[name="phone"] + .error',
      'input[type="tel"] + .error',
      '[data-field="phone"] .error'
    ].join(', '));
  }

  get messageFieldError(): Locator {
    return this.page.locator([
      '.message-error',
      'textarea[name="message"] + .error',
      '[data-field="message"] .error'
    ].join(', '));
  }

  // Labels for accessibility testing
  get nameLabel(): Locator {
    return this.page.locator('label[for*="name"], label:has-text("Name")');
  }

  get emailLabel(): Locator {
    return this.page.locator('label[for*="email"], label:has-text("Email")');
  }

  get phoneLabel(): Locator {
    return this.page.locator('label[for*="phone"], label:has-text("Phone")');
  }

  get messageLabel(): Locator {
    return this.page.locator('label[for*="message"], label:has-text("Message")');
  }

  // Helper method to get required field indicators
  get requiredFieldIndicators(): Locator {
    return this.page.locator('.required, [required], [aria-required="true"], .asterisk, *:has-text("*")');
  }

  // Helper method to get all form inputs
  get allFormInputs(): Locator {
    return this.page.locator('input, textarea, select');
  }

  // Helper method to get all interactive elements
  get allInteractiveElements(): Locator {
    return this.page.locator('input, textarea, select, button, [role="button"], [tabindex]');
  }
}