import { NextResponse } from "next/server"

// This is a REST API endpoint that can also handle contact form submissions
// It demonstrates backend API development skills
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Log the submission
    console.log("[v0] API contact submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // In production, integrate with email service or database here
    // await sendEmail({ to: 'your-email@example.com', from: email, subject, message })

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET endpoint to demonstrate API capabilities
export async function GET() {
  return NextResponse.json({
    message: "Contact API is running",
    endpoints: {
      POST: "/api/contact - Submit contact form",
    },
  })
}
