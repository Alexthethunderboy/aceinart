"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { Artwork } from "@/lib/types";
import { SpatialArtworkCard } from "./SpatialArtworkCard";

interface SpatialGalleryCanvasProps {
  artworks: Artwork[];
}

function Carousel({ artworks }: { artworks: Artwork[] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slowly rotate the entire carousel
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {artworks.map((artwork, i) => (
        <SpatialArtworkCard 
          key={artwork._id} 
          artwork={artwork} 
          index={i} 
          total={artworks.length} 
          radius={6} 
        />
      ))}
    </group>
  );
}

export function SpatialGalleryCanvas({ artworks }: SpatialGalleryCanvasProps) {
  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="w-full h-[80vh] relative z-20 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Carousel artworks={artworks} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5} 
          autoRotate={false} 
        />
        {/* Adds reflections/lighting for a premium feel */}
        <Environment preset="city" />
      </Canvas>
      
      {/* Overlay Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-white/50 font-mono text-xs tracking-widest uppercase bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
        Drag to Explore
      </div>
    </div>
  );
}
