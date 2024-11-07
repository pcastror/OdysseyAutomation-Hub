## Automated API Testing with Cucumber, TypeScript, and GitHub Actions

This repository contains a test suite built with Cucumber and TypeScript for automated API testing. The tests are run with GitHub Actions and include step definitions, hooks, utilities, and a custom `runTest.ts` script for managing test execution and reporting.

---
## Table of Contents

- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running Tests](#running-tests)
    - [Run Tests with Report](#run-tests-with-report)
    - [Run Tests without Report](#run-tests-without-report)
- [Environment Variables](#environment-variables)
- [GitHub Actions](#github-actions)
---
## Project Structure

The repository is organized as follows:

- `features/`: Contains feature files written in Gherkin for Cucumber.
- `step-definitions/`: Houses step definitions, which connect Gherkin steps with the actual test logic.
- `hooks/`: Defines any Cucumber hooks that run before or after tests.
- `client/`: Includes services for handling API calls and credentials.
    - `client-credential.service.ts`: Initializes environment variables.
    - `request.service.ts`: Uses `axios` and credentials to perform API calls.
- `util/`: Contains utility scripts.
    - `runTest.ts`: A custom script to execute tests and generate a report using the command `npx ts-node util/runTest.ts`.
---
## Setup and Installation

1. Clone this repository:
   ```
   git clone
   ```
2. Install dependencies
    ```
    cd into directory
    npm ci
    ```
---
## Running Tests
You can run the tests with or without generating a report.

### Run Tests with Report

To run the tests and generate a report, use the following command:

```
npx ts-node util/runTest.ts
```
This command uses `child-process` to execute `npm run test:cucumber`, which runs the tests and saves the report url in a txt and also generate the report in JSON format.

### Run Tests without Report

To run the tests without generating a report, you can simply run:

```
npm run test:cucumber
```
---
## Environment Variables
The client/client-credential.service.ts file loads environment variables for authentication and API requests. Ensure you have a .env file in the root of the project with the necessary variables.

Example .env file:

```
URL=https://swapi.dev
```
---
## GitHub Actions
This repository uses GitHub Actions to automate test execution. Each time a change is pushed, the tests will run automatically and report the results in the Actions tab.

---

_Note: The API used to test is [swapi.dev](https://swapi.dev/)._ 

What is this?
The Star Wars API, or "swapi" (Swah-pee) is the world's first quantified and programmatically-accessible data source for all the data from the Star Wars canon universe!

In simply word is a playground for projects and tutorial. This project is open source, and you can contribute on GitHub.

### Copyright and stuff?
Star Wars and all associated names are copyright Lucasfilm ltd.
This project is open source and carries a BSD licence.
All data has been freely collected from open sources such as Wookiepedia.