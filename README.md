
Playwright Swag Labs Catalog Tests
-----------
End-to-end UI test automation built with **Playwright** and **TypeScript**, following **Page Object Model (POM)** and **data-driven testing** best practices to ensure scalable and maintainable test coverage.


Tech Stack
-----------------------------------

- Playwright  
- TypeScript  
- Playwright Test Runner  
- Page Object Model (POM)  
- Data-Driven Testing

Project Structure
-----------------------------------
```text
├── fixtures/        # Custom Playwright fixtures
├── pages/           # Page Objects
├── components/      # Reusable UI components
├── tests/           # Test specifications
├── playwright.config.ts
└── README.md
```
   
Running Tests:
-----------------------------------
Install dependencies:

    npm install
    npx playwright install
    
Run all tests:

    npx playwright test  


Run tests in headed mode:


    npx playwright test --headed

Run a single spec:


    npx playwright test tests/product-catalog.spec.ts