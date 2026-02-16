# CRUD Operation Backend

Express.js backend providing authentication (including Google sign-in) and protected employee CRUD APIs using MongoDB and JWTs.

**Quick Overview:**
- **Tech:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens, express-validator
- **Location:** project source lives under `src/` (server, routes, controllers, models, middleware)

**Features**
- Local sign-up / login with hashed passwords
- Google ID token authentication endpoint
- Protected Employee CRUD endpoints (create, read, update, delete)
- Request validation using `express-validator`

## Requirements
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

## Installation
1. Clone the repo and change directory to the backend folder.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and set the required environment variables (see below).

## Environment Variables
Create a `.env` file with at least the following keys:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret used to sign JWT access tokens
- `PORT` — (optional) port to run the server (default usually 3000)

If you use Google auth flow, ensure your client obtains an ID token to pass to the `/google` endpoint.

## Available Scripts
- `npm run start:dev` — start server with `nodemon` (development)
- `npm start` — start server with `node` (production)

Check `package.json` for the exact scripts.

## Project Structure (key files)
- `src/server.js` — app entrypoint and server bootstrap
- `src/routes/authRoutes.js` — auth endpoints (`/login`, `/signup`, `/google`, `/password`)
- `src/routes/employee.routes.js` — employee endpoints (`/create`, `/getEmployee`, `/getEmployeeById/:id`, `/getEmployeeByName/:name`, `/update/:id`, `/delete/:id`)
- `src/controllers/` — controllers for auth and employee logic
- `src/models/` — Mongoose models: `user.js`, `employee.models.js`
- `src/middleware/` — `authMiddleWare.js` (JWT protection), `validate.js` (request validation)
- `src/utils/` — validation schemas for auth and employee requests

## API Endpoints (summary)

Auth
- `POST /login` — body: `{ email, password }` — returns JWT on success
- `POST /signup` — body: `{ email, password, confirmPassword }` — registers a new user
- `POST /google` — body: `{ idToken }` — Google ID token sign-in
- `POST /password` — protected, body: `{ newPassword }` — change password

Employees (all protected by `authMiddleWare`)
- `POST /create` — create employee. Body fields validated: `userName`, `age`, `position`, `company`, `salary`
- `GET /getEmployee` — list all employees
- `GET /getEmployeeById/:id` — get employee by MongoDB `_id`
- `GET /getEmployeeByName/:name` — search by `userName`
- `PUT /update/:id` — update employee by id
- `DELETE /delete/:id` — delete employee by id

Request validation rules live in `src/utils/auth.validation.js` and `src/utils/employee.validation.js`.

## Data Models
- `User` (`src/models/user.js`): `email` (unique), `password` (hashed), `googleId`
- `Employee` (`src/models/employee.models.js`): `userName`, `age`, `position`, `company`, `salary`

## Notes & Tips
- The project uses `express-validator` to validate incoming requests — validation errors are returned by the `validate` middleware.
- Protect routes by including the `Authorization: Bearer <token>` header for endpoints guarded by `authMiddleWare`.

## Run locally
1. Ensure MongoDB is reachable and `.env` is configured.
2. Install deps: `npm install`
3. Start dev server:

```bash
npm run start:dev
```

Or run production server:

```bash
npm start
```

## Contributing
- Open issues or PRs for bug fixes and improvements. Add tests where appropriate.

## License
This project currently does not include an explicit license. Add one as needed.

---
If you'd like, I can add example `.env` template, Postman collection, or example curl requests next.

