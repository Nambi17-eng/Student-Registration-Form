# Student Registration Form

A responsive, beginner-friendly web application for collecting and managing student registration details. Built with plain HTML, CSS, and JavaScript — real-time form validation, inline error messages, and a clean success summary, with no frameworks or backend required.

## Features
- Responsive two-column layout that adapts to mobile screens
- Real-time validation for name, roll number, email, phone, date of birth, course, gender, and address
- Inline error messages with red/green input borders for invalid/valid fields
- Live character counter on the address field
- Date-of-birth field capped at today's date, plus a minimum-age check
- Success screen summarizing everything the student entered
- Reset button to clear the form at any point

## Tech Stack
- HTML5
- CSS3 (Flexbox & Grid — no framework)
- Vanilla JavaScript (no libraries)

## Folder Structure
```
anudip/
├── README.md
├── index.html   → main page (open this file to run the app)
├── style.css     → all styling
└── script.js      → form validation & interactivity
```

## How to Run
1. Download or clone the `anudip` folder.
2. Open `anudip/index.html` in any modern browser (Chrome, Edge, Firefox).
3. No installation, build step, or server needed — it runs entirely in the browser.

## How It Works
1. Fill in each field. An error message appears as soon as a field is left empty or filled in incorrectly.
2. The **Register** button re-checks every field before allowing submission.
3. On a valid submission, the form is replaced by a summary card showing everything you entered.
4. Click **Register another student** to reset the form for a fresh entry.

## Possible Improvements
- Connect the form to a backend (Node.js, PHP, or Firebase) to store submissions permanently
- Add a database (or Google Sheets) integration for real student records
- Export registered details as a PDF or CSV file
- Add an admin view to list all registered students

## Author
Jothi — Final-year Cyber Security student
