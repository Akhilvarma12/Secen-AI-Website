import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import { useRef } from "react";

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-dark-900 py-16 md:py-20 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-neon text-xs tracking-[0.3em] text-center mb-6 font-semibold"
        >
          SEE IT IN ACTION
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[Outfit] text-4xl md:text-5xl font-bold text-center mb-14"
        >
          <span className="text-white">Experience the</span>
          <span className="text-gradient-neon"> Future of Flight</span>
        </motion.h2>

        {/* Video Preview Container */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden relative group cursor-pointer"
        >
          {/* Background Thumbnail */}
          <img
            src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1400&q=80"
            alt="AeroVault Phantom X1 in flight"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-dark-950/40 transition-colors duration-500 group-hover:bg-dark-950/50" />

          {/* Centered Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Pulse Rings */}
              <span className="absolute w-24 h-24 rounded-full border border-neon/30 pulse-ring" style={{ animationDelay: "0s" }} />
              <span className="absolute w-24 h-24 rounded-full border border-neon/20 pulse-ring" style={{ animationDelay: "0.8s" }} />
              <span className="absolute w-24 h-24 rounded-full border border-neon/10 pulse-ring" style={{ animationDelay: "1.6s" }} />

              {/* Outer Ring */}
              <div className="w-24 h-24 rounded-full border-2 border-neon/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {/* Inner Circle */}
                <div className="w-16 h-16 rounded-full bg-neon flex items-center justify-center shadow-lg shadow-neon/30">
                  <Play className="w-7 h-7 text-dark-950 ml-1 fill-dark-950" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/30 text-sm text-center mt-6"
        >
          AeroVault Phantom X1 — Autonomous Mission Demo
        </motion.p>
      </div>
    </section>
  );
}
