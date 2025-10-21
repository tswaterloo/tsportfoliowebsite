# Deployment Guide

## PostgreSQL Integration

Your portfolio now fetches data from PostgreSQL (Neon) in real-time:

- **Projects**: Loaded from `projects` table via `/api/sql/projects`
- **Contact Form**: Submissions stored in `contact_messages` table via `/api/sql/contact`
- **Skills & Experience**: Available via `/api/sql/skills` and `/api/sql/experience`

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:

1. **Lint & Type Check** - Validates code quality
2. **Build** - Compiles Next.js application
3. **Test** - Runs test suite (if available)
4. **Deploy** - Pushes to Vercel on main branch

## Docker Deployment

### Local Development with Docker

\`\`\`bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:3000
\`\`\`

### Production Docker Build

\`\`\`bash
# Build production image
docker build -t portfolio:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your_postgres_url" \
  -e MONGODB_URI="your_mongo_uri" \
  portfolio:latest
\`\`\`

## Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `MONGODB_URI` - MongoDB connection string
- `GITHUB_TOKEN` - GitHub API token (optional)

## Technologies Showcased

### Frontend
- React 18 with Hooks
- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Three.js/React Three Fiber

### Backend
- Next.js API Routes (REST API)
- PostgreSQL with Neon
- MongoDB
- SQL queries with type safety
- Server-side rendering

### DevOps
- Docker containerization
- GitHub Actions CI/CD
- Automated testing pipeline
- Multi-stage builds
