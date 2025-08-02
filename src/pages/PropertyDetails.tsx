import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Heart,
  Share2,
  Phone,
  Mail,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  Trees,
  Waves,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { properties } from "@/data/properties";
import { companyInfo } from "@/data/company";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-text-primary mb-4">
            Property Not Found
          </h1>
          <Link to="/properties" className="text-accent hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Use property's images array or fallback to main image
  const galleryImages = property.images || [property.image];

  // Related properties (exclude current property)
  const relatedProperties = properties
    .filter((p) => p.id !== Number(id))
    .slice(0, 3);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Handle form submission
  };

  const amenityIcons: { [key: string]: any } = {
    "Private Pool": Waves,
    "Home Gym": Dumbbell,
    "Smart Home": Wifi,
    "Security System": Shield,
    Garage: Car,
    Garden: Trees,
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />

      {/* Property Gallery */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <PropertyGallery images={galleryImages} title={property.location} />
        </div>
      </section>

      {/* Property Details */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h1 className="font-heading text-4xl md:text-5xl text-text-primary">
                    {property.price}
                  </h1>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="icon">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center text-text-primary/80 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-body text-lg">{property.location}</span>
                </div>
                <div className="flex flex-wrap gap-6 text-text-primary/80">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="w-5 h-5 mr-2" />
                      <span>{property.bedrooms} Bedrooms</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="w-5 h-5 mr-2" />
                      <span>{property.bathrooms} Bathrooms</span>
                    </div>
                  )}
                  {property.sqft && (
                    <div className="flex items-center">
                      <Square className="w-5 h-5 mr-2" />
                      <span>{property.sqft.toLocaleString()} sq ft</span>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Built {property.yearBuilt}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="font-heading text-2xl text-text-primary mb-4">
                  Description
                </h2>
                <p className="font-body text-text-primary/80 leading-relaxed">
                  {property.description}
                </p>
              </motion.div>

              {/* Features */}
              {property.features && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="font-heading text-2xl text-text-primary mb-4">
                    Features & Amenities
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => {
                      const IconComponent = amenityIcons[feature];
                      return (
                        <div
                          key={index}
                          className="flex items-center text-text-primary/80"
                        >
                          {IconComponent ? (
                            <IconComponent className="w-5 h-5 mr-3 text-accent" />
                          ) : (
                            <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2" />
                          )}
                          <span>{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Property Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="font-heading text-2xl text-text-primary mb-4">
                  Property Details
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-primary/60">
                        Property Type
                      </span>
                      <span className="text-text-primary capitalize">
                        {property.propertyType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-primary/60">Year Built</span>
                      <span className="text-text-primary">
                        {property.yearBuilt}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-primary/60">Lot Size</span>
                      <span className="text-text-primary">
                        {property.lotSize}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-primary/60">Status</span>
                      <span className="text-text-primary capitalize">
                        {property.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-primary/60">Listing Type</span>
                      <span className="text-text-primary capitalize">
                        For {property.type}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-secondary/5 border border-accent/20 rounded-lg p-6 mb-8"
              >
                <h3 className="font-heading text-xl text-text-primary mb-4">
                  Contact Agent
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Phone Number"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full p-3 bg-primary border border-accent/20 rounded-md text-text-primary placeholder:text-text-primary/50 focus:border-accent outline-none"
                    rows={4}
                    placeholder="Message"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
                <div className="mt-6 pt-6 border-t border-accent/20">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Agent Info */}
              {property.agent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-secondary/5 border border-accent/20 rounded-lg p-6"
                >
                  <h3 className="font-heading text-xl text-text-primary mb-4">
                    Listing Agent
                  </h3>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-accent/20 rounded-full mx-auto mb-4"></div>
                    <h4 className="font-heading text-lg text-text-primary">
                      {property.agent}
                    </h4>
                    <p className="text-text-primary/60 text-sm">
                      Luxury Property Specialist
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="py-16 bg-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl text-text-primary mb-4">
                Similar Properties
              </h2>
              <div className="w-24 h-0.5 bg-accent mx-auto"></div>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((relatedProperty, index) => (
                <motion.div
                  key={relatedProperty.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/property/${relatedProperty.id}`}>
                    <PropertyCard
                      image={relatedProperty.image}
                      price={relatedProperty.price}
                      location={relatedProperty.location}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default PropertyDetails;
