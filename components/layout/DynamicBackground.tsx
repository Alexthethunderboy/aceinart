"use client";

import { motion } from "framer-motion";

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        {/* Blob 1 - Primary/Gold */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] h-[50vh] w-[50vh] rounded-full bg-primary/20 blur-[100px]"
        />

        {/* Blob 2 - Accent/Neon */}
        <motion.div
          animate={{
            x: [0, -70, 30, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-[20%] right-[10%] h-[40vh] w-[40vh] rounded-full bg-accent/20 blur-[90px]"
        />

        {/* Blob 3 - Secondary/Dark */}
        <motion.div
          animate={{
            x: [0, 90, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-[10%] left-[20%] h-[60vh] w-[60vh] rounded-full bg-secondary/30 blur-[120px]"
        />
      </motion.div>

      {/* Floating Doodles / SVGs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
         {/* Doodle 1: Squiggle */}
         <motion.svg
            width="200" height="200" viewBox="0 0 200 200"
            className="absolute top-[15%] left-[5%] text-accent"
            animate={{ rotate: 360, y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         >
            <path d="M10,100 C50,0 150,200 190,100" fill="none" stroke="currentColor" strokeWidth="2" />
         </motion.svg>

         {/* Doodle 2: Circle Outline */}
         <motion.div
            className="absolute top-[40%] right-[15%] w-24 h-24 border border-primary/40 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
         />

         {/* Doodle 3: Crosses */}
         <motion.div
            className="absolute bottom-[25%] left-[10%] text-secondary/40 font-mono text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
         >
            + + +
         </motion.div>

         {/* Doodle 4: Triangle */}
         <motion.svg
            width="100" height="100" viewBox="0 0 100 100"
            className="absolute bottom-[10%] right-[5%] text-white/20"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
         >
            <polygon points="50,15 90,85 10,85" fill="none" stroke="currentColor" strokeWidth="2" />
         </motion.svg>

         {/* Doodle 5: Grid Points */}
         <div className="absolute top-[20%] right-[20%] grid grid-cols-3 gap-2 opacity-30">
            {[...Array(9)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-1 h-1 bg-white rounded-full"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
         </div>

         {/* Doodle 6: Floating Sparkles */}
         <motion.svg
            width="50" height="50" viewBox="0 0 24 24"
            className="absolute top-[60%] left-[20%] text-neon-pink"
            animate={{ scale: [0.8, 1.2, 0.8], rotate: 180 }}
            transition={{ duration: 4, repeat: Infinity }}
         >
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
         </motion.svg>
         
         {/* Doodle 7: Wave Line */}
         <motion.svg
            width="300" height="100" viewBox="0 0 300 100"
            className="absolute bottom-[30%] left-[40%] text-neon-blue opacity-20"
            animate={{ x: [-50, 50, -50] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         >
             <path d="M0,50 Q75,0 150,50 T300,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
         </motion.svg>
      </div>
      
      {/* Noise Overlay Texture for "Tactile" feel */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
    </div>
  );
}
