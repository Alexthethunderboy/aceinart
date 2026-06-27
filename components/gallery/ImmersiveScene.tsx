"use client"

import React, { useState, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Artwork } from "@/lib/types"
import { SpatialArtworkCard } from "./SpatialArtworkCard"
import { ArtworkDetailOverlay } from "@/components/ui/ArtworkDetailOverlay"
import { AboutOverlay } from "@/components/ui/AboutOverlay"
import { VoltageLightBrush } from "@/components/interaction/VoltageLightBrush"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ImmersiveSceneProps {
  artworks: Artwork[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  homeData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manifesto?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aboutData?: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Carousel({ artworks, onSelect }: { artworks: Artwork[], onSelect: (artwork: Artwork, pos: THREE.Vector3) => void }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Very slow ambient rotation
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {artworks.map((artwork, i) => (
        <SpatialArtworkCard 
          key={artwork._id} 
          artwork={artwork} 
          index={i} 
          total={artworks.length} 
          radius={8} 
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}

// CameraRig removed to prevent NaN camera bugs

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ImmersiveScene({ artworks, homeData, settings, manifesto, aboutData }: ImmersiveSceneProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelect = (artwork: Artwork, position: THREE.Vector3) => {
    setSelectedArtwork(artwork)
  }

  const handleClose = () => {
    setSelectedArtwork(null)
  }

  return (
    <>
      <VoltageLightBrush />
      
      <ArtworkDetailOverlay artwork={selectedArtwork} onClose={handleClose} />

      {/* Floating Header UI */}
      {!selectedArtwork && (
        <div className="absolute top-10 left-0 w-full z-10 flex flex-col items-center pointer-events-none">
           <div className="text-center animate-fade-in pointer-events-auto flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-primary/30">
              <h1 className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
                 {homeData?.heroLabel || "Immersive Archive"}
              </h1>
              <span className="text-white/20">|</span>
              <button 
                onClick={() => setIsAboutOpen(true)}
                className="text-white/70 hover:text-white font-mono text-xs tracking-[0.2em] uppercase transition-colors"
              >
                About
              </button>
           </div>
        </div>
      )}

      {/* About Sidebar Overlay */}
      <AboutOverlay 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
        homeData={homeData}
        aboutData={aboutData} 
        settings={settings} 
      />

      <Canvas camera={{ position: [0, 2, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#9D4EDD" />
        <spotLight position={[-10, -10, -10]} angle={0.2} penumbra={1} intensity={0.5} color="#00ff9d" />
        
        <React.Suspense fallback={null}>
          <group>
             <Carousel artworks={artworks} onSelect={handleSelect} />
          </group>
          <Environment preset="city" />
        </React.Suspense>

        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          rotateSpeed={0.5} 
          autoRotate={!selectedArtwork} 
          autoRotateSpeed={0.5}
          maxDistance={30}
          minDistance={2}
        />

        {/* Simple particle starfield for vibe */}
        <Stars />
      </Canvas>
      
      {/* Overlay Instructions */}
      {!selectedArtwork && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-white/50 font-mono text-xs tracking-widest uppercase bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
          Drag to Explore • Click to Inspect
        </div>
      )}
    </>
  )
}

function Stars() {
  const count = 500
  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  })

  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
     if(ref.current) {
        ref.current.rotation.y = state.clock.elapsedTime * 0.02
     }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#9D4EDD" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}
