"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye, ImageIcon } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense } from "react"

interface ProjectCardProps {
  title: string
  description: string
  thumbnail: string
  images: string[]
  tags: string[]
  modelPath?: string | null
}

function GLTFModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} scale={[2, 2, 2]} />
}

function ModelViewer({ modelPath }: { modelPath?: string | null }) {
  if (!modelPath) {
    return (
      <div className="w-full h-48 bg-muted/20 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">3D Model Slot</p>
          <p className="text-xs">Ready for your model</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-48 rounded-lg overflow-hidden bg-muted/10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#0ea5e9" />
            </mesh>
          }
        >
          <Environment preset="studio" />
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
          <GLTFModel modelPath={modelPath} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function ProjectCard({ title, description, thumbnail, images, tags, modelPath }: ProjectCardProps) {
  const [viewMode, setViewMode] = useState<"images" | "3d">("images")

  return (
    <Card className="glass-effect animate-fade-in-up group hover:scale-105 transition-transform duration-300 cursor-pointer">
      <CardContent className="p-6">
        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={viewMode === "images" ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setViewMode("images")
            }}
            className="text-xs"
          >
            <ImageIcon className="w-3 h-3 mr-1" />
            Images
          </Button>
          <Button
            variant={viewMode === "3d" ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setViewMode("3d")
            }}
            className="text-xs"
          >
            <Eye className="w-3 h-3 mr-1" />
            3D Model
          </Button>
        </div>

        {/* Content Area */}
        {viewMode === "images" ? (
          <div className="mb-4">
            <img
              src={thumbnail || "/placeholder.svg?key=default"}
              alt={`${title} thumbnail`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="mb-4">
            <ModelViewer modelPath={modelPath} />
          </div>
        )}

        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded ${
                index % 2 === 0 ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary-foreground"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent pointer-events-none">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Project Details
        </Button>
      </CardContent>
    </Card>
  )
}
