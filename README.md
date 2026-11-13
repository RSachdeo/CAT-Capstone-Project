# CAT-Capstone-Project

# Playwright E-Commerce Automation Framework

Enterprise-grade test automation framework for [AutomationExercise.com](https://automationexercise.com/) built with Playwright and TypeScript.

## Framework Architecture

```
playwright-ecommerce-framework/
├── config/              # Environment and configuration settings
├── fixtures/            # Custom Playwright fixtures
├── pages/               # Page Object Model classes
├── testdata/            # Test data files (users, products, payments)
├── tests/               # Test specifications
├── utils/               # Utility functions and helpers
├── reports/             # Test execution reports
└── playwright.config.ts # Playwright configuration
```

## Key Features

### Page Object Model (POM)
- **BasePage**: Common functionality shared across all pages
- **HomePage**: Home page interactions
- **LoginPage**: User registration and authentication
- **ProductsPage**: Product browsing and search
- **ProductDetailPage**: Individual product details
- **CartPage**: Shopping cart management
- **CheckoutPage**: Checkout and payment flow
- **ContactUsPage**: Contact form submission

### Custom Fixtures
- `pageFixtures.ts`: Pre-configured page objects with ad blocking
- `authFixtures.ts`: Authenticated user state for checkout tests

### Test Data Separation
- `users.ts`: User registration and login data
- `products.ts`: Product search terms and categories
- `payment.ts`: Payment card test data
- `contactUs.ts`: Contact form test data

### Advanced Features
- **Data-Driven Testing**: Parameterized tests with multiple data sets
- **Network Interception**: Request mocking and blocking
- **Accessibility Testing**: axe-core integration for WCAG compliance
- **Visual Regression**: Screenshot comparison testing
- **Cross-Browser**: Chrome, Firefox, Safari, and mobile

## Test Coverage

| Test Suite | Test Cases | Description |
|------------|------------|-------------|
| Auth | TC001-TC004 | Registration, login, logout |
| Products | TC005-TC010 | Search, view, add/remove cart |
| Checkout | TC011-TC012 | Full checkout flow, order review |
| Contact Us | TC013-TC014 | Form submission |
| Accessibility | TC015-TC019 | WCAG compliance checks |
| Visual | TC020-TC025 | Screenshot comparisons |
| Network | TC026-TC031 | API mocking, throttling |

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run with UI mode
npm run test:ui

# Run in headed mode
npm run test:headed

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run with debug mode
npm run test:debug

# View report
npm run report
```

## Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:
```
BASE_URL=https://automationexercise.com
TEST_USER_EMAIL=your_test_email@example.com
TEST_USER_PASSWORD=your_test_password
```

### Browser Configuration
Modify `playwright.config.ts` to adjust:
- Timeouts
- Retries
- Parallel execution
- Browser projects

## Design Decisions

### Locator Strategy
- **data-qa attributes**: Preferred for stability
- **Semantic selectors**: Used when data-qa unavailable
- **Text-based locators**: Used for dynamic content
- **Avoided**: XPath, CSS classes (prone to changes)

### Synchronization
- Playwright's auto-wait mechanism
- Custom `waitForPageLoad()` for complex transitions
- Network idle detection for SPA interactions

### Reporting
- HTML report with screenshots and traces
- JSON output for CI integration
- Trace viewer for debugging failures

### Error Handling
- Screenshots on failure
- Video recording on retry
- Trace collection for debugging

## Debugging

### Trace Viewer
```bash
# View trace for failed test
npm run trace -- reports/test-artifacts/<trace-file>
```

### Debug Mode
```bash
# Step through test execution
npm run test:debug
```

### Screenshots
Failed test screenshots are saved in `reports/test-artifacts/`

## CI/CD Integration

The framework supports CI environments with:
- Configurable retries (`CI=true`)
- Single worker execution
- Artifact collection
- JSON report output

Example GitHub Actions:
```yaml
- name: Run Playwright tests
  run: npm test
  env:
    CI: true
```

## Best Practices Implemented

1. **Scalability**: Modular page objects and utilities
2. **Maintainability**: Single responsibility per class
3. **Reusability**: Shared fixtures and helpers
4. **Readability**: Descriptive method names and test titles
5. **Reliability**: Proper waits and error handling

## Author

Ritesh Sachdeo - Capstone Project

## License

MIT
