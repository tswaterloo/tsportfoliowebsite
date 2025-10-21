"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Award, Trophy, GraduationCap, Users } from "lucide-react"

const highlights = [
  {
    icon: Trophy,
    title: "World Championship Finalist",
    description: "Top 2 of 20,000 teams worldwide",
  },
  {
    icon: Award,
    title: "5x State Awards",
    description: "Excellence, Innovate, Amaze Awards",
  },
  {
    icon: GraduationCap,
    title: "UWaterloo Engineering",
    description: "Electrical Engineering Student",
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Captain & Instructor for 8+ years",
  },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 bg-muted/30 relative" ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            About Me
          </h2>
          <div
            className={`space-y-6 text-lg leading-relaxed text-muted-foreground transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p>
              I'm an <span className="text-foreground font-medium">Electrical Engineering student</span> at the
              University of Waterloo with a passion for robotics, artificial intelligence, and full-stack development.
              My journey in engineering began with VEX Robotics, where I've spent over 8 years designing, building, and
              programming competitive robots.
            </p>
            <p>
              As <span className="text-foreground font-medium">Team Captain</span>, I led my 6-person team to a{" "}
              <span className="text-foreground font-medium">
                Finalist position at the VEX Robotics World Championship
              </span>
              , ranking in the top 2 of 20,000 teams worldwide. I worked 20+ hours per week on code, build, strategy,
              and detailed engineering documentation, resulting in 5 state-level award wins including 2x Excellence
              Awards, 2x Innovate Awards, and 1x Amaze Award.
            </p>
            <p>
              Beyond robotics, I've conducted{" "}
              <span className="text-foreground font-medium">research at Hofstra University</span>, where I designed and
              built a modular large-format gantry 3D printer and a mobile 4WD 3D printing robot. I've also explored{" "}
              <span className="text-foreground font-medium">machine learning and computer vision</span>, developing
              YOLOv5-based object detection systems and NLP models for financial sentiment analysis with 85%
              classification accuracy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <Card
                  key={index}
                  className={`p-6 text-center hover:shadow-xl transition-all duration-700 border-2 hover:border-primary/30 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
