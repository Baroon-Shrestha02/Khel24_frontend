import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:flex md:items-center md:gap-16">
        
        {/* LEFT SIDE */}
        <motion.div
          className="md:w-1/2 text-white mb-12 md:mb-0"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Get in Touch
            </h1>

            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
              alt="logo"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </div>

          <p className="text-gray-300 mb-6">
            Have questions, feedback, or just want to say hi? Fill out the form and we’ll get back to you.
          </p>

          <ul className="space-y-3 text-gray-300 mb-6">
            <li>Email: <span className="text-blue-400 font-semibold">info@example.com</span></li>
            <li>Phone: <span className="text-blue-400 font-semibold">+1 234 567 890</span></li>
            <li>Address: <span className="text-blue-400 font-semibold">Kathmandu, Nepal</span></li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.2 }} className="bg-blue-500 p-3 rounded-full">
              <FaFacebookF />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} className="bg-pink-500 p-3 rounded-full">
              <FaInstagram />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} className="bg-sky-500 p-3 rounded-full">
              <FaTwitter />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} className="bg-blue-700 p-3 rounded-full">
              <FaLinkedinIn />
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-2xl">
            
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 text-center">
              Connect With Us
            </h2>

            <form className="space-y-5">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md"
              >
                Send Message
              </motion.button>

            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}