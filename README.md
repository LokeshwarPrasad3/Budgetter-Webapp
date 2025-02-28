# Budgetter - Your Daily Expenses Tracker

**Budgetter** is designed to help students and individuals track their daily expenses, analyze their spending habits, and manage their pocket money efficiently. This project was born out of the need for a better system to keep track of personal finances, beyond just noting down expenses without proper analytics.

## Table of Contents

1. [Features](#features)
2. [Screenshot of Project](#screenshot-of-project)
3. [Technology Stack](#technology-stack)
4. [How to Use Locally](#how-to-use-locally)
5. [Testing](#testing)
6. [Contributing](#contributing)
7. [Live Demo](#live-demo)

## Features

#### 1. Dashboard
- Visualize your total pocket money, expenses, recent spending, and which categories consume the most money.

#### 2. Add Expense
- Users can add expenses with the following details: date, name, category, and amount.
- If you've already added an expense today, it will automatically show below in a table displaying today's added expenses.

#### 3. Show Expenses
- By default, this section shows today's expenses.
- It includes a date filter to view expenses based on specific days, displaying details such as ID, name, price, category, and the time the expense was added.

#### 4. Reports
- The Reports section provides detailed insights into your spending:
  - Displays all expenses for the current month by default.
  - Includes filters such as:
    - Last 7 days' expenses.
    - Total expenses by category.
    - Date range input for expenses.
    - Select a specific month to view its expenses.

#### 5. Add Money
- Users can add the money they receive from any source (e.g., parents, salary) to their account.
- The wallet shows previous money entries, stored securely in the database.

#### 6. Add Lent Money
- Record money you lend with details (amount, recipient, date). The amount is deducted from your wallet and added back when you mark it as "Money Received.

#### 7. Delete Account  
- Users can permanently delete their account.  
- Removes all data, including expenses, lent money, and records.  

#### 8. Update User Details  
- Users can update personal details (name, email, password).  
- Ensures secure and up-to-date account management.

#### 9. Gmail Service : 
- User can forgot & change password through reset link and get verification link after account creation.

---


## Screenshot of Project 

### 1. Landing Page

![Landing Page Screenshot](https://i.ibb.co/7kmv6k3/image.png)

### 2. Dashboard
![Dashboard Page Screenshot](https://i.ibb.co/TBWzJkmd/Screenshot-8.png)

---

## Technology Stack

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/react--hot--toast-%23FF0000.svg?style=for-the-badge&logo=react&logoColor=white)

![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![MongoDB](https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/cloudinary-%233776E6.svg?style=for-the-badge&logo=cloudinary&logoColor=white)
![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)


---

## How to Use Locally
**If You Dont want to run server code then neglect server commands**

1. Clone the repository:
    ```bash
    git clone https://github.com/LokeshwarPrasad3/Budgetter-Webapp.git
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd client
    npm install

    cd server
    npm install
    ```

3. Create a `.env` file in the server folder with the following content:
    ```
    PORT=5000

    MONGO_URL=mongodb://127.0.0.1:27017/budgetter

    ACCESS_TOKEN_SECRET_KEY=
    ACCESS_TOKEN_SECRET_EXPIRY=3d

    RESET_PASSWORD_TOKEN_SECRET=
    RESET_PASSWORD_TOKEN_SECRET_EXPIRY=1d

    ACCOUNT_VERIFICATION_TOKEN_SECRET=
    ACCOUNT_VERIFICATION_TOKEN_SECRET_EXPIRY=1d

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    ADMIN_GMAIL=
    GMAIL_PASSKEY=

    FRONTEND_URL=http://localhost:5173
    SERVER_URL=http://localhost:5000
    ```

4. Run the backend server:
    ```bash
    cd server
    npm run dev
    ```

5. Run the frontend development server:
    ```bash
    cd client
    npm run dev
    ```

6. Open `http://localhost:5173` in your browser to access the application.

---

## Testing

To test the application, use the following credentials:

```plaintext
Username: lokeshwardewangan
Password: 12345
```

## Contributing 

### Use And Make Issue :

Create an issue for any feature request, bug, or improvement.

### Contribute :

Fork the repository, make your changes, and create a pull request, for detailed guidelines on contributing, please see **CONTRIBUTING.md**.

---

## Live Demo 

[https://mybudgetter.netlify.app/](https://mybudgetter.netlify.app/)


## Maintainer

### Lokeshwar Dewangan
- **Role**: Full Stack Developer
- **Email**: [lokeshwar.prasad.cse@gmail.com](mailto:lokeshwar.prasad.cse@gmail.com)

---

For any questions, feedback, or contributions, feel free to reach out!
