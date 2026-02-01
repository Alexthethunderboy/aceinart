"use client";

import { motion } from "framer-motion";

interface CreativeDNARadarProps {
  data: {
    medium: number;
    complexity: number;
    emotion: number;
    abstraction: number;
  };
  className?: string;
}

export function CreativeDNARadar({ data, className }: CreativeDNARadarProps) {
  // Normalize data 1-10 to 0-100 radius
  const rMedium = (data.medium || 5) * 10;
  const rComplexity = (data.complexity || 5) * 10;
  const rEmotion = (data.emotion || 5) * 10;
  const rAbstraction = (data.abstraction || 5) * 10;

  // 4 Axes: Top, Right, Bottom, Left
  // 0 deg is Top (0, -r)
  // 90 deg is Right (r, 0)
  // 180 deg is Bottom (0, r)
  // 270 deg is Left (-r, 0)

  // Points relative to center (100, 100)
  const p1 = { x: 100, y: 100 - rMedium }; // Top (Medium)
  const p2 = { x: 100 + rComplexity, y: 100 }; // Right (Complexity)
  const p3 = { x: 100, y: 100 + rEmotion }; // Bottom (Emotion)
  const p4 = { x: 100 - rAbstraction, y: 100 }; // Left (Abstraction)

  const pathD = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} Z`;

  return (
    <div className={className}>
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        {/* Background Grid Circles */}
        {[20, 40, 60, 80, 100].map((r, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeOpacity="0.1" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeOpacity="0.1" />

        {/* Labels */}
        <text x="100" y="-10" textAnchor="middle" fontSize="10" fill="currentColor" className="uppercase tracking-wider opacity-60">Medium</text>
        <text x="210" y="104" textAnchor="start" fontSize="10" fill="currentColor" className="uppercase tracking-wider opacity-60">Complexity</text>
        <text x="100" y="220" textAnchor="middle" fontSize="10" fill="currentColor" className="uppercase tracking-wider opacity-60">Emotion</text>
        <text x="-10" y="104" textAnchor="end" fontSize="10" fill="currentColor" className="uppercase tracking-wider opacity-60">Abstraction</text>

        {/* Data Polygon */}
        <motion.path
          initial={{ d: "M 100 100 L 100 100 L 100 100 L 100 100 Z", opacity: 0 }}
          animate={{ d: pathD, opacity: 0.8 }}
          transition={{ duration: 1.5, type: "spring" }}
          d={pathD}
          fill="rgba(255, 215, 0, 0.2)" // Gold/Primary
          stroke="var(--primary)"
          strokeWidth="2"
        />

        {/* Data Points */}
        <motion.circle cx={p1.x} cy={p1.y} r="3" fill="var(--primary)" initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2}} />
        <motion.circle cx={p2.x} cy={p2.y} r="3" fill="var(--primary)" initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3}} />
        <motion.circle cx={p3.x} cy={p3.y} r="3" fill="var(--primary)" initial={{scale:0}} animate={{scale:1}} transition={{delay:0.4}} />
        <motion.circle cx={p4.x} cy={p4.y} r="3" fill="var(--primary)" initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5}} />

      </svg>
    </div>
  );
}
