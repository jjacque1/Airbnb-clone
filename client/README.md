# Airbnb Clone – Frontend

## Overview

This is the frontend for a full-stack Airbnb clone application built using React and Vite. The application connects to a custom Node.js/Express backend and provides a user interface for authentication, property listings, and bookings.

This project is being built step-by-step with a focus on deeply understanding real-world frontend architecture, React fundamentals, and full-stack integration.

---

## Tech Stack

* React (Vite)
* React Router DOM
* Axios
* CSS

---

## Project Structure

```
src/
  components/
    Layout.jsx
    Header.jsx
  pages/
    IndexPage.jsx
    LoginPage.jsx
    RegisterPage.jsx
    ProfilePage.jsx
    PlacesPage.jsx
    PlaceFormPage.jsx
    PlacePage.jsx
    BookingsPage.jsx
  App.jsx
  main.jsx
  index.css
```

---

## Current Status

Frontend setup has been initialized. Routing, layout, and core pages are being built progressively.

---

## Goals

* Build a production-style frontend architecture
* Integrate with backend authentication and APIs
* Implement real-world UI patterns and data flow

---

## How to Run

```
cd client
npm install
npm run dev
```

---

## Next Steps

* Set up routing with React Router
* Create page components
* Build shared layout and navigation
* Connect frontend to backend API

```
```
## Current Progress

The frontend foundation has been set up with React Router and a shared layout architecture.

### Completed so far

* Vite React frontend initialized
* React Router installed and configured
* Base route structure created
* Shared `Layout` component added
* `Header` component added
* `Footer` component added
* Initial pages created:

  * Home page
  * Login page
  * Logout page

### Architecture Notes

The app now uses a shared layout pattern with `Outlet`, which allows the header and footer to remain persistent while page content changes based on the route.
