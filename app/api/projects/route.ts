import { NextResponse } from "next/server"

// Mock database - in production, this would connect to MongoDB
const projects = [
  {
    id: "1",
    title: "VEX Robotics World Championship Robot",
    description:
      "Designed and programmed award-winning competition robot with advanced autonomous navigation, PID control systems, and odometry. Led team to top 2 finish among 20,000 teams worldwide.",
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
  },
  {
    id: "2",
    title: "Large-Format Gantry 3D Printer",
    description:
      "Modular large-format 3D printer with multi-axis motion control and G-code execution. Designed complete mechanical system in Onshape.",
    technologies: ["Onshape", "Duet 3D", "RepRap Firmware", "G-code", "Motion Control", "CAD"],
    demo: "https://bit.ly/48rf9Ej",
    category: "engineering",
    featured: true,
    stats: {
      views: 890,
      stars: 32,
      forks: 8,
    },
  },
  {
    id: "3",
    title: "YOLOv5 Computer Vision System",
    description:
      "Real-time object detection and position mapping system for autonomous robot navigation. Achieved 5x performance optimization through TensorRT GPU acceleration.",
    technologies: ["Python", "YOLOv5", "TensorRT", "NVIDIA Jetson Nano", "Computer Vision", "Deep Learning"],
    github: "https://bit.ly/3KyGHh4",
    demo: "https://bit.ly/3KyGHh4",
    category: "ai",
    featured: true,
    stats: {
      views: 2100,
      stars: 78,
      forks: 23,
    },
  },
]

// GET /api/projects - Get all projects
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const featured = searchParams.get("featured")

  let filteredProjects = [...projects]

  if (category) {
    filteredProjects = filteredProjects.filter((p) => p.category === category)
  }

  if (featured === "true") {
    filteredProjects = filteredProjects.filter((p) => p.featured)
  }

  return NextResponse.json({
    success: true,
    data: filteredProjects,
    count: filteredProjects.length,
  })
}

// POST /api/projects - Create new project (for future admin panel)
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.technologies) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // In production, save to MongoDB
    const newProject = {
      id: String(projects.length + 1),
      ...body,
      stats: {
        views: 0,
        stars: 0,
        forks: 0,
      },
    }

    projects.push(newProject)

    return NextResponse.json(
      {
        success: true,
        data: newProject,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create project",
      },
      { status: 500 },
    )
  }
}
