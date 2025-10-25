"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    console.log("[v0] Submitting contact form:", data)

    try {
      const response = await fetch("/api/sql/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log("[v0] Contact form response:", result)

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Message sent successfully! I'll get back to you soon.",
        })
        form.reset()
      } else {
        console.error("[v0] Contact form error:", result)
        setMessage({
          type: "error",
          text: `Failed to send message: ${result.details || result.error}. Please try again or email me directly at t67shah@uwaterloo.ca`,
        })
      }
    } catch (error) {
      console.error("[v0] Contact form exception:", error)
      setMessage({
        type: "error",
        text: "An error occurred. Please try again or email me directly at t67shah@uwaterloo.ca",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 relative border-t border-border/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            I'm always open to discussing new projects, robotics collaborations, or opportunities in electrical
            engineering and software development.
          </p>

          {/* Contact Info - No boxes, flowing list style */}
          <div className="mb-12 space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <Mail className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a
                  href="mailto:t67shah@uwaterloo.ca"
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  t67shah@uwaterloo.ca
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                <Phone className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href="tel:+16466300279" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  +1 (646) 630-0279
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-muted-foreground">Waterloo, ON / Summit, NJ</p>
              </div>
            </div>
          </div>

          {/* Contact Form - Simplified without card wrapper */}
          <div className="border-t border-border/30 pt-12">
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                    className="transition-all focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  disabled={isSubmitting}
                  className="transition-all focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me more about your project..."
                  rows={6}
                  required
                  disabled={isSubmitting}
                  className="transition-all focus:border-primary resize-none"
                />
              </div>

              {message && (
                <Alert
                  variant={message.type === "success" ? "default" : "destructive"}
                  className="animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  {message.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto group">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Tanush Shah. Built with Next.js, React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </section>
  )
}
