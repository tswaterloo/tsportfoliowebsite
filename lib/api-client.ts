// API client utility for making requests to backend
// Demonstrates clean API architecture and error handling

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export class APIClient {
  private baseURL: string

  constructor(baseURL = "/api") {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new APIError(data.error || "Request failed", response.status, data)
      }

      return data
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError("Network error", 0, error)
    }
  }

  // Projects API
  async getProjects(params?: { category?: string; featured?: boolean }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set("category", params.category)
    if (params?.featured !== undefined) searchParams.set("featured", String(params.featured))

    const query = searchParams.toString()
    return this.request<{ success: boolean; data: any[]; count: number }>(`/projects${query ? `?${query}` : ""}`)
  }

  async getProject(id: string) {
    return this.request<{ success: boolean; data: any }>(`/projects/${id}`)
  }

  async createProject(project: any) {
    return this.request<{ success: boolean; data: any }>("/projects", {
      method: "POST",
      body: JSON.stringify(project),
    })
  }

  async updateProject(id: string, updates: any) {
    return this.request<{ success: boolean; data: any }>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  async deleteProject(id: string) {
    return this.request<{ success: boolean; message: string }>(`/projects/${id}`, {
      method: "DELETE",
    })
  }

  // Analytics API
  async getAnalytics() {
    return this.request<{ success: boolean; data: any }>("/analytics")
  }

  async trackEvent(event: string, page: string, metadata?: any) {
    return this.request<{ success: boolean; message: string }>("/analytics/track", {
      method: "POST",
      body: JSON.stringify({ event, page, metadata }),
    })
  }

  // GitHub API
  async getGitHubRepos(limit?: number) {
    const query = limit ? `?limit=${limit}` : ""
    return this.request<{ success: boolean; data: any[]; count: number }>(`/github${query}`)
  }

  async syncGitHubRepos() {
    return this.request<{ success: boolean; message: string; count: number }>("/github/sync", {
      method: "POST",
    })
  }

  // Contact API
  async submitContact(data: { name: string; email: string; subject: string; message: string }) {
    return this.request<{ message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

// Export singleton instance
export const apiClient = new APIClient()

// React hook for using API client
export function useAPI() {
  return apiClient
}
