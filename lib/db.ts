import { neon } from "@neondatabase/serverless"

// Create SQL client using Neon serverless driver
export const sql = neon(process.env.DATABASE_URL!)

// Database query helpers with proper error handling

// Type-safe database models
export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  category: string
  featured: boolean
  created_at: Date
  updated_at: Date
}

export interface Skill {
  id: number
  name: string
  category: string
  proficiency_level: number
  years_experience: number
  created_at: Date
}

export interface Experience {
  id: number
  title: string
  company: string
  location?: string
  start_date: Date
  end_date?: Date
  is_current: boolean
  description?: string
  achievements: string[]
  technologies: string[]
  created_at: Date
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject?: string
  message: string
  status: string
  ip_address?: string
  user_agent?: string
  created_at: Date
  read_at?: Date
}

export interface AnalyticsEvent {
  id: number
  event_type: string
  page_path?: string
  user_id?: string
  session_id?: string
  metadata?: Record<string, any>
  created_at: Date
}

// CRUD operations for projects
export const projectQueries = {
  getAll: async (): Promise<Project[]> => {
    return await sql`SELECT * FROM projects ORDER BY featured DESC, created_at DESC`
  },

  getById: async (id: number): Promise<Project | null> => {
    const results = await sql`SELECT * FROM projects WHERE id = ${id}`
    return results[0] || null
  },

  getFeatured: async (): Promise<Project[]> => {
    return await sql`SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC`
  },

  getByCategory: async (category: string): Promise<Project[]> => {
    return await sql`SELECT * FROM projects WHERE category = ${category} ORDER BY created_at DESC`
  },

  create: async (project: Omit<Project, "id" | "created_at" | "updated_at">): Promise<Project> => {
    const results = await sql`
      INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, category, featured)
      VALUES (${project.title}, ${project.description}, ${project.technologies}, ${project.github_url}, 
              ${project.live_url}, ${project.image_url}, ${project.category}, ${project.featured})
      RETURNING *
    `
    return results[0]
  },

  update: async (id: number, updates: Partial<Project>): Promise<Project> => {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ${(updates as any)[key]}`)
      .join(", ")

    const results = await sql`UPDATE projects SET ${sql(fields)} WHERE id = ${id} RETURNING *`
    return results[0]
  },

  delete: async (id: number): Promise<void> => {
    await sql`DELETE FROM projects WHERE id = ${id}`
  },
}

// CRUD operations for skills
export const skillQueries = {
  getAll: async (): Promise<Skill[]> => {
    return await sql`SELECT * FROM skills ORDER BY category, proficiency_level DESC`
  },

  getByCategory: async (category: string): Promise<Skill[]> => {
    return await sql`SELECT * FROM skills WHERE category = ${category} ORDER BY proficiency_level DESC`
  },

  create: async (skill: Omit<Skill, "id" | "created_at">): Promise<Skill> => {
    const results = await sql`
      INSERT INTO skills (name, category, proficiency_level, years_experience)
      VALUES (${skill.name}, ${skill.category}, ${skill.proficiency_level}, ${skill.years_experience})
      RETURNING *
    `
    return results[0]
  },
}

// CRUD operations for experience
export const experienceQueries = {
  getAll: async (): Promise<Experience[]> => {
    return await sql`SELECT * FROM experience ORDER BY start_date DESC`
  },

  getCurrent: async (): Promise<Experience[]> => {
    return await sql`SELECT * FROM experience WHERE is_current = true ORDER BY start_date DESC`
  },
}

// CRUD operations for contact messages
export const contactQueries = {
  create: async (
    message: Omit<ContactMessage, "id" | "created_at" | "read_at" | "status">,
  ): Promise<ContactMessage> => {
    const results = await sql`
      INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent)
      VALUES (${message.name}, ${message.email}, ${message.subject}, ${message.message}, 
              ${message.ip_address}, ${message.user_agent})
      RETURNING *
    `
    return results[0]
  },

  getAll: async (): Promise<ContactMessage[]> => {
    return await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`
  },

  getUnread: async (): Promise<ContactMessage[]> => {
    return await sql`SELECT * FROM contact_messages WHERE status = 'unread' ORDER BY created_at DESC`
  },

  markAsRead: async (id: number): Promise<void> => {
    await sql`UPDATE contact_messages SET status = 'read', read_at = CURRENT_TIMESTAMP WHERE id = ${id}`
  },
}

// Analytics operations
export const analyticsQueries = {
  track: async (event: Omit<AnalyticsEvent, "id" | "created_at">): Promise<void> => {
    await sql`
      INSERT INTO analytics (event_type, page_path, user_id, session_id, metadata)
      VALUES (${event.event_type}, ${event.page_path}, ${event.user_id}, ${event.session_id}, ${JSON.stringify(event.metadata)})
    `
  },

  getEventCounts: async (startDate: Date, endDate: Date): Promise<{ event_type: string; count: number }[]> => {
    return await sql`
      SELECT event_type, COUNT(*) as count
      FROM analytics
      WHERE created_at BETWEEN ${startDate} AND ${endDate}
      GROUP BY event_type
      ORDER BY count DESC
    `
  },

  getPageViews: async (startDate: Date, endDate: Date): Promise<{ page_path: string; count: number }[]> => {
    return await sql`
      SELECT page_path, COUNT(*) as count
      FROM analytics
      WHERE event_type = 'page_view' AND created_at BETWEEN ${startDate} AND ${endDate}
      GROUP BY page_path
      ORDER BY count DESC
    `
  },
}
