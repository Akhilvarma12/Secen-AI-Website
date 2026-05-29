import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center pb-20"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
          alt="Drone Intelligence Platform"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-dark-950/80 via-dark-950/60 to-dark-950"
        style={{ opacity: overlayOpacity }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-[2] grid-bg opacity-40" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 -right-20 z-[3] h-96 w-96 rounded-full bg-neon/10 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 -left-10 z-[3] h-64 w-64 rounded-full bg-neon/5 blur-[100px] animate-float-delayed pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeSlideUp}>
            <span className="mb-8 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mt-20 text-xs tracking-[0.2em] text-white/60 backdrop-blur-sm">
              AI-POWERED DRONE INTELLIGENCE
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeSlideUp}
            className="mb-6 font-[Outfit] text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
          >
            <span className="block text-white">
              AI-Powered Drone
            </span>
            <span className="block text-gradient-neon">
              Intelligence Platform
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeSlideUp}
            className="mb-12 max-w-4xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            Real-time drone monitoring, AI analytics, IoT integration,
            crop disease detection, infrastructure inspection, aerial
            surveying, logistics intelligence, and smart city monitoring
            through a unified analytics platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeSlideUp}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="#solutions"
              className="group inline-flex items-center gap-2 rounded-full bg-neon px-8 py-4 text-base font-semibold text-dark-950 transition-all duration-300 hover:shadow-xl hover:shadow-neon/30"
            >
              Explore Solutions

              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>

            <a
              href="#demo"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-base text-white transition-all duration-300 hover:bg-white/5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-neon/20">
                <Play
                  size={14}
                  className="ml-0.5 transition-colors group-hover:text-neon"
                />
              </span>

              Watch Platform Demo
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
        }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/30">
          Scroll to explore
        </span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            size={20}
            className="text-white/30"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}