import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-6xl md:text-7xl lg:text-8xl text-text-primary mb-8 tracking-luxury"
        >
          Experience Unparalleled Living.
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          whileHover={{
            backgroundColor: "hsl(var(--accent-brand))",
            color: "hsl(var(--text-secondary))",
            scale: 1.02,
          }}
          className="font-body text-accent-brand border border-accent-brand bg-transparent px-12 py-4 text-lg tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent-brand/20"
        >
          Explore Properties
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
