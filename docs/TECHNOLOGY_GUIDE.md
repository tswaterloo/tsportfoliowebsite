# Technology Guide - Where Everything Is Used

This document explains where each technology is implemented in the portfolio and what it does.

---

## Frontend Technologies

### React
**What it does:** JavaScript library for building user interfaces with reusable components
**Where it's used:**
- `components/*.tsx` - All UI components (Hero, Projects, Skills, Contact, etc.)
- `app/page.tsx` - Main page composition
- Uses React hooks: `useState`, `useEffect`, `useRef`, `useCallback`

**Example files:**
- `components/projects.tsx` - Fetches and displays projects with React state
- `components/hero.tsx` - Animated hero section with typewriter effect
- `components/contact.tsx` - Contact form with React state management

### Next.js 15
**What it does:** React framework with server-side rendering, routing, and API routes
**Where it's used:**
- `app/` directory - App Router for file-based routing
- `app/api/` - Backend API endpoints
- `app/layout.tsx` - Root layout with metadata
- Server Components and Client Components

**Example files:**
- `app/page.tsx` - Main page (Server Component)
- `app/robot-3d/page.tsx` - 3D robot viewer page
- `app/api/sql/projects/route.ts` - API endpoint for projects

### TypeScript
**What it does:** Adds static typing to JavaScript for better code quality
**Where it's used:**
- Every `.ts` and `.tsx` file in the project
- Type definitions for API responses, database schemas, component props

**Example files:**
- `lib/db.ts` - Database types and interfaces
- `components/projects.tsx` - Component props and state types

### Tailwind CSS v4
**What it does:** Utility-first CSS framework for styling
**Where it's used:**
- `app/globals.css` - Global styles and design tokens
- All component files - Inline utility classes like `bg-black`, `text-cyan-400`, `flex`, `gap-4`

**Example:**
\`\`\`tsx
<div className="bg-black text-cyan-400 p-6 rounded-lg hover:shadow-xl">
\`\`\`

### Framer Motion
**What it does:** Animation library for React
**Where it's used:**
- `components/hero.tsx` - Fade-in animations
- `components/projects.tsx` - Stagger animations for project cards
- `components/skills.tsx` - Scroll-triggered animations

**Example:**
\`\`\`tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
\`\`\`

---

## Backend Technologies

### Node.js
**What it does:** JavaScript runtime that executes server-side code
**Where it's used:**
- Powers all Next.js API routes
- Runs the development server
- Executes server-side logic

**How to see it:** Node.js is the runtime environment - it's running whenever you start the dev server with `npm run dev`

### Next.js API Routes (Express-style)
**What it does:** Backend API endpoints that handle HTTP requests
**Where it's used:**
- `app/api/sql/projects/route.ts` - GET/POST projects from PostgreSQL
- `app/api/sql/contact/route.ts` - POST contact form submissions
- `app/api/sql/skills/route.ts` - GET skills from database
- `app/api/sql/experience/route.ts` - GET experience from database
- `app/api/analytics/route.ts` - POST analytics events to MongoDB
- `app/api/github/route.ts` - GET GitHub repository data

**How to see it in action:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. You'll see API calls to `/api/sql/projects`, `/api/sql/skills`, etc.

**Example API endpoint:**
\`\`\`typescript
// app/api/sql/projects/route.ts
export async function GET() {
  const sql = neon(process.env.DATABASE_URL!)
  const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`
  return NextResponse.json({ success: true, data: projects })
}
\`\`\`

### REST API
**What it does:** Architectural style for building APIs with standard HTTP methods
**Where it's used:**
- GET `/api/sql/projects` - Fetch all projects
- GET `/api/sql/projects/[id]` - Fetch single project
- POST `/api/sql/contact` - Submit contact form
- GET `/api/sql/skills` - Fetch skills
- GET `/api/sql/experience` - Fetch experience

**How to test it:**
Open your browser console and run:
\`\`\`javascript
fetch('/api/sql/projects').then(r => r.json()).then(console.log)
\`\`\`

### Server Actions
**What it does:** Server-side functions that can be called from client components
**Where it's used:**
- `app/actions/contact.ts` - Contact form submission handler

**Example:**
\`\`\`typescript
'use server'
export async function submitContact(formData: FormData) {
  // Server-side logic here
}
\`\`\`

### WebSockets
**What it does:** Real-time bidirectional communication between client and server
**Where it's used:**
- `lib/websocket-client.ts` - WebSocket client implementation
- `components/robot-telemetry.tsx` - Real-time telemetry dashboard
- `app/telemetry/page.tsx` - Telemetry page

**How to see it:** Visit `/telemetry` page - you'll see live updating sensor data

---

## Database Technologies

### PostgreSQL (with Neon)
**What it does:** Relational SQL database for structured data
**Where it's used:**
- `lib/db.ts` - Database connection and query functions
- `scripts/001_create_tables.sql` - Database schema creation
- `scripts/002_seed_data.sql` - Initial data seeding
- `app/api/sql/*` - All SQL API endpoints

**Database Schema:**
- `projects` table - Your portfolio projects
- `skills` table - Technical skills
- `experience` table - Work experience
- `contact_submissions` table - Contact form submissions
- `analytics` table - Page view tracking

**How to see it in action:**
1. The Projects section on homepage fetches from PostgreSQL
2. Contact form submissions are stored in PostgreSQL
3. Check browser DevTools → Network → `/api/sql/projects` to see the SQL data

**Example SQL query:**
\`\`\`sql
SELECT * FROM projects 
WHERE featured = true 
ORDER BY created_at DESC 
LIMIT 6
\`\`\`

### MongoDB
**What it does:** NoSQL document database for flexible data
**Where it's used:**
- `lib/mongodb.ts` - MongoDB connection
- `app/api/analytics/route.ts` - Analytics tracking
- Alternative storage for contact forms

**How to see it:** MongoDB is used for analytics in the background when you navigate pages

---

## DevOps & Infrastructure

### CI/CD (GitHub Actions)
**What it does:** Automated testing, building, and deployment pipeline
**Where it's used:**
- `.github/workflows/ci.yml` - CI/CD pipeline configuration

**What it does:**
1. Runs on every push to GitHub
2. Installs dependencies
3. Runs linting (`npm run lint`)
4. Runs type checking (`npm run type-check`)
5. Builds the project (`npm run build`)
6. Deploys to Vercel (on main branch)

**How to see it:**
1. Push code to GitHub
2. Go to your GitHub repository
3. Click "Actions" tab
4. You'll see the workflow running with green checkmarks

**Pipeline stages:**
\`\`\`yaml
- Checkout code
- Setup Node.js 20
- Install dependencies
- Lint code
- Type check
- Build project
- Deploy to Vercel
\`\`\`

### Docker
**What it does:** Containerizes the application for consistent deployment
**Where it's used:**
- `Dockerfile` - Container image definition
- `docker-compose.yml` - Multi-container orchestration
- `.dockerignore` - Files to exclude from container

**How to use it:**
\`\`\`bash
# Build the Docker image
docker build -t portfolio .

# Run the container
docker run -p 3000:3000 portfolio

# Or use Docker Compose
docker-compose up
\`\`\`

**What the Dockerfile does:**
1. Uses Node.js 20 Alpine (lightweight)
2. Installs dependencies
3. Builds the Next.js app
4. Creates optimized production image
5. Exposes port 3000

---

## 3D & Graphics

### Three.js & React Three Fiber
**What it does:** 3D graphics library for WebGL rendering
**Where it's used:**
- `components/robot-viewer-3d.tsx` - Interactive 3D robot model
- `app/robot-3d/page.tsx` - 3D viewer page
- `components/robot-showcase.tsx` - Robot showcase section

**How to see it:** Visit `/robot-3d` page to see the interactive 3D robot

**Features:**
- Orbit controls (click and drag to rotate)
- Lighting and shadows
- Real-time rendering
- Interactive animations

---

## Real-time & Data Visualization

### WebSockets
**What it does:** Real-time bidirectional communication
**Where it's used:**
- `lib/websocket-client.ts` - WebSocket client
- `components/robot-telemetry.tsx` - Live telemetry dashboard
- `app/telemetry/page.tsx` - Telemetry page

**How to see it:** Visit `/telemetry` - data updates in real-time

### Recharts
**What it does:** React charting library for data visualization
**Where it's used:**
- `components/robot-telemetry.tsx` - Line charts for sensor data
- `components/analytics-dashboard.tsx` - Analytics charts

---

## File Structure Summary

\`\`\`
portfolio-website/
├── .github/workflows/
│   └── ci.yml                    # CI/CD pipeline (GitHub Actions)
├── app/
│   ├── api/                      # Backend API endpoints
│   │   ├── sql/                  # PostgreSQL endpoints
│   │   │   ├── projects/         # Projects CRUD
│   │   │   ├── skills/           # Skills API
│   │   │   ├── experience/       # Experience API
│   │   │   └── contact/          # Contact form
│   │   ├── analytics/            # MongoDB analytics
│   │   └── github/               # GitHub API integration
│   ├── actions/                  # Server Actions
│   ├── page.tsx                  # Main page (React)
│   ├── layout.tsx                # Root layout (Next.js)
│   ├── robot-3d/                 # 3D viewer page (Three.js)
│   └── telemetry/                # WebSocket telemetry (Real-time)
├── components/                   # React components
│   ├── projects.tsx              # Fetches from PostgreSQL
│   ├── contact.tsx               # Posts to PostgreSQL
│   ├── robot-viewer-3d.tsx       # Three.js 3D viewer
│   ├── robot-telemetry.tsx       # WebSocket real-time data
│   └── tech-stack.tsx            # This section!
├── lib/
│   ├── db.ts                     # PostgreSQL connection (Neon)
│   ├── mongodb.ts                # MongoDB connection
│   └── websocket-client.ts       # WebSocket client
├── scripts/
│   ├── 001_create_tables.sql     # PostgreSQL schema (SQL)
│   └── 002_seed_data.sql         # Seed data (SQL)
├── Dockerfile                    # Docker container config
├── docker-compose.yml            # Docker Compose orchestration
└── package.json                  # Node.js dependencies

\`\`\`

---

## Quick Reference: What Does What

| Technology | What It Does | Where to See It |
|------------|--------------|-----------------|
| **React** | UI components | All pages and components |
| **Next.js** | Framework & routing | Entire app structure |
| **TypeScript** | Type safety | Every `.ts`/`.tsx` file |
| **Node.js** | Server runtime | Runs the backend |
| **REST API** | Backend endpoints | DevTools → Network tab |
| **PostgreSQL** | SQL database | Projects section, contact form |
| **MongoDB** | NoSQL database | Analytics (background) |
| **CI/CD** | Automated deployment | GitHub → Actions tab |
| **Docker** | Containerization | `docker-compose up` |
| **Three.js** | 3D graphics | `/robot-3d` page |
| **WebSockets** | Real-time data | `/telemetry` page |
| **Tailwind CSS** | Styling | All component classes |
| **Framer Motion** | Animations | Scroll animations, transitions |

---

## How to Explain This in an Interview

**"This portfolio demonstrates full-stack development with:"**

1. **Frontend:** React with TypeScript and Next.js 15, styled with Tailwind CSS v4 and animated with Framer Motion

2. **Backend:** RESTful API endpoints using Next.js API routes (Express-style), handling CRUD operations

3. **Databases:** 
   - PostgreSQL (Neon) for relational data - projects, skills, experience
   - MongoDB for analytics and flexible data storage

4. **DevOps:** 
   - GitHub Actions CI/CD pipeline for automated testing and deployment
   - Docker containerization for consistent deployment environments

5. **Advanced Features:**
   - Three.js for 3D robot visualization
   - WebSockets for real-time telemetry data
   - Server Actions for form handling

**"Everything listed is actually implemented and functional, not just claimed."**
