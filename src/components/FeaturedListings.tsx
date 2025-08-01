import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { properties } from "@/data/properties";

// Custom hook for responsive breakpoints
const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

const FeaturedListings = () => {
  const screenSize = useResponsive();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items per view
  const getItemsPerView = () => {
    switch (screenSize) {
      case "mobile":
        return 1;
      case "tablet":
        return 2;
      case "desktop":
        return 3;
      default:
        return 3;
    }
  };

  const itemsPerView = getItemsPerView();
  const totalSlides = Math.max(0, properties.length - itemsPerView + 1);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused || totalSlides <= 1) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, nextSlide, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch/Swipe support
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-primary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured luxury properties carousel"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-6xl text-center text-text-primary mb-16 tracking-luxury"
        >
          Curated Collections.
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary/80 backdrop-blur-sm border border-accent-brand/30 rounded-full flex items-center justify-center text-accent-brand hover:bg-accent-brand hover:text-primary transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-brand/50"
                aria-label="Previous properties"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary/80 backdrop-blur-sm border border-accent-brand/30 rounded-full flex items-center justify-center text-accent-brand hover:bg-accent-brand hover:text-primary transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-brand/50"
                aria-label="Next properties"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `${-currentSlide * (100 / itemsPerView)}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              style={{
                width: `${(properties.length / itemsPerView) * 100}%`,
              }}
            >
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / properties.length}%` }}
                >
                  <div className="px-2">
                    <PropertyCard
                      image={property.image}
                      price={property.price}
                      location={property.location}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dot Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-brand/50 ${
                  index === currentSlide
                    ? "bg-accent-brand scale-110"
                    : "bg-text-primary/30 hover:bg-text-primary/50 hover:scale-105"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play Controls */}
        <div className="text-center mt-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="font-body text-text-primary/60 text-sm tracking-wide hover:text-accent-brand transition-colors focus:outline-none focus:ring-2 focus:ring-accent-brand/50 rounded px-2 py-1"
            aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
          >
            {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"} • Swipe or
            use arrows to navigate
          </button>
        </div>

        {/* Screen Reader Announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Showing properties {currentSlide + 1} to{" "}
          {Math.min(currentSlide + itemsPerView, properties.length)} of{" "}
          {properties.length}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedListings;
