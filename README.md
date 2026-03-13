## PLANNING Core flows

Auth: email/password (bcrypt) + JWT (httpOnly cookie)

Listings: host can create/update/delete listings (photos, amenities, pricing, address)

Search: location + dates + guests + price/filters

Booking: availability checks, booking creation/cancel

Reviews: only guests who completed stays can review

Host dashboard: manage listings + reservations

User profile: trips, wishlists

## Production concerns

Input validation, error handling, rate limiting

CORS + cookies setup correctly

Secure headers, env vars, logging

Image uploads (cloud storage)

Deployment: client + API + MongoDB Atlas

## Tech choices (simple but real)

Backend: Node + Express + MongoDB + Mongoose

Auth: JWT in httpOnly cookies

Images: Cloudinary (or S3 later)

Client: React + Vite + React Router

State: Context (Auth + Search), and plain props where possible

Dates: date-fns

Maps: Mapbox (later, after basic listings work)

# Airbnb Clone (MERN)

A production-style Airbnb clone built with the MERN stack to practice full-stack architecture, authentication, and scalable API design.

The goal of this project is to replicate the **core backend architecture of Airbnb**, including authentication, listing management, and booking flows.

---

# Tech Stack

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

Authentication
- JWT (JSON Web Tokens)
- httpOnly cookies
- bcrypt password hashing

Frontend (planned)
- React
- Vite
- React Router
- Context API

Other planned tools
- date-fns
- Cloudinary (image storage)
- Mapbox (maps)

---

# Current Backend Features

### Authentication
Secure user authentication using JWT stored in httpOnly cookies.

Routes implemented:

POST /auth/register
POST /auth/login
GET /auth/profile
POST /auth/logout


Security features:
- bcrypt password hashing
- JWT token signing
- httpOnly cookie storage
- token verification middleware pattern

---

### Listings (Places)

Hosts can create and manage listings.

Implemented routes:


Security features:
- bcrypt password hashing
- JWT token signing
- httpOnly cookie storage
- token verification middleware pattern

---

### Listings (Places)

Hosts can create and manage listings.

Implemented routes:

POST /places → create a listing
GET /user-places → get listings owned by logged in user
GET /places/:id → fetch a single listing


Each listing stores:

title
address
photos
description
perks
extraInfo
checkIn
checkOut
maxGuests
price
owner (user reference)


Listings are linked to users via:

owner: ObjectId → ref "User"


---

# Database Models

### User


---

# Database Models

### User

email
passwordHash
fullName


### Place

owner (ObjectId → User)
title
address
photos []
description
perks []
extraInfo
checkIn
checkOut
maxGuests
price


---

# Core Flows

Auth  
- email/password login  
- bcrypt hashing  
- JWT cookie session

Listings  
- hosts create listings  
- listings tied to owner id

User dashboard  
- fetch listings created by logged in user

---

# API Structure

Auth
POST /auth/register
POST /auth/login
GET /auth/profile
POST /auth/logout

Places
POST /places
GET /user-places
GET /places/:id


---

# Planned Features

Search
- location
- guests
- price filters
- date availability

Bookings
- create reservation
- cancel reservation
- availability checks

Reviews
- guests can review completed stays

Host dashboard
- manage listings
- manage bookings

User profile
- trips
- wishlists

---

# Production Concerns

Input validation  
Error handling  
Rate limiting  
CORS + cookies configuration  
Secure headers  
Environment variables  
Logging

Image uploads (Cloudinary)  
Deployment (Render / Vercel / MongoDB Atlas)

---

# Project Goal

This project is designed to practice building a **production-style REST API** using the MERN stack with proper authentication, relational data modeling, and scalable backend architecture.