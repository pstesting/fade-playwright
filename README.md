# fade-playwright

A comprehensive Playwright TypeScript test framework for the Fade Systems QA test form located at:
http://fade-systems-qa-test.s3-website-eu-west-1.amazonaws.com/

## Project Structure

```
├── src/
│   ├── pages/              # Page Object Model files
│   │   ├── FormPage.ts     # Main page object with comprehensive form interactions
│   │   ├── FormLocators.ts # Centralized locators with fallback selectors
│   │   └── FormActions.ts  # Reusable form actions and validations
│   └── utils/
│       └── TestData.ts     # Test data generators and constants
├── tests/
│   └── specs/
│       └── form.spec.ts    # Comprehensive test suite for the form
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
└── package.json           # Dependencies and scripts
```

## Features

### Page Object Model Architecture
- **FormPage.ts**: Main page object with all form interactions
- **FormLocators.ts**: Centralized locators with multiple fallback selectors for robustness
- **FormActions.ts**: Separated actions from locators for better maintainability

### Comprehensive Test Coverage
- Form load and structure validation
- Complete form submission with valid data
- Field validation testing (required fields, format validation)
- Accessibility and keyboard navigation testing
- Cross-browser and mobile compatibility testing
- Error handling and edge cases

### Test Data Management
- Configurable test data generators
- Support for valid, invalid, and edge case data
- Email and phone number validation patterns
- Special character and internationalization support

### Robust Locator Strategy
The framework uses multiple fallback selectors to ensure tests work across different form implementations:
- Name-based selectors (`name="fieldname"`)
- ID-based selectors (`id="fieldname"`)
- Type-based selectors (`type="email"`)
- Placeholder-based selectors (`placeholder*="email"`)
- Class-based selectors (`.field-class`)
- Text-based selectors for buttons and labels

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npm run install:browsers
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (with browser UI)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode
```bash
npm run test:ui
```

### View test reports
```bash
npm run report
```

## Development

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
```

### TypeScript Compilation Check
```bash
npx tsc --noEmit
```

## Configuration

### Playwright Configuration
- Multi-browser testing (Chromium, Firefox, WebKit)
- Mobile device testing (iOS, Android)
- Screenshot and video capture on failure
- Trace collection for debugging
- Configurable timeouts and retry strategies

### Test Environment
- Base URL configured for the target application
- Multiple test projects for different browsers and devices
- Parallel test execution support
- CI/CD ready configuration

## Test Data Examples

The framework includes comprehensive test data generators:

```typescript
// Valid form data
const validData = TestDataGenerator.getValidFormData();

// Invalid email data for validation testing
const invalidEmailData = TestDataGenerator.getInvalidEmailData();

// Special character data for internationalization testing
const specialCharData = TestDataGenerator.getSpecialCharacterData();

// Random data for stress testing
const randomData = TestDataGenerator.getRandomValidData();
```

## Locator Strategy Examples

The framework uses multiple fallback locators to ensure robustness:

```typescript
// Email input with multiple fallback selectors
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
```

## Test Categories

1. **Form Load and Structure**: Validates form presence and accessibility
2. **Valid Data Submission**: Tests successful form submissions
3. **Field Validation**: Tests required fields and format validation
4. **Form Functionality**: Tests reset, navigation, and loading states
5. **Accessibility and UX**: Tests keyboard navigation and screen reader support
6. **Edge Cases**: Tests error handling, long text, and rapid submissions
7. **Cross-Platform**: Tests mobile and tablet viewports

## Customization

To adapt this framework for different forms:

1. Update the locators in `FormLocators.ts` to match your form structure
2. Modify test data in `TestData.ts` to match your form fields
3. Adjust validation messages and success criteria in the test constants
4. Update the base URL in `playwright.config.ts`

## Best Practices Implemented

- Separation of concerns (locators, actions, test data)
- Robust locator strategies with fallbacks
- Comprehensive error handling
- Accessibility testing integration
- Mobile-first responsive testing
- CI/CD ready configuration
- Type-safe TypeScript implementation
- ESLint and Prettier for code quality

## Support for Form Variations

The framework is designed to work with various form implementations:
- Contact forms
- Registration forms
- Feedback forms
- Newsletter signup forms
- Multi-step forms
- Forms with conditional fields

## Troubleshooting

If tests fail to find elements:
1. Check the actual form HTML structure
2. Update locators in `FormLocators.ts` to match
3. Use Playwright's `--debug` mode to inspect elements
4. Check the trace files for detailed execution information

The framework's multiple fallback selectors should handle most common form variations without modification.
