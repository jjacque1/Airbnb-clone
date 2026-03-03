## Core flows

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