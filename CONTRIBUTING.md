# Contributing to Budgetter - Your Daily Expenses Tracker

Thank you for your interest in contributing to **Budgetter**! Your support helps improve our app, allowing individuals and students to manage their daily expenses more effectively.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Coding Standards](#coding-standards)
3. [Branch Naming Conventions](#branch-naming-conventions)
4. [Submitting a Pull Request](#submitting-a-pull-request)
5. [Commit Messages](#commit-messages)

---

## 1. Getting Started

1. **Fork the Repository**: First, fork this repository to your GitHub account.
2. **Clone Your Fork**: Clone the forked repository to your local machine.
   ```bash
   git clone https://github.com/your-username/Budgetter-Webapp.git
   ```
3. **Install Dependencies**: Install the required packages for both frontend and backend.
   ```bash
    cd client
    npm install

    cd ../server
    npm install
    ```
4. **Run the App**: Start the development servers for both frontend and backend.
   ```bash
    cd server
    npm run dev

    cd ../client
    npm run dev
    ```

## 2. Coding Standards
*  **Code Style**: Use Prettier for formatting. Example configuration:
    ```bash
    {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "tabWidth": 2
    }

    ```
*  **TypeScript**: Use TypeScript for strict type-safety. Avoid *any* unless absolutely necessary.
*  **Naming Conventions**: 
    - Components and files should use PascalCase (e.g., *MyComponent.tsx* ).
    - Variables and functions should use camelCase.

## 2. Branch Naming Conventions
Please use the following branch naming convention:

*  **feature/feature-name**: For new features (e.g., 
 *feature/add-auth* ).
*  **fix/bug-description**: For bug fixes (e.g.,
 *fix/button-not-clickable* ).
*  **chore/description**: For maintenance tasks (e.g., 
 *chore/update-dependencies* ).

### Example Branch Naming

- feature/add-login
- fix/navbar-styling
- chore/refactor-code

## 4. Submitting a Pull Request

1. **Sync with Main Branchy**: Before creating a PR, make sure your branch is up-to-date with the main branch.
    ```base
    git checkout master
    git pull origin master
    git checkout your-branch-name
    git rebase master

    ```
2. **Open a Pull Request**: Go to the original repository and create a pull request from your forked branch. Please include the following:
    - **Descriptive Title**: Summarize the changes.
    - **Detailed Description**: Explain what the PR does and any relevant context.

3. **PR Reviews**: All PRs must be reviewed and approved by at least one maintainer before merging.

## 5. Submitting a Pull Request
Write clear and concise commit messages. Use the following format:

- **feat**: A new feature.
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style updates (formatting, missing semi-colons, etc.)
- **refactor**: Code restructuring without functionality change
- **test**: Adding or updating tests

### Example Commit Messages
- feat: add login form component
- fix: resolve navbar alignment issue
- docs: update README with setup instructions
- style: format code with Prettier

**By following these guidelines, you help us maintain a high-quality, consistent codebase. Thank you for your contributions! 🎉**