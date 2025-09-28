# fade-playwright

A sample playwright project for Fade

## Project Structure

```
├── src/
│   ├── pages/              # Page Object Model files
│   │   ├── FormLocators.ts # Centralized locators with fallback selectors
│   │   └── FormActions.ts  # Reusable form actions and validations
├── tests/
│   └── specs/
│       └── form.spec.ts    # Comprehensive test suite for the form
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
└── package.json           # Dependencies and scripts
```


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
```


