# PostgreSQL Database Setup

This portfolio uses **Neon PostgreSQL** for data persistence, demonstrating SQL database design and management skills.

## Database Schema

### Tables

1. **projects** - Portfolio projects with technologies, links, and metadata
2. **skills** - Technical skills with proficiency levels and experience
3. **experience** - Work experience and leadership positions
4. **contact_messages** - Contact form submissions with tracking
5. **analytics** - Page views and user interaction tracking

### Features

- **Indexes** for optimized query performance
- **Triggers** for automatic timestamp updates
- **Foreign key constraints** for data integrity
- **JSONB fields** for flexible metadata storage
- **Array types** for technologies and achievements

## Running Migrations

The SQL migration scripts are located in the `scripts/` folder:

1. `001_create_tables.sql` - Creates all database tables and indexes
2. `002_seed_data.sql` - Seeds initial data from resume

To run migrations, execute the scripts in order through the v0 interface or directly in your Neon dashboard.

## API Endpoints

### Projects
- `GET /api/sql/projects` - Fetch all projects
- `GET /api/sql/projects?category=Robotics` - Filter by category
- `GET /api/sql/projects?featured=true` - Get featured projects only
- `GET /api/sql/projects/[id]` - Get single project
- `POST /api/sql/projects` - Create new project
- `PUT /api/sql/projects/[id]` - Update project
- `DELETE /api/sql/projects/[id]` - Delete project

### Skills
- `GET /api/sql/skills` - Fetch all skills
- `GET /api/sql/skills?category=Software` - Filter by category

### Experience
- `GET /api/sql/experience` - Fetch all experience
- `GET /api/sql/experience?current=true` - Get current positions only

### Contact
- `POST /api/sql/contact` - Submit contact form
- `GET /api/sql/contact` - Fetch all messages (admin)
- `GET /api/sql/contact?unread=true` - Get unread messages only

## Database Client

The `lib/db.ts` file provides:
- Type-safe database models (TypeScript interfaces)
- Query helper functions with error handling
- CRUD operations for all tables
- Neon serverless driver integration

## Environment Variables

Required environment variables (automatically provided by Neon integration):
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_URL` - Alternative connection string
- `POSTGRES_PRISMA_URL` - Prisma-compatible URL

## Example Queries

\`\`\`typescript
// Fetch all featured projects
const projects = await projectQueries.getFeatured()

// Get skills by category
const softwareSkills = await skillQueries.getByCategory('Software')

// Save contact message
const message = await contactQueries.create({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Great portfolio!',
  ip_address: '192.168.1.1',
  user_agent: 'Mozilla/5.0...'
})

// Track analytics event
await analyticsQueries.track({
  event_type: 'page_view',
  page_path: '/projects',
  session_id: 'abc123'
})
\`\`\`

## Performance Optimizations

- Indexed columns for fast lookups
- Connection pooling via Neon serverless driver
- Prepared statements to prevent SQL injection
- Efficient query patterns (avoid N+1 queries)
