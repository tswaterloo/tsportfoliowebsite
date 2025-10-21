# Tanush Shah - Portfolio Website

A full-stack portfolio website showcasing projects, skills, and experience with modern web technologies.

## 🚀 Tech Stack

### Frontend
- **React 18** - Component-based UI library
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js / React Three Fiber** - 3D graphics and robot visualization
- **shadcn/ui** - High-quality React components

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **PostgreSQL (Neon)** - Relational database
- **MongoDB** - NoSQL database for analytics
- **Server Actions** - Server-side form handling
- **WebSocket Client** - Real-time telemetry data

### DevOps & Tools
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Deployment platform
- **Git** - Version control

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── sql/          # PostgreSQL endpoints
│   │   ├── contact/      # Contact form handler
│   │   └── github/       # GitHub integration
│   ├── robot-3d/         # 3D robot viewer page
│   ├── telemetry/        # Robot telemetry dashboard
│   └── page.tsx          # Main landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero.tsx          # Hero section
│   ├── projects.tsx      # Projects showcase
│   ├── skills.tsx        # Technical skills
│   └── ...
├── lib/                   # Utility functions
│   ├── db.ts             # PostgreSQL queries
│   ├── mongodb.ts        # MongoDB connection
│   └── api-client.ts     # API utilities
├── scripts/              # Database migrations
│   ├── 001_create_tables.sql
│   └── 002_seed_data.sql
├── docs/                 # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SETUP.md
│   └── DEPLOYMENT.md
├── .github/
│   └── workflows/
│       └── ci.yml        # CI/CD pipeline
├── Dockerfile            # Docker configuration
└── docker-compose.yml    # Docker Compose setup
\`\`\`

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon)
- MongoDB (optional)

### Environment Variables

Create a `.env.local` file:

\`\`\`env
# PostgreSQL (Neon)
DATABASE_URL=your_neon_connection_string
POSTGRES_URL=your_postgres_url

# MongoDB (optional)
MONGODB_URI=your_mongodb_uri

# GitHub (optional)
GITHUB_TOKEN=your_github_token
\`\`\`

### Local Development

\`\`\`bash
# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
\`\`\`

Visit `http://localhost:3000`

### Docker Deployment

\`\`\`bash
# Build and run with Docker Compose
docker-compose up --build

# Or build Docker image manually
docker build -t portfolio .
docker run -p 3000:3000 portfolio
\`\`\`

## 🗄️ Database Setup

The project uses PostgreSQL for structured data and MongoDB for analytics.

### Run Migrations

1. Ensure your Neon database is connected
2. Run the SQL scripts in order:
   - `scripts/001_create_tables.sql` - Creates tables
   - `scripts/002_seed_data.sql` - Seeds initial data

### Database Schema

- **projects** - Portfolio projects with technologies and links
- **skills** - Technical skills with proficiency levels
- **experience** - Work experience and achievements
- **contact_messages** - Contact form submissions
- **analytics** - Page views and user events

## 🚀 CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push:

1. **Lint** - ESLint code quality checks
2. **Type Check** - TypeScript compilation
3. **Build** - Next.js production build
4. **Deploy** - Automatic deployment to Vercel

## 📡 API Endpoints

### Projects
- `GET /api/sql/projects` - Get all projects
- `GET /api/sql/projects?featured=true` - Get featured projects
- `GET /api/sql/projects/[id]` - Get single project
- `POST /api/sql/projects` - Create project
- `PUT /api/sql/projects/[id]` - Update project
- `DELETE /api/sql/projects/[id]` - Delete project

### Skills
- `GET /api/sql/skills` - Get all skills
- `GET /api/sql/skills?category=Software` - Get skills by category

### Experience
- `GET /api/sql/experience` - Get all experience

### Contact
- `POST /api/sql/contact` - Submit contact form

See `docs/API_DOCUMENTATION.md` for full API reference.

## 🎨 Features

- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Cyberpunk-inspired color scheme
- **3D Robot Viewer** - Interactive Three.js visualization
- **Real-time Telemetry** - WebSocket-based robot data
- **PostgreSQL Integration** - Type-safe SQL queries
- **REST API** - Full CRUD operations
- **Contact Form** - Server-side validation
- **GitHub Integration** - Fetch repository stats
- **Analytics Tracking** - Page views and events
- **CI/CD Pipeline** - Automated testing and deployment
- **Docker Support** - Containerized deployment

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio!

## 👤 Author

**Tanush Shah**
- Email: t67shah@uwaterloo.ca
- LinkedIn: [linkedin.com/in/tanush-shah17](https://linkedin.com/in/tanush-shah17)
- University of Waterloo - Electrical Engineering

---

Built with ❤️ using Next.js, React, and TypeScript
