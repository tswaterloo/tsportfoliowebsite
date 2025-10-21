import { type NextRequest, NextResponse } from "next/server"
import { contactQueries } from "@/lib/db"

// POST /api/sql/contact - Save contact message to PostgreSQL
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const ipHeader = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip")
    const ip_address = ipHeader && ipHeader !== "unknown" ? ipHeader : null
    const user_agent = request.headers.get("user-agent") || null

    const contactMessage = await contactQueries.create({
      name,
      email,
      subject,
      message,
      ip_address,
      user_agent,
    })

    return NextResponse.json({
      success: true,
      data: contactMessage,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("[v0] Error saving contact message:", error)
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
  }
}

// GET /api/sql/contact - Fetch all contact messages (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const unread = searchParams.get("unread")

    const messages = unread === "true" ? await contactQueries.getUnread() : await contactQueries.getAll()

    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching contact messages:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 })
  }
}
