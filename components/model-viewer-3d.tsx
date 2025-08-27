"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { Suspense } from "react"

interface ModelViewer3DProps {
  modelPath: string | null
  className?: string
}

function GLTFModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      if (child.material) {
        child.material.needsUpdate = true
      }
    }
  })

  return <primitive object={scene} scale={[2, 2, 2]} />
}

function PlaceholderModel() {
  return (
    <mesh>
      <boxGeometry args={[2, 1, 0.5]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
  )
}

export function ModelViewer3D({ modelPath, className = "w-full h-96" }: ModelViewer3DProps) {
  if (!modelPath) {
    return (
      <div className={`${className} rounded-lg overflow-hidden bg-white flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📐</div>
          <p className="text-sm">3D Model Coming Soon</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} rounded-lg overflow-hidden bg-white`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ background: "white" }} shadows>
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color="#0ea5e9" />
            </mesh>
          }
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-10, -10, -5]} intensity={0.6} />
          <directionalLight position={[0, 10, 0]} intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.3} />

          <Environment preset="studio" />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.5}
            maxDistance={20}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
          <GLTFModel modelPath={modelPath} />
        </Suspense>
      </Canvas>
    </div>
  )
}
