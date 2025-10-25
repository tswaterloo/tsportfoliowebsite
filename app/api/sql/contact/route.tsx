import { type NextRequest, NextResponse } from "next/server"
import { contactQueries } from "@/lib/db"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// POST /api/sql/contact - Save contact message to PostgreSQL
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log("[v0] Contact form submission received:", { name, email, subject })

    // Validate required fields
    if (!name || !email || !message) {
      console.log("[v0] Validation failed: missing required fields")
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const ipHeader = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip")
    const ip_address = ipHeader && ipHeader !== "unknown" ? ipHeader : null
    const user_agent = request.headers.get("user-agent") || null

    console.log("[v0] Attempting to save contact message to database...")

    const contactMessage = await contactQueries.create({
      name,
      email,
      subject: subject || "No subject",
      message,
      ip_address,
      user_agent,
    })

    console.log("[v0] Contact message saved successfully:", contactMessage.id)

    try {
      console.log("[v0] Attempting to send email notification...")
      await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: "t67shah@uwaterloo.ca",
        replyTo: email,
        subject: `New Contact Form Message: ${subject || "No subject"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject || "No subject"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            IP: ${ip_address || "Unknown"}<br>
            User Agent: ${user_agent || "Unknown"}<br>
            Submitted: ${new Date().toLocaleString()}
          </p>
        `,
      })
      console.log("[v0] Email notification sent successfully")
    } catch (emailError) {
      console.error("[v0] Failed to send email notification:", emailError)
      // Don't fail the request if email fails - message is still saved to database
    }

    return NextResponse.json({
      success: true,
      data: contactMessage,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("[v0] Error saving contact message:", error)
    // Log the full error details
    if (error instanceof Error) {
      console.error("[v0] Error message:", error.message)
      console.error("[v0] Error stack:", error.stack)
    }
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
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
