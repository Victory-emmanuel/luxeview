import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types";
import { getProperties } from "@/lib/propertyService";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const FeaturedListings = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Load featured properties from Firebase
  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        setLoading(true);
        // Get the first 6 available properties as featured
        const { properties: fetchedProperties } = await getProperties(
          { status: "available" },
          6
        );
        setProperties(fetchedProperties || []);
      } catch (error) {
        console.error("Error loading featured properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProperties();
  }, []);

  const autoplayPlugin = Autoplay({
    delay: 6000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const toggleAutoplay = () => {
    if (!api) return;

    if (isAutoPlaying) {
      autoplayPlugin.stop();
    } else {
      autoplayPlugin.play();
    }
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-primary"
      aria-label="Featured luxury properties carousel"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-6xl text-center text-text-primary mb-16 tracking-luxury"
        >
          Curated Collections.
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={isAutoPlaying ? [autoplayPlugin] : []}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem
                    key={`loading-${index}`}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <div className="relative h-96 rounded-lg overflow-hidden bg-accent/10 animate-pulse">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="h-8 bg-accent/20 rounded mb-2"></div>
                          <div className="h-4 bg-accent/20 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : properties.length > 0 ? (
                properties.map((property) => {
                  const formatPrice = (price: number) => {
                    return new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      minimumFractionDigits: 0,
                    }).format(price);
                  };

                  const propertyImage =
                    property.images && property.images.length > 0
                      ? property.images[0]
                      : property.image ||
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800";

                  return (
                    <CarouselItem
                      key={property.id}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <Link to={`/property/${property.id}`}>
                          <motion.div
                            whileHover={{
                              scale: 1.02,
                              transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                              },
                            }}
                            className="relative h-96 rounded-lg overflow-hidden group cursor-pointer"
                          >
                            {/* Property Image */}
                            <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${propertyImage})`,
                              }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Status Badge */}
                            {property.status &&
                              property.status !== "available" && (
                                <div className="absolute top-4 left-4">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-body text-white uppercase tracking-wide ${
                                      property.status === "pending"
                                        ? "bg-yellow-600"
                                        : property.status === "sold"
                                        ? "bg-red-600"
                                        : "bg-green-600"
                                    }`}
                                  >
                                    {property.status}
                                  </span>
                                </div>
                              )}

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                              >
                                <h3 className="font-heading text-2xl md:text-3xl mb-2 tracking-luxury">
                                  {formatPrice(property.price)}
                                </h3>
                                <p className="font-body text-white/90 mb-4">
                                  {property.location}
                                </p>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <span className="inline-flex items-center font-body text-sm text-accent-brand uppercase tracking-wide">
                                    View Details →
                                  </span>
                                </div>
                              </motion.div>
                            </div>
                          </motion.div>
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })
              ) : (
                // No properties found
                <CarouselItem className="pl-2 md:pl-4 basis-full">
                  <div className="p-1">
                    <div className="relative h-96 rounded-lg overflow-hidden bg-accent/10 flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-body text-text-primary/70 mb-2">
                          No featured properties available
                        </p>
                        <p className="font-body text-text-primary/50 text-sm">
                          Check back soon for new listings
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            {/* Navigation Arrows - Hidden on mobile */}
            <CarouselPrevious className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/80 backdrop-blur-sm border border-accent-brand/30 text-accent-brand hover:bg-accent-brand hover:text-primary transition-all duration-300 hover:scale-110" />
            <CarouselNext className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/80 backdrop-blur-sm border border-accent-brand/30 text-accent-brand hover:bg-accent-brand hover:text-primary transition-all duration-300 hover:scale-110" />
          </Carousel>

          {/* Dot Indicators */}
          {count > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-brand/50 ${
                    index === current - 1
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
              onClick={toggleAutoplay}
              className="font-body text-text-primary/60 text-sm tracking-wide hover:text-accent-brand transition-colors focus:outline-none focus:ring-2 focus:ring-accent-brand/50 rounded px-2 py-1"
              aria-label={
                isAutoPlaying ? "Pause auto-play" : "Resume auto-play"
              }
            >
              {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"} • Swipe
              or use arrows to navigate
            </button>
          </div>

          {/* Screen Reader Announcements */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Showing slide {current} of {count}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedListings;
