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
    return this.page.locator('h2');
  }

  // Input field locators with multiple fallback selectors
  get nameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Name' });
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  get countryDropdown(): Locator {
    return this.page.locator('svg');
  }

  get countryOption(): Locator {
    return this.page.getByRole('option');
  }

  get countryField(): Locator {
    return this.page.locator('div').filter({ hasText: /^Country$/ }).nth(2);
  }

  // Button locators
  get registerButton(): Locator {
    return this.page.getByRole('button', { name: 'Register' });
  }

  // Message and status locators
  get nameErrorMessage(): Locator {
    return this.page.getByText('Name is required.');
  }

  get emailErrorMessage(): Locator {
    return this.page.getByText('Enter a valid email address.');
  }

  get countryErrorMessage(): Locator {
    return this.page.getByText('Country is required.');
  }

  get successMessage(): Locator {
    return this.page.getByText('Your registration has been saved.');
  }

  // Registration result locators
  get registrationResultHeader() : Locator {
    return this.page.getByRole('heading', { name: 'Registrations' })
  }

  get nameColumnHeader(): Locator {
    return this.page.getByRole('columnheader', { name: 'Name' });
  }

  get emailColumnHeader(): Locator {
    return this.page.getByRole('columnheader', { name: 'Email' });
  }

  get countryColumnHeader(): Locator {
    return this.page.getByRole('columnheader', { name: 'Country' });
  }

  get registrationTableRows(): Locator {
    return this.page.locator('table tbody tr');
  }

  get registrationDeleteButton(): Locator {
    return this.page.getByRole('button', { name: 'Delete' });
  }
}
