@echo off
echo Pushing Online Food Ordering System to GitHub...
echo.

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files to Git...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: Complete online food ordering system with cart functionality"

echo.
echo Step 4: Adding GitHub remote repository...
git remote add origin https://github.com/vanshit09/online-food-ordering.git

echo.
echo Step 5: Setting main branch...
git branch -M main

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Project successfully pushed to GitHub!
echo Repository URL: https://github.com/vanshit09/online-food-ordering
echo.
pause
