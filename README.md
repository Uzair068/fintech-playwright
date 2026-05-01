# 🏦 Fintech Playwright E2E Framework



![Playwright Tests](https://github.com/Uzair068/fintech-playwright/actions/workflows/playwright.yml/badge.svg)



A production-grade test automation framework built with **Playwright + TypeScript** 
covering UI, API, and database verification for banking/fintech applications.

---

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright | E2E UI + API Testing |
| TypeScript | Type-safe test code |
| GitHub Actions | CI/CD Pipeline |
| Page Object Model | Test Architecture |
| dotenv | Environment config |

---

## 📁 Project Structure

fintech-playwright/
├── pages/                  # Page Object classes
│   ├── LoginPage.ts        # Login page actions
│   ├── ProductsPage.ts     # Products page actions
│   ├── CartPage.ts         # Cart page actions
│   └── CheckoutPage.ts     # Checkout page actions
├── tests/
│   ├── auth.setup.ts       # One-time login session
│   ├── login.spec.ts       # Login test cases
│   ├── checkout.spec.ts    # E2E checkout flow
│   ├── fixtures.spec.ts    # Fixture pattern demo
│   └── api/
│       └── users.spec.ts   # API test cases
├── fixtures/
│   └── index.ts            # Custom fixtures
├── test-data/              # JSON test data
├── playwright.config.ts    # Framework config
└── .github/workflows/      # CI/CD pipeline


---

## ✅ Test Coverage

### UI Tests
| Test Case | Description |
|-----------|-------------|
| TC001 | Successful login with valid credentials |
| TC002 | Login fails with wrong password |
| TC003 | Login fails with empty fields |
| TC001 | Add product and complete full checkout |
| TC002 | Add multiple products verify cart count |
| TC003 | Sort products by price low to high |

### API Tests
| Test Case | Method | Description |
|-----------|--------|-------------|
| TC001 | GET | Fetch list of users |
| TC002 | GET | Fetch single user |
| TC003 | GET | User not found returns 404 |
| TC004 | POST | Create new user returns 201 |
| TC005 | PUT | Update existing user |
| TC006 | DELETE | Delete user returns 200 |

---

## 🏗️ Framework Architecture

Test runs npx playwright test
↓
playwright.config.ts (3 projects)
↓
┌──────────────────────────────┐
│ Project 1: SETUP             │
│ Login once → save session    │
└──────────┬───────────────────┘
↓
┌──────────────────────────────┐
│ Project 2: CHROMIUM          │
│ UI tests (already logged in) │
└──────────┬───────────────────┘
↓
┌──────────────────────────────┐
│ Project 3: API               │
│ Pure API tests (no browser)  │
└──────────────────────────────┘

---

## ⚡ Key Features

- **Page Object Model** — maintainable, reusable page classes
- **storageState** — login once, reuse session across all tests
- **Custom Fixtures** — auto-inject page objects into tests
- **API Testing** — replace manual Postman with automated tests
- **CI/CD** — auto-runs on every GitHub push
- **HTML Reports** — detailed test reports with screenshots

---

## 🛠️ Setup & Run

### Prerequisites
- Node.js v20+
- VS Code

### Installation
```bash
# Clone the repo
git clone https://github.com/Uzair068/fintech-playwright.git
cd fintech-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Copy environment file
cp .env.example .env


Design Decisions
Why Page Object Model?
Change one locator → fixes all tests that use it.
Without POM, one UI change breaks 50 test files.
Why storageState?
Login once instead of 50 times.
Reduces test suite time by ~40%.
Why API Testing alongside UI?
UI can show success even when backend fails.
API tests catch hidden backend bugs before users do.
Why GitHub Actions?
Every PR is validated automatically.
No manual test runs needed.
Bugs caught before reaching production.
👨‍💻 Author
Mohammed Uzair
GitHub: @Uzair068
LinkedIn: [Add your LinkedIn here]
📊 Test Results
Total Tests: 20
Pass Rate: 100%
Browsers: Chromium
Execution Time: ~30 seconds

Design Decisions
Why Page Object Model?
Change one locator → fixes all tests that use it.
Without POM, one UI change breaks 50 test files.
Why storageState?
Login once instead of 50 times.
Reduces test suite time by ~40%.
Why API Testing alongside UI?
UI can show success even when backend fails.
API tests catch hidden backend bugs before users do.
Why GitHub Actions?
Every PR is validated automatically.
No manual test runs needed.
Bugs caught before reaching production.
👨‍💻 Author
Mohammed Uzair
GitHub: @Uzair068
LinkedIn: [Add your LinkedIn here]
📊 Test Results
Total Tests: 20
Pass Rate: 100%
Browsers: Chromium
Execution Time: ~30 seconds
