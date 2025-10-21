// MongoDB connection utility
// This demonstrates database integration skills for the portfolio

export interface Project {
  _id?: string
  id: string
  title: string
  description: string
  fullDescription?: string
  technologies: string[]
  github?: string
  demo?: string
  category: string
  featured: boolean
  stats: {
    views: number
    stars: number
    forks: number
  }
  timeline?: Array<{
    date: string
    event: string
  }>
  createdAt?: Date
  updatedAt?: Date
}

export interface ContactSubmission {
  _id?: string
  name: string
  email: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: Date
}

export interface AnalyticsEvent {
  _id?: string
  event: string
  page: string
  metadata?: Record<string, any>
  timestamp: Date
  userAgent?: string
  ip?: string
}

// MongoDB connection configuration
// In production, this would use actual MongoDB connection
export const mongoConfig = {
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio",
  dbName: "portfolio",
  collections: {
    projects: "projects",
    contacts: "contacts",
    analytics: "analytics",
  },
}

// Simulated MongoDB operations for demonstration
// In production, replace with actual MongoDB client
export class MockDB {
  private static projects: Project[] = []
  private static contacts: ContactSubmission[] = []
  private static analytics: AnalyticsEvent[] = []

  static async connect() {
    console.log("[v0] MongoDB connection simulated")
    return true
  }

  static async disconnect() {
    console.log("[v0] MongoDB disconnection simulated")
    return true
  }

  // Project operations
  static async findProjects(filter: Partial<Project> = {}) {
    return this.projects.filter((project) => {
      return Object.entries(filter).every(([key, value]) => {
        return project[key as keyof Project] === value
      })
    })
  }

  static async findProjectById(id: string) {
    return this.projects.find((p) => p.id === id)
  }

  static async createProject(project: Project) {
    const newProject = {
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.projects.push(newProject)
    return newProject
  }

  static async updateProject(id: string, updates: Partial<Project>) {
    const index = this.projects.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.projects[index] = {
      ...this.projects[index],
      ...updates,
      updatedAt: new Date(),
    }
    return this.projects[index]
  }

  static async deleteProject(id: string) {
    const index = this.projects.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.projects.splice(index, 1)
    return true
  }

  // Contact operations
  static async createContact(contact: Omit<ContactSubmission, "_id" | "createdAt" | "status">) {
    const newContact: ContactSubmission = {
      ...contact,
      status: "new",
      createdAt: new Date(),
    }
    this.contacts.push(newContact)
    return newContact
  }

  static async findContacts(filter: Partial<ContactSubmission> = {}) {
    return this.contacts.filter((contact) => {
      return Object.entries(filter).every(([key, value]) => {
        return contact[key as keyof ContactSubmission] === value
      })
    })
  }

  // Analytics operations
  static async trackEvent(event: Omit<AnalyticsEvent, "_id" | "timestamp">) {
    const newEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date(),
    }
    this.analytics.push(newEvent)
    return newEvent
  }

  static async getAnalytics(startDate?: Date, endDate?: Date) {
    let filtered = this.analytics

    if (startDate) {
      filtered = filtered.filter((e) => e.timestamp >= startDate)
    }

    if (endDate) {
      filtered = filtered.filter((e) => e.timestamp <= endDate)
    }

    return filtered
  }
}

// Example MongoDB schema definitions (for documentation)
export const schemas = {
  project: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    fullDescription: { type: "string" },
    technologies: { type: "array", items: "string", required: true },
    github: { type: "string" },
    demo: { type: "string" },
    category: { type: "string", required: true },
    featured: { type: "boolean", default: false },
    stats: {
      views: { type: "number", default: 0 },
      stars: { type: "number", default: 0 },
      forks: { type: "number", default: 0 },
    },
    createdAt: { type: "date", default: "now" },
    updatedAt: { type: "date", default: "now" },
  },
  contact: {
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    subject: { type: "string", required: true },
    message: { type: "string", required: true },
    status: { type: "string", enum: ["new", "read", "replied"], default: "new" },
    createdAt: { type: "date", default: "now" },
  },
  analytics: {
    event: { type: "string", required: true },
    page: { type: "string", required: true },
    metadata: { type: "object" },
    timestamp: { type: "date", default: "now" },
    userAgent: { type: "string" },
    ip: { type: "string" },
  },
}
