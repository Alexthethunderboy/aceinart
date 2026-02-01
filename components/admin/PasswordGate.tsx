"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function PasswordGate({ 
  children, 
  correctPassword 
}: { 
  children: React.ReactNode
  correctPassword?: string 
}) {
  const [unlocked, setUnlocked] = useState(!correctPassword)
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === correctPassword) {
      setUnlocked(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 500)
    }
  }

  if (unlocked) {
     return <>{children}</>
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-canvas">
      <form onSubmit={handleUnlock} className="flex flex-col items-center gap-4 w-full max-w-xs">
         <h2 className="text-sm tracking-widest uppercase mb-4 opacity-50">Private Exhibition</h2>
         <motion.input
           animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
           type="password"
           placeholder="ENTER PASSWORD"
           value={input}
           onChange={(e) => setInput(e.target.value)}
           className="w-full bg-transparent border-b border-ink/20 py-2 text-center text-xl tracking-[0.5em] focus:outline-none focus:border-ink font-mono"
           autoFocus
         />
      </form>
    </div>
  )
}
