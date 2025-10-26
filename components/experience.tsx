import { ExternalLink, Briefcase, Award, Code, Users } from "lucide-react"

const experiences = [
  {
    period: "August 2017 — June 2025",
    title: "VEX Robotics Team Captain & Instructor",
    company: "Summit, NJ",
    description:
      "Led 6-person team to Finalist position at VEX Robotics World Championship, ranking top 2 of 20,000 teams worldwide. Worked 20+ hrs/wk on code/build/strategy and engineering notebook with detailed CAD/build/code documentation, resulting in 5x state-level award wins. Programmed drive, autonomous, PID, and odometry systems in VEXCode Pro/PROS (C++ based). Designed robots using Fusion 360, Onshape, and SolidWorks.",
    technologies: ["C++", "VEXCode Pro", "PROS", "Fusion 360", "Onshape", "SolidWorks", "PID Control", "Odometry"],
    links: [{ label: "Engineering Notebooks", url: "https://bit.ly/46tg7gQ" }],
    icon: Award,
    color: "from-yellow-400 to-orange-500",
  },
  {
    period: "May 2024 — May 2025",
    title: "Electrical Engineering Research Intern",
    company: "Hofstra University, Hempstead, NY",
    description:
      "Project 1: Designed, built & coded modular large-format gantry 3D printer in Onshape, coding multi-axis motion control & G-code execution with Duet 3D Controller & RepRap Firmware. Project 2: Designed, built, & coded mobile 4WD 3D Printing Robot using Arduino; fabricated custom PCB shield using KiCad and implemented motion control algorithms & path planning for stepper motors in C++. Presented research and live demo at symposium (2000+ attendees).",
    technologies: ["Arduino", "C++", "Onshape", "KiCad", "Duet 3D", "RepRap Firmware", "PCB Design", "Motion Control"],
    links: [{ label: "Project Showcase", url: "https://bit.ly/48rf9Ej" }],
    icon: Code,
    color: "from-cyan-400 to-blue-500",
  },
  {
    period: "June 2021 — June 2023",
    title: "Millburn VEX AI Code Captain",
    company: "Millburn, NJ",
    description:
      "Only AI team directly invited to VEX World Championship for Special Showcase. Developed position mapping and object detection code using YOLOv5 deep learning computer vision model. Engineered serial communication between NVIDIA Jetson Nano (Linux) & V5 Brain for autonomous navigation. Optimized system performance 5x through TensorRT GPU acceleration.",
    technologies: ["Python", "YOLOv5", "TensorRT", "NVIDIA Jetson Nano", "Linux", "Computer Vision", "Deep Learning"],
    links: [],
    icon: Briefcase,
    color: "from-purple-400 to-pink-500",
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
    icon: Code,
    color: "from-green-400 to-emerald-500",
  },
  {
    period: "September 2022 — June 2025",
    title: "Co-President: Model United Nations in Global Diplomacy Club",
    company: "Millburn High School, Millburn, NJ",
    description:
      "Awards: Outstanding Delegation at Harvard China & Scripps Ranch CA, Best Delegation at Bombay 2023. Grew club to over 100 members (250% increase), taught online lessons to underprivileged areas in NJ & India.",
    technologies: ["Leadership", "Public Speaking", "Research", "Diplomacy"],
    icon: Users,
    color: "from-red-400 to-rose-500",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-8 border-b border-border/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-3">Experience</h2>
            <p className="text-sm text-muted-foreground font-mono">Leadership / Research / Development</p>
          </div>

          <div className="space-y-0">
            {experiences.map((exp, index) => {
              const Icon = exp.icon
              return (
                <div
                  key={index}
                  className="group relative border-l-2 border-border pl-8 pb-12 hover:border-primary/60 transition-all duration-500"
                >
                  <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-background border-2 border-border group-hover:border-primary flex items-center justify-center group-hover:scale-125 transition-all duration-500 z-10">
                    <Icon
                      className={`h-4 w-4 text-muted-foreground group-hover:bg-gradient-to-br group-hover:${exp.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500`}
                    />
                  </div>

                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b ${exp.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />

                  <div className="font-mono text-xs text-muted-foreground mb-2 group-hover:text-primary/70 transition-colors duration-300">
                    {exp.period}
                  </div>

                  <h3
                    className={`text-2xl font-light tracking-tight mb-1 group-hover:bg-gradient-to-r group-hover:${exp.color} group-hover:bg-clip-text group-hover:text-transparent group-hover:translate-x-1 transition-all duration-300`}
                  >
                    {exp.title}
                  </h3>
                  <p className="text-sm text-primary/80 mb-4 font-mono group-hover:text-primary transition-colors duration-300">
                    {exp.company}
                  </p>

                  <p className="text-base text-muted-foreground leading-relaxed mb-4 max-w-3xl group-hover:text-foreground/90 transition-colors duration-300">
                    {exp.description}
                  </p>

                  {exp.links && exp.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {exp.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          {link.label}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`font-mono text-xs px-2 py-1 rounded bg-background/50 border border-border/30 text-muted-foreground/70 hover:border-primary/50 hover:bg-gradient-to-r hover:${exp.color} hover:bg-clip-text hover:text-transparent hover:scale-105 transition-all duration-200 cursor-default`}
                        style={{
                          transitionDelay: `${techIndex * 30}ms`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
