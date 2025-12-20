import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onComplete, 600)
    }, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="flex items-baseline">
            <motion.span
              className="font-display text-6xl font-bold text-white md:text-8xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              J
            </motion.span>
            <motion.span
              className="font-display text-6xl font-bold text-white md:text-8xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            >
              arod.
            </motion.span>
          </div>
          <motion.div
            className="absolute bottom-1/3 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #2e9bfb, #CE42FF)' }}
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
