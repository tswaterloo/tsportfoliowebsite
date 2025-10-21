import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const experiences = [
  {
    period: "August 2017 — June 2025",
    title: "VEX Robotics Team Captain & Instructor",
    company: "Summit, NJ",
    description:
      "Led 6-person team to Finalist position at VEX Robotics World Championship, ranking top 2 of 20,000 teams worldwide. Worked 20+ hrs/wk on code/build/strategy and engineering notebook with detailed CAD/build/code documentation, resulting in 5x state-level award wins. Programmed drive, autonomous, PID, and odometry systems in VEXCode Pro/PROS (C++ based). Designed robots using Fusion 360, Onshape, and SolidWorks.",
    technologies: ["C++", "VEXCode Pro", "PROS", "Fusion 360", "Onshape", "SolidWorks", "PID Control", "Odometry"],
    links: [
      { label: "CAD Portfolio", url: "http://bit.ly/46xUgox" },
      { label: "Engineering Notebooks", url: "https://bit.ly/46tg7gQ" },
    ],
  },
  {
    period: "May 2024 — May 2025",
    title: "Electrical Engineering Research Intern",
    company: "Hofstra University, Hempstead, NY",
    description:
      "Project 1: Designed, built & coded modular large-format gantry 3D printer in Onshape, coding multi-axis motion control & G-code execution with Duet 3D Controller & RepRap Firmware. Project 2: Designed, built, & coded mobile 4WD 3D Printing Robot using Arduino; fabricated custom PCB shield using KiCad and implemented motion control algorithms & path planning for stepper motors in C++. Presented research and live demo at symposium (2000+ attendees).",
    technologies: ["Arduino", "C++", "Onshape", "KiCad", "Duet 3D", "RepRap Firmware", "PCB Design", "Motion Control"],
    links: [{ label: "Project Showcase", url: "https://bit.ly/48rf9Ej" }],
  },
  {
    period: "June 2021 — June 2023",
    title: "Millburn VEX AI Code Captain",
    company: "Millburn, NJ",
    description:
      "Only AI team directly invited to VEX World Championship for Special Showcase. Developed position mapping and object detection code using YOLOv5 deep learning computer vision model. Engineered serial communication between NVIDIA Jetson Nano (Linux) & V5 Brain for autonomous navigation. Optimized system performance 5x through TensorRT GPU acceleration.",
    technologies: ["Python", "YOLOv5", "TensorRT", "NVIDIA Jetson Nano", "Linux", "Computer Vision", "Deep Learning"],
    links: [{ label: "Self-Coded Website", url: "https://bit.ly/3KyGHh4" }],
  },
  {
    period: "June 2023 — August 2023",
    title: "Inspirit AI Scholar - Machine Learning Research",
    company: "Remote",
    description:
      "Built NLP models (LSTM, BERT, Bag of Words) using Python to analyze financial news and predict market using sentiment analysis, achieving up to 85% classification accuracy in identifying market trends. Used classification algorithms including Logistic regression, K-Nearest Neighbor, and Random Forest.",
    technologies: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "LSTM",
      "BERT",
      "NLP",
      "Pandas",
      "scikit-learn",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    period: "September 2022 — June 2025",
    title: "Co-President: Model United Nations in Global Diplomacy Club",
    company: "Millburn High School, Millburn, NJ",
    description:
      "Awards: Outstanding Delegation at Harvard China & Scripps Ranch CA, Best Delegation at Bombay 2023. Grew club to over 100 members (250% increase), taught online lessons to underprivileged areas in NJ & India.",
    technologies: ["Leadership", "Public Speaking", "Research", "Diplomacy"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience & Leadership</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                  <span className="text-sm text-muted-foreground md:min-w-[180px]">{exp.period}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                    <p className="text-primary mb-3">{exp.company}</p>
                    <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                    {exp.links && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.links.map((link) => (
                          <Button key={link.label} variant="outline" size="sm" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.label}
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
