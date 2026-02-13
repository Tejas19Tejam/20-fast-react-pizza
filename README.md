# Fast React Pizza 🍕

A modern pizza ordering application built with React, Redux Toolkit, and React Router.

## Description

Fast React Pizza is a web application that allows users to browse a pizza menu, add items to their cart, and place orders. The app features a streamlined ordering process where users can track their orders and manage their cart with ease.

## Features

- Browse pizza menu
- Add/remove items from cart
- Update item quantities
- Place orders with delivery details
- Track order status
- View order history
- Priority order option
- Geolocation for address

## Technologies Used

- React
- Redux Toolkit
- React Router v6.4
- Tailwind CSS
- Vite
- Vitest (Testing)
- React Hot Toast

## Architecture

The application follows a feature-based folder structure:

- **`/features`** - Feature modules (cart, menu, order, user) with components and Redux slices
- **`/ui`** - Reusable UI components (Button, Header, Loader, Error)
- **`/services`** - API integration and external services
- **`/utils`** - Helper functions and utilities
- **`store.js`** - Redux store configuration

Each feature contains its own components, Redux logic (slices), and route handlers (loaders/actions) following React Router v6.4 patterns.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 20-fast-react-pizza
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Running Tests

### Run tests in watch mode

```bash
npm run test
```

### Run tests once

```bash
npx vitest run
```

### Run tests with UI

```bash
npx vitest --ui
```
