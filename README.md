# Fintech Playwright - E2E Testing Suite

Automated end-to-end testing for fintech applications using Playwright & TypeScript.

## 📋 Project Overview

This project demonstrates professional test automation following the **Page Object Model (POM)** pattern. It tests a complete purchase flow on a demo fintech/ecommerce application.

## 🎯 Test Coverage

- **Login Flow**: Valid credentials, invalid password, empty fields
- **Product Browsing**: View and select products
- **Shopping Cart**: Add/remove items, manage quantities
- **Checkout**: Fill shipping info and complete purchase
- **Order Confirmation**: Verify successful transaction

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the project root:

```
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/login.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# View test report
npx playwright show-report
```

## 📁 Project Structure

```
fintech-playwright/
├── tests/
│   ├── pages/              # Page Object Models
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── login.spec.ts       # Login test cases
│   └── checkout.spec.ts    # E2E checkout tests
├── test-data/              # Test data & fixtures
├── test-results/           # Test execution reports
├── playwright.config.ts    # Playwright configuration
├── package.json
└── README.md
```

## 🔧 Configuration

- **Browser**: Chromium
- **Base URL**: https://www.saucedemo.com
- **Timeout**: 30 seconds per action
- **Reports**: HTML with screenshots & videos on failure

## 📊 Test Results

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## 🛠️ Tech Stack

- **Playwright** - Browser automation
- **TypeScript** - Type-safe testing
- **Node.js** - Runtime environment

## 📝 Best Practices Used

✅ Page Object Model pattern  
✅ Descriptive test names  
✅ Proper wait strategies  
✅ Reusable page methods  
✅ Environment variables for sensitive data  

## 🤝 Contributing

This is a learning project. Feel free to extend with:
- More test scenarios
- API integration tests
- Performance testing
- Mobile responsiveness tests

## 📚 Learn More

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)

---

**Status**: First Playwright Implementation
