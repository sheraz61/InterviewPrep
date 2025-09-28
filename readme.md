# InterviewPrep

InterviewPrep is a full-stack web application for conducting and managing mock interviews. It features user authentication, interview sessions, dashboards, and email notifications.

## Project Structure

```
Backend/
  ├── app.js
  ├── index.js
  ├── package.json
  ├── .env
  ├── config/
  ├── controllers/
  ├── middelwares/
  ├── models/
  ├── routes/
  ├── utils/
Frontend/
  ├── index.html
  ├── package.json
  ├── public/
  ├── src/
```

## Backend

- **Tech Stack:** Node.js, Express, MongoDB
- **Main Entry:** [`app.js`](Backend/app.js)
- **Features:**
  - User authentication ([`auth.js`](Backend/middelwares/auth.js))
  - Interview management ([`Interview.model.js`](Backend/models/Interview.model.js))
  - Dashboard ([`dashboard.controller.js`](Backend/controllers/dashboard.controller.js))
  - Email notifications ([`sendEmail.js`](Backend/utils/sendEmail.js))
  - API routes for users, interviews, dashboard

### Running Backend

1. Install dependencies:
    ```sh
    cd Backend
    npm install
    ```
2. Set up environment variables in `.env`.
3. Start server:
    ```sh
    npm start
    ```

## Frontend

- **Tech Stack:** React, Vite, Tailwind CSS
- **Main Entry:** [`src/App.jsx`](Frontend/src/App.jsx)
- **Features:**
  - Routing with protected routes
  - Pages for login, registration, dashboard, interview sessions, results, profile
  - Responsive UI

### Running Frontend

1. Install dependencies:
    ```sh
    cd Frontend
    npm install
    ```
2. Start development server:
    ```sh
    npm run dev
    ```

## Environment Variables

- Backend uses `.env` for sensitive configuration (see [Backend/.env](Backend/.env)).
- Frontend may use Vite environment variables.

## Scripts

- **Backend:** See [`package.json`](Backend/package.json) for available scripts.
- **Frontend:** See [`package.json`](Frontend/package.json) for available scripts.

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Open a pull request.

## License

MIT

---

**For more details, see individual files:**
- Backend: [Backend/app.js](Backend/app.js), [Backend/routes/](Backend/routes/)
- Frontend: [Frontend/src/App.jsx](Frontend/src/App.jsx)