"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator, Heart, Shield, Users, Github, Twitter, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-sky-100 to-white px-6 py-16">
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

      {/* Features Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose BMI Tracker?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Health Focused",
                description: "Track your BMI and monitor your health journey with precision and care.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your health data is encrypted and protected with industry-standard security.",
              },
              {
                icon: Users,
                title: "Expert Consultation",
                description: "Connect with health professionals for personalized advice and guidance.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-sky-100 rounded-full">
                    <feature.icon className="w-8 h-8 text-sky-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-sky-900 to-sky-800 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-8 h-8 text-sky-300" />
                <h3 className="text-2xl font-bold">BMI Tracker</h3>
              </div>
              <p className="text-sky-200 mb-4">
                Your trusted companion for health monitoring and BMI tracking. Take control of your wellness journey
                today.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Mail, href: "", label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="p-2 bg-sky-800 rounded-full hover:bg-sky-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "BMI Calculator", href: "/dashboard" },
                  { name: "History", href: "/history" },
                  { name: "Consultation", href: "/consultation" },
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link href={link.href} className="text-sky-200 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {[
                  { name: "Help Center", href: "#" },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Contact Us", href: "#" },
                  { name: "FAQ", href: "#" },
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link href={link.href} className="text-sky-200 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
                  <Mail className="w-5 h-5 text-sky-300" />
                  <span className="text-sky-200">support@bmitracker.com</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
                  <Phone className="w-5 h-5 text-sky-300" />
                  <span className="text-sky-200">+62 123 456 7890</span>
                </motion.div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6">
                <h5 className="font-medium mb-2">Stay Updated</h5>
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 rounded bg-sky-800 text-white placeholder-sky-300 border border-sky-700 focus:outline-none focus:border-sky-500"
                  />
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-500">
                    Subscribe
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-sky-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sky-200 text-sm">© 2024 BMI Tracker. All rights reserved. Made with ❤️ in Indonesia.</p>
            <motion.div
              className="flex gap-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="#" className="text-sky-200 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sky-200 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sky-200 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
