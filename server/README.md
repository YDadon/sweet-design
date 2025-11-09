# Server (Express + MongoDB)

This folder contains the Node.js/Express server for the project. It provides a small REST API for products and connects to MongoDB using Mongoose.

## What this does
- Starts an Express server (see `server.js`).
- Connects to MongoDB using the connection string in environment variables.
- Exposes product-related endpoints under `/api/products` implemented in `routes/producrRoutes.js`.

## Prerequisites
- Node.js 16+ (or a recent LTS)
- A running MongoDB instance (local or cloud like MongoDB Atlas)

## Install
From the `server` folder:

```powershell
cd server
npm install
```

## Environment
Create a `.env` file in the `server` folder (or provide equivalent environment variables in your host).

Example `.env`:

```
PORT=3000
DB_URI=mongodb://localhost:27017/my-database
```

- `PORT` (optional) — port the server listens on (defaults to 3000).
- `DB_URI` — MongoDB connection string used by Mongoose.

## Run
- Start normally:

```powershell
node server.js
```

- Or use `nodemon` for development (already present as a dependency):

```powershell
npx nodemon server.js
```

When the DB connection succeeds the server will log the listening URL, e.g. `Server is running on http://localhost:3000`.

## Available endpoints
- `GET /` — health check / root message (returns a small text response).
- `GET /api/products` — returns all products (from the `Product` model).
- `POST /api/products` — creates a new product. Expect JSON body with fields such as:

```json
{
  "name": "Example product",
  "description": "A short description",
  "category": "candles",
  "subCategories": ["scented"],
  "imageUrl": "https://example.com/img.png",
  "price": 15.5
}
```

Note: The routes file references a `Product` Mongoose model at `server/models/Product`. Ensure that file exists and exports the model.

## Dependencies
Key dependencies (from `package.json`):
- `express` — http server
- `mongoose` — MongoDB ODM
- `cors` — CORS middleware
- `dotenv` — environment variables loader
- `nodemon` — development auto-restart (as a dependency)

## Project structure (server)
- `server.js` — server entry point and DB connection
- `routes/producrRoutes.js` — product routes (GET all, POST create)
- `models/` — place for Mongoose models (e.g. `Product`)

## Troubleshooting
- MongoDB connection errors: verify `DB_URI` and that MongoDB is reachable.
- If `require('../models/Product')` fails, ensure the `models` folder exists and the file exports a Mongoose model.
- If port already in use, change `PORT` in `.env` or the process listening on that port.

## Next improvements (suggestions)
- Add route handlers for GET by id, PUT (update) and DELETE for products.
- Add validation and sanitization for incoming request bodies (e.g. `express-validator`).
- Add minimal integration tests for the API endpoints.
- Add `start` and `dev` scripts to `package.json` for convenience.

## License & Contribution
Add license information and contribution guidelines in the project root if needed.

---

If you'd like, I can also:
- Add/verify a `server/models/Product.js` model file if it's missing.
- Add `start` and `dev` scripts to `server/package.json`.
- Create example requests (curl / HTTPie / Postman collection).
