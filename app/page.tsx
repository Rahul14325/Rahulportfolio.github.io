"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Menu, X, Download, Mail, Phone, Linkedin, Github } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import Link from "next/link"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "education", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const projects = [
    {
      id: "vernier-caliper",
      title: "Vernier Caliper Design",
      description:
        "Complete CAD modeling and assembly of precision measurement tool with detailed component analysis and manufacturing specifications.",
      thumbnail: "/vernier-caliper-cad-model-technical-drawing.png",
      images: [
        "/vernier-caliper-cad-model.png",
        "/precision-measurement-tool-assembly.png",
        "/technical-drawing-with-dimensions.png",
        "/assembly-view-exploded.png",
        "/manufacturing-specifications-sheet.png",
      ],
      tags: ["SolidWorks", "GD&T", "Assembly"],
      modelPath: "/models/vernier-caliper.glb",
    },
    {
      id: "floating-trash-bot",
      title: "Floating Trash Collecting Bot",
      description:
        "Innovative autonomous water cleaning robot with advanced collection mechanisms and sustainable design principles.",
      thumbnail: "/floating-trash-collecting-robot-water-cleaning.png",
      images: [
        "/floating-trash-collecting-robot.png",
        "/water-cleaning-robot-mechanism.png",
        "/robot-cad-model-design.png",
        "/trash-collection-mechanism-design.png",
        "/robot-control-system-diagram.png",
      ],
      tags: ["SolidWorks", "ANSYS", "Robotics"],
      modelPath: null,
    },
    {
      id: "gearbox-assembly",
      title: "Gearbox Assembly",
      description:
        "Complex gearbox design featuring involute spur gears with comprehensive stress analysis and optimization studies.",
      thumbnail: "/gearbox-assembly-cad-model-mechanical.png",
      images: [
        "/gearbox-assembly-cad-model.png",
        "/involute-spur-gear-design.png",
        "/gearbox-exploded-view.png",
        "/gear-stress-analysis-results.png",
        "/gearbox-performance-charts.png",
      ],
      tags: ["SolidWorks", "FEA", "Optimization"],
      modelPath: null,
    },
    {
      id: "engine-component",
      title: "Engine Component Design",
      description:
        "Advanced engine component modeling with thermal analysis and performance optimization for automotive applications.",
      thumbnail: "/engine-component-cad-model-automotive.png",
      images: [
        "/engine-component-cad-model.png",
        "/thermal-analysis-results.png",
        "/component-assembly-view.png",
        "/manufacturing-drawings.png",
        "/engine-component-specifications.png",
      ],
      tags: ["SolidWorks", "Thermal Analysis", "Automotive"],
      modelPath: null,
    },
    {
      id: "suspension-system",
      title: "Suspension System Analysis",
      description:
        "Comprehensive suspension system design and analysis with kinematic studies and ride comfort optimization.",
      thumbnail: "/suspension-system-design-automotive-analysis.png",
      images: [
        "/suspension-system-design.png",
        "/kinematic-analysis-results.png",
        "/suspension-geometry-optimization.png",
        "/ride-comfort-analysis.png",
        "/suspension-component-assembly.png",
      ],
      tags: ["SolidWorks", "Kinematics", "Vehicle Dynamics"],
      modelPath: null,
    },
    {
      id: "heat-exchanger",
      title: "Heat Exchanger Design",
      description:
        "Efficient heat exchanger design with CFD analysis and thermal performance optimization for industrial applications.",
      thumbnail: "/heat-exchanger-design-industrial-thermal.png",
      images: [
        "/heat-exchanger-design.png",
        "/cfd-analysis-results.png",
        "/thermal-performance-optimization.png",
        "/heat-transfer-coefficient-analysis.png",
        "/heat-exchanger-manufacturing-drawing.png",
      ],
      tags: ["SolidWorks", "CFD", "Heat Transfer"],
      modelPath: null,
    },
  ]

  return (
    <div className="min-h-screen bg-premium text-foreground gradient-noise">
      {/* Header Container */}
      <header className="header-container fixed top-0 left-0 right-0 z-50 glass-premium">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="font-heading text-xl font-bold text-primary">Rahul Raju Halli</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {["About", "Education", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-body text-sm font-medium transition-all duration-300 hover:text-primary magnetic-hover ${
                  activeSection === item.toLowerCase() ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 magnetic-hover ripple-effect"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Download Resume</span>
              <span className="lg:hidden">Resume</span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 magnetic-hover" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav-container md:hidden glass-premium border-t border-border">
            <nav className="container mx-auto px-4 sm:px-6 py-4 flex flex-col space-y-4">
              {["About", "Education", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit ripple-effect">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section Container */}
      <section
        id="hero"
        className="hero-container relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 gradient-spotlight"></div>
        <div className="absolute inset-0 gradient-overlay-angled"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 scroll-reveal">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Mechanical Design
            <span className="block text-primary">Portfolio</span>
          </h1>
          <p className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Innovative CAD Models, Simulations, and Projects
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("projects")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 magnetic-hover ripple-effect"
          >
            View My Work
          </Button>
        </div>
      </section>

      {/* About Section Container */}
      <section id="about" className="about-container py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 gradient-spotlight-green"></div>
        <div className="absolute inset-0 gradient-overlay-reverse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <div className="scroll-reveal order-2 md:order-1">
              <img
                src="/rahul-professional-photo.jpg"
                alt="Rahul Raju Halli"
                className="w-full max-w-sm md:max-w-md mx-auto rounded-2xl shadow-2xl magnetic-hover"
              />
            </div>
            <div className="scroll-reveal order-1 md:order-2">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
              <p className="font-body text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm Rahul Raju Halli, a passionate Mechanical Design Engineer with expertise in CAD modeling,
                simulation, and innovative product development. My journey in mechanical engineering has been driven by
                a love for creating solutions that bridge theoretical concepts with practical applications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="glass-premium p-4 rounded-lg magnetic-hover">
                  <h3 className="font-heading font-semibold text-primary mb-2">CAD Expertise</h3>
                  <p className="font-body text-sm text-muted-foreground">SolidWorks, AutoCAD, Fusion 360</p>
                </div>
                <div className="glass-premium p-4 rounded-lg magnetic-hover">
                  <h3 className="font-heading font-semibold text-primary mb-2">Simulation</h3>
                  <p className="font-body text-sm text-muted-foreground">ANSYS, FEA, CFD Analysis</p>
                </div>
                <div className="glass-premium p-4 rounded-lg magnetic-hover">
                  <h3 className="font-heading font-semibold text-primary mb-2">Manufacturing</h3>
                  <p className="font-body text-sm text-muted-foreground">GD&T, DFM, Quality Control</p>
                </div>
                <div className="glass-premium p-4 rounded-lg magnetic-hover">
                  <h3 className="font-heading font-semibold text-primary mb-2">Innovation</h3>
                  <p className="font-body text-sm text-muted-foreground">Product Development, R&D</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section Container */}
      <section id="education" className="education-container py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12 scroll-reveal">
            Education & Experience
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              <Card className="glass-premium scroll-reveal magnetic-hover">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-semibold text-lg">
                        Bachelor of Engineering - Automobile Engineering
                      </h3>
                      <p className="text-primary font-medium">Engineering College</p>
                      <p className="font-body text-sm text-muted-foreground mb-2">2021 - 2025</p>
                      <p className="font-body text-muted-foreground leading-relaxed">
                        Specialized in automotive systems, engine design, and vehicle dynamics with hands-on experience
                        in CAD modeling and simulation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-premium scroll-reveal magnetic-hover">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-semibold text-lg">Turbocharger Certification</h3>
                      <p className="text-primary font-medium">Garrett Motion</p>
                      <p className="font-body text-sm text-muted-foreground mb-2">2023</p>
                      <p className="font-body text-muted-foreground leading-relaxed">
                        Advanced certification in turbocharger design, performance optimization, and integration with
                        modern engine systems.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-premium scroll-reveal magnetic-hover">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-semibold text-lg">Engineering Intern</h3>
                      <p className="text-primary font-medium">Bosch</p>
                      <p className="font-body text-sm text-muted-foreground mb-2">Summer 2023</p>
                      <p className="font-body text-muted-foreground leading-relaxed">
                        Worked on automotive component design and testing, gaining valuable industry experience in
                        quality assurance and manufacturing processes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section Container */}
      <section id="projects" className="projects-container py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 gradient-spotlight"></div>
        <div className="absolute inset-0 gradient-overlay-angled"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12 scroll-reveal">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Link key={index} href={`/projects/${project.id}`} className="block scroll-reveal">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  thumbnail={project.thumbnail}
                  images={project.images}
                  tags={project.tags}
                  modelPath={project.modelPath}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Container */}
      <section id="contact" className="contact-container py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 gradient-spotlight-green"></div>
        <div className="absolute inset-0 gradient-overlay-reverse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12 scroll-reveal">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div className="scroll-reveal">
              <h3 className="font-heading font-semibold text-xl mb-6">Let's Connect</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-body break-all">rahulrakesh980@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-body">+91 7975574651</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto bg-transparent magnetic-hover ripple-effect"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto bg-transparent magnetic-hover ripple-effect"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>

            <Card className="glass-premium scroll-reveal magnetic-hover">
              <CardContent className="p-4 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" className="bg-background/50 font-body" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" className="bg-background/50 font-body" />
                  </div>
                  <div>
                    <Textarea placeholder="Your Message" rows={4} className="bg-background/50 resize-none font-body" />
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 ripple-effect">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Container */}
      <footer className="footer-container py-8 sm:py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-body text-sm text-muted-foreground">© 2025 Built with ❤️ by Rahul Raju Halli</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <button className="font-body text-sm text-muted-foreground hover:text-primary transition-colors magnetic-hover">
                About
              </button>
              <button className="font-body text-sm text-muted-foreground hover:text-primary transition-colors magnetic-hover">
                Privacy
              </button>
              <button className="font-body text-sm text-muted-foreground hover:text-primary transition-colors magnetic-hover">
                Terms
              </button>
              <button className="font-body text-sm text-muted-foreground hover:text-primary transition-colors magnetic-hover">
                Contact
              </button>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </footer>
    </div>
  )
}
