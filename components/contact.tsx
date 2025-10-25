"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
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

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/sql/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Message sent successfully! Your message has been stored in PostgreSQL. I'll get back to you soon.",
        })
        e.currentTarget.reset()
      } else {
        setMessage({
          type: "error",
          text: "Failed to send message. Please try again or email me directly at t67shah@uwaterloo.ca",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again or email me directly at t67shah@uwaterloo.ca",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-8 relative border-b border-border/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Get In Touch</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, robotics collaborations, or opportunities in electrical
            engineering and software development.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/30">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a
                href="mailto:t67shah@uwaterloo.ca"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                t67shah@uwaterloo.ca
              </a>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-2 hover:border-secondary/30">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4 group-hover:bg-secondary/20 group-hover:scale-110 transition-all">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <a
                href="tel:+16466300279"
                className="text-muted-foreground hover:text-secondary transition-colors text-sm"
              >
                +1 (646) 630-0279
              </a>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-2 hover:border-accent/30">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground text-sm">Waterloo, ON / Summit, NJ</p>
            </Card>
          </div>

          <Card className="p-8 border-2 hover:border-primary/20 transition-colors">
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
          </Card>
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
