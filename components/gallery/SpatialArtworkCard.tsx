"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Image, Text } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { Artwork } from "@/lib/types";
import { urlForImage } from "@/lib/sanity/image";

interface SpatialArtworkCardProps {
  artwork: Artwork;
  index: number;
  total: number;
  radius?: number;
  onSelect?: (artwork: Artwork, position: THREE.Vector3) => void;
}

export function SpatialArtworkCard({ artwork, index, total, radius = 5, onSelect }: SpatialArtworkCardProps) {
  const meshRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  // Calculate position in a circle
  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  // Point towards center
  const rotationY = angle + Math.PI;

  const targetScale = hovered ? 1.2 : 1;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Float effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2;
      
      // Smooth scale
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
  });

  const imageUrl = artwork.mockUrl || (artwork.mainImage ? urlForImage(artwork.mainImage).width(800).url() : "");

  return (
    <group 
      ref={meshRef} 
      position={[x, 0, z]} 
      rotation={[0, rotationY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "default";
        if (onSelect && meshRef.current) {
           const pos = new THREE.Vector3();
           meshRef.current.getWorldPosition(pos);
           onSelect(artwork, pos);
        } else {
           router.push(`/curated/${artwork.slug?.current || "a"}`);
        }
      }}
    >
      {imageUrl ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image 
          url={imageUrl} 
          transparent 
          opacity={1} 
          scale={[2.5, 3.5]} 
        />
      ) : (
        <mesh>
          <planeGeometry args={[2.5, 3.5]} />
          <meshBasicMaterial color="#333" />
        </mesh>
      )}
      
      {/* Title appearing on hover */}
      <Text
        position={[0, -2, 0.1]}
        fontSize={0.2}
        color={hovered ? "#9D4EDD" : "white"}
        anchorX="center"
        anchorY="middle"
        fillOpacity={hovered ? 1 : 0.5}
      >
        {artwork.title}
      </Text>
    </group>
  );
}
