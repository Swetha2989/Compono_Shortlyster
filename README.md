# Demo Automation test scripts for Shortlyster Application

This folder contains demo automation script using [Playwright](https://playwright.dev/docs/why-playwright/) and [Cucumber JS](https://github.com/cucumber/cucumber-js)

# Getting Started

This is a standard NodeJS project, with the `package.json`.

To get started, run the follwoing `bash` command.

```bash
npm install
```

Next check the `scripts` section of the `package.json` to see what scripts exist.

## Environment Configuration

Environment configuration is hnadled through [dotenv](https://www.npmjs.com/package/dotenv)

- Created `.env` file in the root directory
- Set the environment variables manually

Here `.env` file contains below variables to login to the applicaiton.
`BASE_URL`
`TEST_USERNAME`
`TEST_PASSWORD` 

Ths easiest way to get started to update the `.env` file with the variables we want.

`---Before running tests---`
Change .env file with correct values to login to the application.


# Running Tests

Tests are run by using the following `bash` command.

```bash
npm test
```






