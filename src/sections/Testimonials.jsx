import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    initials: "SC",
    company: "AgriTech Solutions",
    review:
      "AeroVault transformed our crop monitoring operations. The Phantom X1 covers 500 acres in a single flight with incredibly detailed multispectral data. Our yield increased by 23% in the first season.",
  },
  {
    name: "Marcus Rodriguez",
    initials: "MR",
    company: "Sentinel Defence Corp",
    review:
      "The reliability and encrypted communication systems are best-in-class. We deployed AeroVault drones across 12 border monitoring stations with zero downtime in 18 months of continuous operation.",
  },
  {
    name: "Dr. Emily Watson",
    initials: "EW",
    company: "GeoMap Industries",
    review:
      "Precision mapping has never been this efficient. The AI-powered flight planning reduced our survey time by 60% while improving data accuracy. The enterprise fleet management is exceptional.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function StarRating() {
  return (
    <div className="flex gap-1 mb-5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-neon fill-neon" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.div variants={cardVariants} className="glass-card rounded-2xl p-8 flex flex-col">
      {/* Quote Icon */}
      <Quote className="w-10 h-10 text-neon/30 mb-4 -scale-x-100" />

      {/* Star Rating */}
      <StarRating />

      {/* Review Text */}
      <p className="text-white/60 text-sm leading-relaxed italic flex-1 mb-8">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center shrink-0">
          <span className="text-neon text-sm font-semibold">
            {testimonial.initials}
          </span>
        </div>

        {/* Name & Company */}
        <div>
          <p className="text-white font-medium text-sm">{testimonial.name}</p>
          <p className="text-white/40 text-xs">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-dark-900 py-16 md:py-20 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-neon text-xs tracking-[0.3em] text-center mb-4 font-semibold"
        >
          CLIENT TESTIMONIALS
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[Outfit] text-4xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="text-white">Trusted by</span>
          <span className="text-gradient-neon"> Industry Leaders</span>
        </motion.h2>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
