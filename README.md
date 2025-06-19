# Planit Playwright Automation Assessment

## Overview
This repository contains automated tests for the Planit technical assessment using Playwright with TypeScript, following Page Object Model (POM) principles.

## Test Cases Covered
- Contact form validation error messages
- Successful contact form submission with dynamic data
- Shopping cart: product price, subtotal, and total verification

## Tech Stack
- Playwright
- TypeScript
- Allure Reports for test reporting

## Setup
1. Clone the repo  
2. Run `npm install` to install dependencies  
3. Run tests with `npx playwright test`

## Running Tests
- To run all tests headless:  
  `npx playwright test`  
- To run tests headed (with browser UI):  
  `npx playwright test --headed`

## Reporting
Allure reports are generated automatically after test runs.  
Run `npm run allure:serve` to view reports locally.

## Notes
- Tests are designed to be reusable and maintainable using POM  
- Integrated retry and parallel execution configurations  

---
