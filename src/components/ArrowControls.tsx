import React from 'react'
import {motion} from "framer-motion"
import { ChevronLeft, ChevronRight } from 'lucide-react'
const ArrowControls = ({handleSlide}:{handleSlide: (direction: "right" | "left") => void}) => {
  return (
    <>
    <motion.button
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{ type: "tween" }}
      className="absolute top-1/2 -translate-y-1/2 left-5 z-30 p-3 rounded-full bg-gray-500/30 text-white"
      onClick={() => handleSlide("left")}
    >
      <ChevronLeft />
    </motion.button>
    <motion.button
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
      transition={{ type: "tween" }}
      className="absolute top-1/2 -translate-y-1/2 right-5 z-30 p-3 rounded-full bg-gray-500/30 text-white"
      onClick={() => handleSlide("right")}
    >
      <ChevronRight />
    </motion.button>
   
  </>
  )
}

export default ArrowControls