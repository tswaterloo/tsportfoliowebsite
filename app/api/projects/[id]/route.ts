import { NextResponse } from "next/server"

// Mock project data
const projects = [
  {
    id: "1",
    title: "VEX Robotics World Championship Robot",
    description:
      "Designed and programmed award-winning competition robot with advanced autonomous navigation, PID control systems, and odometry. Led team to top 2 finish among 20,000 teams worldwide.",
    fullDescription: `
      This project represents the culmination of 8 years of robotics experience. The robot features:
      
      - Advanced autonomous navigation using sensor fusion
      - Custom PID control algorithms for precise movement
      - Odometry system for position tracking
      - Multi-threaded code architecture for real-time performance
      - Comprehensive error handling and recovery systems
      
      The robot competed at the VEX Robotics World Championship and achieved a Finalist position,
      ranking in the top 2 of 20,000 teams worldwide. The project involved extensive CAD design,
      prototyping, testing, and documentation.
    `,
    technologies: ["C++", "PROS", "PID Control", "Odometry", "Sensor Fusion", "Autonomous Navigation"],
    github: "https://bit.ly/46tg7gQ",
    demo: "http://bit.ly/46xUgox",
    category: "robotics",
    featured: true,
    stats: {
      views: 1250,
      stars: 45,
      forks: 12,
    },
    timeline: [
      { date: "2017-08", event: "Started VEX Robotics" },
      { date: "2023-04", event: "World Championship Finalist" },
      { date: "2024-06", event: "5x State Awards" },
    ],
  },
]

// GET /api/projects/[id] - Get single project
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    return NextResponse.json(
      {
        success: false,
        error: "Project not found",
      },
      { status: 404 },
    )
  }

  // Increment view count (in production, update MongoDB)
  project.stats.views++

  return NextResponse.json({
    success: true,
    data: project,
  })
}

// PUT /api/projects/[id] - Update project
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const projectIndex = projects.findIndex((p) => p.id === params.id)

    if (projectIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 },
      )
    }

    // Update project (in production, update MongoDB)
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...body,
    }

    return NextResponse.json({
      success: true,
      data: projects[projectIndex],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update project",
      },
      { status: 500 },
    )
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const projectIndex = projects.findIndex((p) => p.id === params.id)

  if (projectIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Project not found",
      },
      { status: 404 },
    )
  }

  // Delete project (in production, delete from MongoDB)
  projects.splice(projectIndex, 1)

  return NextResponse.json({
    success: true,
    message: "Project deleted successfully",
  })
}
