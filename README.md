# Expense Tracker Frontend

A modern and responsive Expense Tracker web application built using **React.js**.
This frontend connects to a live backend API to allow users to manage budgets, track expenses, and compare spending.

---

## Live Demo

Frontend (Netlify):
[https://react-expense-tracker-frontend-app.netlify.app/](https://react-expense-tracker-frontend-app.netlify.app/)

---

## Features

### Authentication

* User Signup
* User Login
* JWT-based authentication
* Protected routes using cookies
* Auto redirect on token expiry

### Dashboard

* Total Budget
* Total Spent
* Remaining Balance
* Category-wise budget summary
* Progress bars for spending

### Expense Management

* Add new expenses
* Category selection
* Description support
* Expense history display

### Budget Management

* Create new budget
* Update existing budget
* Category-wise monthly limits

### Budget vs Expense Comparison

* Category-wise comparison
* Progress indicators
* Status:

  * On Track
  * Over Budget

### UI/UX

* Clean modern layout
* Responsive design
* Sticky navigation bar
* Active tab highlighting
* Loading spinners for API calls

---

## Tech Stack

* React.js (Hooks)
* React Router v5
* JavaScript (ES6)
* CSS3 (Custom styling)
* js-cookie (JWT storage)
* react-loader-spinner

---

## Project Structure

```
src/
│
├── components/
│   ├── Landing
│   ├── Login
│   ├── Signup
│   ├── Dashboard
│   ├── AddExpense
│   ├── Budgets
│   ├── Compare
│   ├── Navbar
│   ├── Loader
│   └── ProtectedRoute
│
├── constants/
│   ├── apiStatusConstants.js
│   └── categories.js
│
├── services/
│   └── api.js
│
├── App.js
└── index.js
```

---

## Backend API

This frontend connects to the deployed backend:

```
https://expense-tracker-backend-production-bf28.up.railway.app
```

Main endpoints used:

* POST /auth/login
* POST /auth/register
* GET /budgets/compare
* POST /expenses
* POST /budgets
* PUT /budgets

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/DawkharAdnyaDnyaneshwar/expense-tracker-frontend.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm start
```

App will run at:

```
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
```

---

## Deployment

The frontend is deployed using **Netlify**.

### Build settings

* Build command:

```
npm run build
```

* Publish directory:

```
build
```

---

## Authentication Flow

1. User signs up or logs in.
2. Backend returns JWT token.
3. Token is stored in browser cookies.
4. Protected routes check for token.
5. If token is missing or expired:

   * User is redirected to login or landing page.

---

## Categories Used

* Food
* Transport
* Entertainment
* Shopping
* Utilities
* Health
* Education
* Other

---

## Future Improvements

* Monthly filters
* Expense editing & deletion
* Dark mode
* Export to CSV/PDF
* Notifications

---

## Author

**Adnya Dawkhar**
GitHub: [https://github.com/DawkharAdnyaDnyaneshwar](https://github.com/DawkharAdnyaDnyaneshwar)

---

## License

This project is open-source and free to use for educational purposes.
