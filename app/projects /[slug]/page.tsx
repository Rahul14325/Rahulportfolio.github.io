"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { useRouter } from "next/navigation"
import { ModelViewer3D } from "@/components/model-viewer-3d"

// Project data - in a real app, this would come from a database or API
const projectsData = {
  "vernier-caliper": {
    title: "Vernier Caliper Design",
    description:
      "Complete CAD modeling and assembly of precision measurement tool with detailed component analysis and manufacturing specifications.",
    fullDescription:
      "This project involved the complete design and analysis of a precision vernier caliper using SolidWorks. The design includes detailed component modeling, assembly constraints, and manufacturing specifications. Key features include precision measurement capabilities, ergonomic design considerations, and comprehensive GD&T documentation.",
    images: ["/vernier-caliper-cad-model.png", "/precision-measurement-tool.png"],
    tags: ["SolidWorks", "GD&T", "Assembly", "Precision Engineering"],
    modelPath: "/models/vernier-caliper.glb",
    specifications: {
      "Measurement Range": "0-150mm",
      Accuracy: "±0.02mm",
      Material: "Stainless Steel",
      Finish: "Satin Chrome",
    },
    challenges: [
      "Achieving high precision tolerances",
      "Optimizing ergonomic design",
      "Material selection for durability",
    ],
  },
  "floating-trash-bot": {
    title: "Floating Trash Collecting Bot",
    description:
      "Innovative autonomous water cleaning robot with advanced collection mechanisms and sustainable design principles.",
    fullDescription:
      "An autonomous floating robot designed to collect trash and debris from water surfaces. The design incorporates sustainable materials, efficient collection mechanisms, and autonomous navigation systems. The project includes comprehensive simulation studies and environmental impact analysis.",
    images: ["/floating-trash-collecting-robot.png", "/water-cleaning-robot-mechanism.png"],
    tags: ["SolidWorks", "ANSYS", "Robotics", "Environmental Engineering"],
    modelPath: "/models/trash-bot.glb",
    specifications: {
      "Collection Capacity": "50L",
      "Operating Time": "8 hours",
      Navigation: "GPS + Sensors",
      "Power Source": "Solar + Battery",
    },
    challenges: [
      "Waterproof design considerations",
      "Autonomous navigation in water",
      "Efficient trash collection mechanism",
    ],
  },
  "gearbox-assembly": {
    title: "Gearbox Assembly",
    description:
      "Complex gearbox design featuring involute spur gears with comprehensive stress analysis and optimization studies.",
    fullDescription:
      "A comprehensive gearbox design project featuring involute spur gears with detailed stress analysis and optimization. The project includes complete assembly modeling, kinematic analysis, and performance optimization using advanced simulation techniques.",
    images: ["/gearbox-assembly-cad.png", "/involute-spur-gear-design.png"],
    tags: ["SolidWorks", "FEA", "Optimization", "Mechanical Systems"],
    modelPath: "/models/gearbox.glb",
    specifications: {
      "Gear Ratio": "4:1",
      "Torque Capacity": "500 Nm",
      Efficiency: "95%",
      "Operating Speed": "1500 RPM",
    },
    challenges: ["Gear tooth profile optimization", "Stress concentration analysis", "Lubrication system design"],
  },
}

// Simple 3D Model Placeholder Component
function ModelViewer({ modelPath }: { modelPath: string }) {
  return <ModelViewer3D modelPath={modelPath} className="w-full h-96" />
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showModel, setShowModel] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const project = projectsData[params.slug as keyof typeof projectsData]

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/")} className="text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
          <div className="font-serif text-xl font-bold text-primary">Rahul Raju Halli</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image/Model Viewer */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Visual Content</h3>
                  <div className="flex gap-2">
                    <Button variant={!showModel ? "default" : "outline"} size="sm" onClick={() => setShowModel(false)}>
                      Images
                    </Button>
                    <Button variant={showModel ? "default" : "outline"} size="sm" onClick={() => setShowModel(true)}>
                      3D Model
                    </Button>
                  </div>
                </div>

                {!showModel ? (
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-video bg-background/20 rounded-lg overflow-hidden">
                      <img
                        src={project.images[selectedImage] || "/placeholder.svg"}
                        alt={`${project.title} - Image ${selectedImage + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Image Thumbnails */}
                    <div className="flex gap-2">
                      {project.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImage === index ? "border-primary" : "border-border"
                          }`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ModelViewer modelPath={project.modelPath} />
                )}
              </CardContent>
            </Card>

            {/* Project Description */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Project Overview</h3>
                <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Key Challenges</h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Specifications */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(project.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Project Links</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View CAD Files
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Github className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
