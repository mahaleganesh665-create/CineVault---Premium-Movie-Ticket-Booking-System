# CineVault - Premium Movie Ticket Booking System

A highly animated, visually stunning cinema booking platform built specifically as a full-features college project or startup prototype.

## Technologies Used

- HTML5, CSS3, JavaScript (Vanilla ES6)
- **Supabase** (PostgreSQL Database & Authentication)
- Custom CSS logic for animations, glassmorphism, and responsive design

## Features

- **Premium UI/UX:** Dark theme, backdrop blur, hover animations, scroll-reveal transitions, and custom loaders.
- **Seat Booking Logic:** Interactive visual seat map, live pricing calculations, max limits.
- **Backend Connected:** Users can signup, login, and book movies that accurately get tracked in the database online via Supabase.
- **Dashboards:** Dedicated user 'My Bookings' page and an Admin Dashboard to monitor sales and revenue.

## Setup Instructions

If you wish to configure the backend correctly with Supabase rather than running entirely locally on mock data:

1. Create an account on <https://database.new> and create a new project.
2. In the sidebar, go to **SQL Editor**. Copy everything from the `database_setup.sql` file and click `Run`. This will initialize your database with the necessary tables and dummy movies.
3. Next, from your Supabase Dashboard, click the gear icon to go to **Project Settings** -> **API**.
4. Scroll down, copy the **Project URL** and the **anon public API key**.
5. Paste those values into `js/supabase.js` on lines 8 and 9 where instructed.

## Admin Login Credentials

For demonstration and testing purposes, you can jump straight into the Admin Dashboard without needing to create a backend account.

From the `index.html` main page scroll to the bottom footer and click `Admin Portal` (or navigate directly to `admin/login.html`). Use the following credentials:

- **Email:** <admin@cinevault.com>
- **Password:** admin123
- **Security Key:** cineadmin

## How to Run

Simply use a live server (Like the VS Code Live Server extension or Python's `python -m http.server`) on the root folder. No `npm install` is required for this vanilla stack!

## Author

CineVault Admin Team
