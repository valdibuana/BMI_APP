"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import { motion } from "framer-motion"


export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white px-6 py-16">
      <motion.div
        className="max-w-3xl text-center space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-4 bg-white rounded-full shadow-md">
            <Calculator className="w-10 h-10 text-sky-600" />
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Track Your Health with <span className="text-sky-600">BMI Tracker</span>
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Calculate your Body Mass Index, monitor your progress, and reach your health goals with ease.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link href="/register">
            <Button size="lg" className="bg-sky-600 text-white hover:bg-sky-700">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
