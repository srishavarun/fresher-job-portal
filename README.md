# Fresher Job Portal — MCA MERN Mini Project

## Features
- Student/recruiter registration and login (JWT, bcrypt password hashing)
- Recruiter job posting, editing and deletion
- Public job search by title, company, or location
- Students apply once per job, with optional cover letter
- Students view application status; recruiters view applicants and update status
- MongoDB storage with Mongoose

## Requirements
- Node.js 20.19+ or 22.12+ (for Vite 6, Node 18+ is sufficient, but a current LTS is recommended)
- MongoDB Community Server running locally **or** MongoDB Atlas connection string
- VS Code

## Setup
1. Open this extracted folder in VS Code.
2. In terminal 1:
   ```
   cd backend
   npm install
   ```
3. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and a long random `JWT_SECRET`. Do not commit `.env`.
4. Start MongoDB locally if using the example localhost URI.
5. Start API:
   ```
   npm run dev
   ```
   Visit http://localhost:5001/api/health — should show `{ "ok": true }`.
6. In terminal 2 (from project root):
   ```
   cd frontend
   npm install
   npm run dev
   ```
7. Open http://localhost:5173

## Test workflow
1. Register as a recruiter and post a job.
2. Log out, register as a student, find the job and apply.
3. Log out and log in as recruiter, review application and change its status.
4. Log in as student to see the status.

## API
- POST `/api/auth/register`, POST `/api/auth/login`, GET `/api/auth/me`
- GET `/api/jobs?q=...`, GET `/api/jobs/mine` (recruiter)
- POST `/api/jobs`, PUT `/api/jobs/:id`, DELETE `/api/jobs/:id` (recruiter)
- POST `/api/applications/:jobId` (student)
- GET `/api/applications/mine` (student)
- GET `/api/applications/recruiter` (recruiter)
- PATCH `/api/applications/:id/status` (recruiter)

## Academic demo note
This is a teaching project, not production-ready. For public deployment add stronger validation, rate limits, secure token storage (HttpOnly cookies), password recovery, moderation, and deployment-specific CORS settings. Job posts are user-entered demonstration data, not verified real vacancies.

## Populate demo data (Mac, Windows, or Linux)
The ZIP contains a **seed script**, not a pre-running MongoDB server. Start MongoDB or configure Atlas before seeding.

1. In `backend`, copy `.env.example` to `.env` (`cp .env.example .env` on Mac; `copy .env.example .env` on Windows CMD). Set `MONGO_URI` and a long random `JWT_SECRET`.
2. From `backend` run `npm install` then `npm run seed`.
3. Start backend with `npm run dev`; from a second terminal in `frontend` run `npm install` then `npm run dev`.
4. Visit http://localhost:5173. Sample jobs and applications should be visible after logging in.

### Sample logins (LOCAL DEMO ONLY)
| Role | Email | Password |
|---|---|---|
| Student | student@demo.com | Student@123 |
| Student | ananya@demo.com | Student@123 |
| Student | rahul@demo.com | Student@123 |
| Recruiter | recruiter@demo.com | Recruiter@123 |
| Recruiter | kiran@demo.com | Recruiter@123 |

Demo seed inserts 8 fictional jobs and 8 applications. It does not delete existing data; rerunning skips existing users/jobs/applications. If a demo email already exists with a different password, the script preserves the existing account and does **not** reset its password. Never use these passwords on a public deployment.
