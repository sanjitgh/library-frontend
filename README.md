# Library Management System - Frontend

A simple library management system built with React, TypeScript, and Redux Toolkit Query.

## Features
- View all books
- Add, edit, delete books
- Borrow books
- View borrow summary

## Tech Stack
- React + TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS + ShadCN
- React Router

## Installation

1. Clone the repository
```bash
git clone https://github.com/sanjitgh/library-frontend.git
cd library-frontend
```

2. Install dependencies
```bash
bun install
```

3. Create `.env` file
```env
VITE_SERVER_URL=http://localhost:5000
```

4. Start the application
```bash
bun run dev 
```

## Available Scripts
- `npm run dev` - Run development server
- `npm run build` - Build for production

## Pages
- `/` - Book list
- `/create-book` - Add new book
- `/books/:id` - Book details
- `/edit-book/:id` - Edit book
- `/borrow-summary` - Borrow summary

## API Endpoints Used
- GET `/books` - Get all books
- POST `/books` - Create book
- PUT `/books/:id` - Update book
- DELETE `/books/:id` - Delete book
- POST `/borrows` - Borrow book
- GET `/borrows/summary` - Get borrow summary