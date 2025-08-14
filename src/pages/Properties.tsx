import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import PropertyFilter from "@/components/PropertyFilter";
import PropertyListCard from "@/components/PropertyListCard";
import Footer from "@/components/Footer";
import { Property } from "@/types";
import { getProperties } from "@/lib/propertyService";

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    searchTerm: "",
    priceRange: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    status: "",
  });
  const [sortBy, setSortBy] = useState("price-desc");

  // Load properties from Firebase
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const { properties: fetchedProperties } = await getProperties({}, 50);
        setProperties(fetchedProperties || []);
      } catch (error) {
        console.error("Error loading properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.location.toLowerCase().includes(searchLower) ||
          property.propertyType?.toLowerCase().includes(searchLower) ||
          property.features?.some((feature) =>
            feature.toLowerCase().includes(searchLower)
          )
      );
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(
        (property) => property.propertyType === filters.propertyType
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(
        (property) => property.status === filters.status
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      const minBedrooms = parseInt(filters.bedrooms.replace("+", ""));
      filtered = filtered.filter(
        (property) => property.bedrooms && property.bedrooms >= minBedrooms
      );
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      const minBathrooms = parseInt(filters.bathrooms.replace("+", ""));
      filtered = filtered.filter(
        (property) => property.bathrooms && property.bathrooms >= minBathrooms
      );
    }

    // Price range filter
    if (filters.priceRange) {
      if (filters.priceRange === "0-5000000") {
        filtered = filtered.filter((property) => {
          const price = parseFloat(property.price.replace(/[$,]/g, ""));
          return price < 5000000;
        });
      } else if (filters.priceRange === "5000000-10000000") {
        filtered = filtered.filter((property) => {
          const price = parseFloat(property.price.replace(/[$,]/g, ""));
          return price >= 5000000 && price < 10000000;
        });
      } else if (filters.priceRange === "10000000-20000000") {
        filtered = filtered.filter((property) => {
          const price = parseFloat(property.price.replace(/[$,]/g, ""));
          return price >= 10000000 && price < 20000000;
        });
      } else if (filters.priceRange === "20000000+") {
        filtered = filtered.filter((property) => {
          const price = parseFloat(property.price.replace(/[$,]/g, ""));
          return price >= 20000000;
        });
      }
    }

    // Sort properties
    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[$,]/g, ""));
      const priceB = parseFloat(b.price.replace(/[$,]/g, ""));

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "bedrooms-desc":
          return (b.bedrooms || 0) - (a.bedrooms || 0);
        case "sqft-desc":
          return (b.sqft || 0) - (a.sqft || 0);
        default:
          return priceB - priceA;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />

      {/* Page Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 bg-primary"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl text-text-primary mb-6 tracking-luxury">
              Luxury Properties
            </h1>
            <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
            <p className="font-body text-xl text-text-primary/80 leading-relaxed">
              Discover our curated collection of extraordinary properties in the
              world's most prestigious locations
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <PropertyFilter
              onFilterChange={setFilters}
              onViewChange={setCurrentView}
              currentView={currentView}
            />

            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            >
              <div className="mb-4 md:mb-0">
                <h2 className="font-heading text-2xl text-text-primary mb-2">
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="font-body text-text-primary/60">
                  Showing luxury properties matching your criteria
                </p>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <span className="font-body text-text-primary/80 text-sm">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border border-accent/30 rounded-lg px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                >
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="bedrooms-desc">Most Bedrooms</option>
                  <option value="sqft-desc">Largest Size</option>
                </select>
              </div>
            </motion.div>

            {/* Properties Grid/List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  currentView === "grid"
                    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                }
              >
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <PropertyListCard property={property} view={currentView} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredProperties.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <h3 className="font-heading text-2xl text-text-primary mb-4">
                  No Properties Found
                </h3>
                <p className="font-body text-text-primary/60 mb-8">
                  Try adjusting your search criteria to find more properties
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      searchTerm: "",
                      priceRange: "",
                      propertyType: "",
                      bedrooms: "",
                      bathrooms: "",
                      location: "",
                      status: "",
                    })
                  }
                  className="font-body text-accent border border-accent bg-transparent px-8 py-3 tracking-wide transition-all duration-300 hover:bg-accent hover:text-text-secondary"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
