# Online Food Ordering System - GKMIT Restaurant

A modern web application for online food ordering built with React and Node.js.

## Features

- User authentication (Login/Register)
- Browse food menu with images
- Add items to cart
- Secure checkout process
- Responsive design with Bootstrap
- Protected routes for cart and payment

## Technologies Used

- **Frontend**: React 18, Bootstrap 5, React Router DOM 6
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with localStorage persistence

## Quick Start

### Option 1: Automated Setup (Recommended)
1. Double-click `start-app.bat` to automatically set up and start the application

### Option 2: Manual Setup

#### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

#### Backend Setup
```bash
cd backend
npm install
node seed-data.js  # Seeds the database with sample food items
node index.js      # Starts backend server on port 5000
```

#### Frontend Setup
```bash
# In project root directory
npm install
npm start          # Starts frontend on port 3000
```

## Environment Variables

Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/restaurant
ACCESS_TOKEN=your_jwt_secret_key_here
PORT=5000
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Menu**: View all available food items with images and prices
3. **Add to Cart**: Click "Add to cart" on any food item (requires login)
4. **View Cart**: Click the cart button in the navbar to see your items
5. **Checkout**: Proceed to payment from the cart page

## Fixed Issues

- ✅ Menu items now display properly with images
- ✅ Cart functionality working with authentication
- ✅ Database seeding with sample food items
- ✅ Fixed middleware import issues
- ✅ Added proper image serving from backend
- ✅ Fixed React key warnings in menu items

## Troubleshooting

1. **Menu not showing**: Ensure MongoDB is running and database is seeded
2. **Cart not working**: Make sure you're logged in and backend server is running
3. **Images not loading**: Check if backend server is serving static files properly
