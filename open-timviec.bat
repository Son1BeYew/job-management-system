@echo off
REM Quick launcher for Job Search page
REM Opens the job search page in default browser

echo Opening CareerViet Job Search page...
start http://localhost:8080/tim-viec-lam.html

echo.
echo Job Search page opened in browser!
echo Make sure Spring Boot is running (mvnw spring-boot:run)
pause
