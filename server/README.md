
# Server (Express + MongoDB)

This folder contains the Node.js/Express server for the project. It provides a REST API for products, categories, and subcategories, and connects to MongoDB using Mongoose.

## Features
- Express server with CORS and JSON body parsing
- MongoDB connection via Mongoose
- Product, Category, and Subcategory models
- Endpoints for managing products, categories, and subcategories

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

## API Endpoints

### Health Check
- `GET /` — root message (returns a small text response)

### Products
- `GET /api/products` — returns all products (populates category and subCategories)
- `POST /api/products` — creates a new product
  - JSON body example:
    ```json
    {
      "name": "Example product",
      "description": "A short description",
      "category": "<category ObjectId>",
      "subCategories": "<subcategory ObjectId>",
      "imageUrl": ["https://example.com/img.png"],
      "price": 15.5
    }
    ```

### Categories
- `GET /api/categories` — returns all categories
- `POST /api/categories` — creates a new category
  - JSON body example:
    ```json
    {
      "name": "Candles",
      "description": "All candle products"
    }
    ```

### Subcategories
- `GET /api/subcategories` — returns all subcategories
- `POST /api/subcategories` — creates a new subcategory
  - JSON body example:
    ```json
    {
      "name": "Scented",
      "parentCategory": "<category ObjectId>",
      "description": "Scented candles"
    }
    ```
- `GET /api/subcategories/:parentCategoryName` — returns subcategories for a given parent category name

## Models

### Category
- `name` (String, required, unique)
- `description` (String, optional)

### Subcategory
- `name` (String, required, unique)
- `parentCategory` (ObjectId, ref: Category, required)
- `description` (String, optional)

### Product
- `name` (String, required)
- `description` (String, required)
- `category` (ObjectId, ref: Category, required)
- `subCategories` (ObjectId, ref: Subcategory, optional)
- `imageUrl` (Array of String, required)
- `price` (Number, required)
- `customFields` (Mixed, optional)

## Dependencies
Key dependencies (from `package.json`):
- `express` — http server
- `mongoose` — MongoDB ODM
- `cors` — CORS middleware
- `dotenv` — environment variables loader
- `nodemon` — development auto-restart (as a dependency)

## Project structure (server)
- `server.js` — server entry point and DB connection
- `routes/producrRoutes.js` — product routes
- `routes/categoryRoutes.js` — category routes
- `routes/subCategoryRoutes.js` — subcategory routes
- `models/` — Mongoose models (`Product`, `Category`, `Subcategory`)

## Troubleshooting
- MongoDB connection errors: verify `DB_URI` and that MongoDB is reachable.
- If `require('../models/Product')` fails, ensure the `models` folder exists and the file exports a Mongoose model.
- If port already in use, change `PORT` in `.env` or the process listening on that port.
- For ObjectId references, ensure you use valid MongoDB ObjectIds for category and subcategory fields.

## Next improvements (suggestions)
- Add route handlers for GET by id, PUT (update) and DELETE for products, categories, and subcategories.
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
