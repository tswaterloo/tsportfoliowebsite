# Portfolio API Documentation

This document describes the REST API endpoints available in the portfolio application.

## Base URL

\`\`\`
/api
\`\`\`

## Authentication

Currently, all endpoints are public. In production, admin endpoints would require JWT authentication.

## Endpoints

### Projects

#### GET /api/projects

Get all projects with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (robotics, ai, engineering, web)
- `featured` (optional): Filter featured projects (true/false)

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Project Title",
      "description": "Project description",
      "technologies": ["C++", "Python"],
      "category": "robotics",
      "featured": true,
      "stats": {
        "views": 1250,
        "stars": 45,
        "forks": 12
      }
    }
  ],
  "count": 1
}
\`\`\`

#### GET /api/projects/[id]

Get a single project by ID.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Project Title",
    "description": "Short description",
    "fullDescription": "Detailed description...",
    "technologies": ["C++", "Python"],
    "github": "https://github.com/...",
    "demo": "https://...",
    "timeline": [
      { "date": "2023-01", "event": "Started project" }
    ]
  }
}
\`\`\`

#### POST /api/projects

Create a new project (admin only in production).

**Request Body:**
\`\`\`json
{
  "title": "New Project",
  "description": "Description",
  "technologies": ["React", "Node.js"],
  "category": "web",
  "featured": false
}
\`\`\`

#### PUT /api/projects/[id]

Update an existing project.

#### DELETE /api/projects/[id]

Delete a project.

---

### Analytics

#### GET /api/analytics

Get portfolio analytics data.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "totalViews": 15420,
    "totalProjects": 6,
    "viewsByMonth": [...],
    "projectsByCategory": [...],
    "topProjects": [...]
  }
}
\`\`\`

#### POST /api/analytics/track

Track a page view or custom event.

**Request Body:**
\`\`\`json
{
  "event": "page_view",
  "page": "/projects",
  "metadata": {
    "referrer": "google"
  }
}
\`\`\`

---

### GitHub Integration

#### GET /api/github

Fetch public repositories from GitHub.

**Query Parameters:**
- `limit` (optional): Number of repos to fetch (default: 6)

**Response:**
\`\`\`json
{
  "success": true,
  "data": [...],
  "count": 6,
  "source": "github"
}
\`\`\`

#### POST /api/github/sync

Sync GitHub repositories to database.

---

### Contact

#### POST /api/contact

Submit a contact form message.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Message sent successfully"
}
\`\`\`

#### GET /api/contact

Get API status and available endpoints.

---

## Error Handling

All endpoints return errors in the following format:

\`\`\`json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
\`\`\`

## Rate Limiting

In production, implement rate limiting:
- 100 requests per 15 minutes for general endpoints
- 10 requests per hour for contact form
- 1000 requests per hour for authenticated users

## Database Schema

See `lib/mongodb.ts` for complete schema definitions.

## Technologies Used

- **Framework**: Next.js 14 with App Router
- **API**: REST API with TypeScript
- **Database**: MongoDB (simulated, ready for production)
- **Validation**: Zod (recommended for production)
- **Authentication**: JWT (for future admin panel)
