import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

function AnimatedCounter({ target, suffix = "", decimals = 0, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  const easeOutQuart = useCallback((t) => 1 - Math.pow(1 - t, 4), []);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime = null;
    let rafId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = easedProgress * target;

      setCount(currentValue);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView, target, duration, easeOutQuart]);

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toLocaleString();

  return (
    <span ref={counterRef}>
      {displayValue}{suffix}
    </span>
  );
}

const statsData = [
  { target: 500, suffix: "+", label: "Flights Completed" },
  { target: 50, suffix: "+", label: "Enterprise Clients" },
  { target: 99.9, suffix: "%", label: "System Reliability", decimals: 1 },
  { target: 24, suffix: "/7", label: "Mission Support" },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark-950 py-10 border-y border-white/5"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center py-6 md:py-8 ${
                index < statsData.length - 1
                  ? "md:border-r md:border-white/5"
                  : ""
              } ${
                index < 2 ? "border-b border-white/5 md:border-b-0" : ""
              }`}
            >
              <div className="font-[Outfit] text-4xl md:text-5xl font-bold text-neon">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  duration={2000}
                />
              </div>
              <p className="text-white/40 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
