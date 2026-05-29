import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MonitorSmartphone } from 'lucide-react';

export default function CTABanner() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-dark-800 via-dark-900 to-dark-950 py-16 md:py-20"
    >
      {/* Neon Glow Orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/8 blur-[150px]" />

      {/* Grid Background Overlay */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Badge */}
        <span className="mb-8 inline-block rounded-full border border-neon/30 bg-neon/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-neon">
          AI-POWERED DRONE INTELLIGENCE
        </span>

        {/* Heading */}
        <h2 className="mb-6 font-[Outfit] text-4xl font-bold leading-tight text-white md:text-6xl">
          Ready to Unlock
          <br />
          <span className="text-gradient-neon">
            AI-Driven Insights?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/40">
          Transform aerial imagery, telemetry, and IoT sensor data into
          actionable insights for agriculture, infrastructure inspection,
          logistics, environmental monitoring, and smart city operations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.a
            href="#contact"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-neon px-8 py-4 font-semibold text-dark-950 transition-all hover:shadow-xl hover:shadow-neon/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Request Demo
            <ArrowRight className="h-4 w-4" />
          </motion.a>

          <motion.a
            href="#platform"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-white transition-all hover:border-white/40 hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <MonitorSmartphone className="h-4 w-4" />
            View Platform
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}