@echo off
echo Starting Food Ordering System...

echo.
echo Step 1: Installing backend dependencies...
cd backend
call npm install

echo.
echo Step 2: Seeding database with menu items...
node seed-data.js

echo.
echo Step 3: Starting backend server...
start "Backend Server" cmd /k "node index.js"

echo.
echo Step 4: Installing frontend dependencies...
cd ..
call npm install

echo.
echo Step 5: Starting frontend application...
start "Frontend App" cmd /k "npm start"

echo.
echo Application is starting...
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
