import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Clock, Navigation, Battery } from 'lucide-react';

const stats = [
  {
    label: 'Payload',
    value: '5.2 kg',
    icon: Package,
    position: 'top-0 left-0 md:-top-4 md:-left-4',
    delay: 0.3,
  },
  {
    label: 'Endurance',
    value: '120 min',
    icon: Clock,
    position: 'top-0 right-0 md:-top-4 md:-right-4',
    delay: 0.45,
  },
  {
    label: 'Flight Range',
    value: '45 km',
    icon: Navigation,
    position: 'bottom-0 left-0 md:-bottom-4 md:-left-4',
    delay: 0.6,
  },
  {
    label: 'Battery',
    value: '12,000 mAh',
    icon: Battery,
    position: 'bottom-0 right-0 md:-bottom-4 md:-right-4',
    delay: 0.75,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const statVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
};

export default function FeaturedDrone() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-dark-900 py-16 md:py-20"
    >
      {/* Grid Background Overlay */}
      <div className="grid-bg absolute inset-0" />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Top Content */}
        <div className="mb-12 text-center">
          <motion.span
            className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-neon"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0}
          >
            FEATURED PRODUCT
          </motion.span>

          <motion.h2
            className="font-[Outfit] text-4xl font-bold md:text-5xl"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.1}
          >
            <span className="text-white">AeroVault</span>{' '}
            <span className="text-gradient-neon">Phantom X1</span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-xl text-base text-white/40"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.2}
          >
            Our flagship autonomous drone platform engineered for
            mission-critical operations with unmatched endurance and payload
            capacity.
          </motion.p>
        </div>

        {/* Drone Image with Stats */}
        <motion.div
          className="relative mx-auto max-w-2xl"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Animated Glowing Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[85%] w-[85%] animate-[spin_20s_linear_infinite] rounded-full border border-neon/20 shadow-[0_0_30px_rgba(204,255,0,0.1),inset_0_0_30px_rgba(204,255,0,0.05)]">
              <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neon shadow-[0_0_10px_rgba(204,255,0,0.8)]" />
            </div>
          </div>

          {/* Drone Image */}
          <motion.div
            className="relative z-10"
            variants={fadeUp}
            custom={0.25}
          >
            <img
              src="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1200&q=80"
              alt="AeroVault Phantom X1 Drone"
              className="animate-float mx-auto w-full rounded-3xl object-contain"
            />
          </motion.div>

          {/* Floating Stat Indicators */}
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                className={`glass-card absolute z-20 rounded-xl p-4 ${stat.position}`}
                variants={statVariant}
                custom={stat.delay}
              >
                <div className="flex items-center gap-3">
                  {/* Neon Dot Indicator */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neon/10">
                    <Icon className="h-4 w-4 text-neon" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                      {stat.label}
                    </p>
                    <p className="font-[Outfit] text-lg font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
                {/* Neon Dot */}
                <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-neon shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0.9}
        >
          <button className="rounded-full bg-neon px-8 py-4 font-semibold text-dark-950 transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]">
            Explore Phantom X1
          </button>
        </motion.div>
      </div>
    </section>
  );
}
