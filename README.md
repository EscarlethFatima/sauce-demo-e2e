## Playwright Swag Labs Catalog Tests

End-to-end UI test automation built with **Playwright** and **TypeScript**, following **Page Object Model (POM)** and **data-driven testing** best practices to ensure scalable and maintainable test coverage.

## Tech Stack

- Playwright
- TypeScript
- Playwright Test Runner
- Page Object Model (POM)
- Data-Driven Testing

## Project Structure

```text
├── fixtures/        # Custom Playwright fixtures
├── pages/           # Page Objects
├── components/      # Reusable UI components
├── tests/           # Test specifications
├── playwright.config.ts
└── README.md
```

## Running Tests:

Install dependencies:

    npm install
    npx playwright install

Run all tests:

    npx playwright test  

Run tests in headed mode:

    npx playwright test --headed

Run a single spec:

    npx playwright test tests/catalog/product-catalog.spec.ts

Run a single spec with a specific browser(chromium,firefox,webkit):

    npx playwright test tests/catalog/product-catalog.spec.ts --project=chromium

## Workers (Parallel Execution)

Playwright uses **workers** to run tests in parallel and reduce execution time.

- A worker is an isolated process that executes tests independently
- Each worker has its own browser context and does not share state
- More workers = faster test execution

### Default behavior

- Local runs use available CPU cores
- CI environments typically run with fewer workers

### Running tests with a specific number of workers

    npx playwright test --workers=2

## Known Issues – problem_user

The application was tested using the `problem_user` account to identify known defects intentionally present in the system.

Issues found during testing are documented in detail in the following file:

- **[BUGS.md](./BUGS.md)**