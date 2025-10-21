"use server"

// This is a server action that handles form submission
// In a real application, you would integrate with an email service or database
export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate the data
  if (!name || !email || !subject || !message) {
    return {
      type: "error" as const,
      text: "Please fill in all fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      type: "error" as const,
      text: "Please enter a valid email address.",
    }
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Log the form data (in production, you would send this to an email service or database)
  console.log("[v0] Contact form submission:", {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  })

  // In a real application, you would:
  // 1. Send an email using a service like SendGrid, Resend, or AWS SES
  // 2. Store the message in a database
  // 3. Send a notification to yourself

  // Example with a hypothetical email service:
  // await emailService.send({
  //   to: 'your-email@example.com',
  //   from: email,
  //   subject: `Portfolio Contact: ${subject}`,
  //   text: `From: ${name} (${email})\n\n${message}`,
  // })

  return {
    type: "success" as const,
    text: "Thank you for your message! I'll get back to you soon.",
  }
}
