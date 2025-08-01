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
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Find the property by ID
  const property = properties.find((p) => p.id === parseInt(id || "0"));

  if (!property) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-text-primary mb-4">
            Property Not Found
          </h1>
          <Link to="/properties" className="text-accent hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Mock additional images for gallery
  const galleryImages = [
    property.image,
    "/assets/property-2.jpg",
    "/assets/property-3.jpg",
    "/assets/property-4.jpg",
    "/assets/property-5.jpg",
  ];

  // Related properties (exclude current property)
  const relatedProperties = properties.filter((p) => p.id !== id).slice(0, 3);

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

      <div className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-2 text-text-primary/60 font-body text-sm">
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  to="/properties"
                  className="hover:text-accent transition-colors"
                >
                  Properties
                </Link>
                <span>/</span>
                <span className="text-text-primary">{property.location}</span>
              </div>
            </motion.nav>

            {/* Property Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
            >
              <div>
                <h1 className="font-heading text-4xl md:text-5xl text-text-primary mb-4 tracking-luxury">
                  {property.price}
                </h1>
                <div className="flex items-center text-text-primary/80 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-body text-lg">{property.location}</span>
                </div>
                <div className="flex items-center space-x-6 text-text-primary/70">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="w-5 h-5 mr-2" />
                      <span className="font-body">
                        {property.bedrooms} Bedrooms
                      </span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="w-5 h-5 mr-2" />
                      <span className="font-body">
                        {property.bathrooms} Bathrooms
                      </span>
                    </div>
                  )}
                  {property.sqft && (
                    <div className="flex items-center">
                      <Square className="w-5 h-5 mr-2" />
                      <span className="font-body">
                        {property.sqft.toLocaleString()} sqft
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent/30 text-accent hover:bg-accent/20"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent/30 text-accent hover:bg-accent/20"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <PropertyGallery
                    images={galleryImages}
                    title={property.location}
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="font-heading text-3xl text-text-primary mb-6 tracking-luxury">
                    Property Description
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="font-body text-text-primary/80 leading-relaxed mb-6">
                      {property.description ||
                        `Experience luxury living at its finest in this exceptional ${
                          property.propertyType?.toLowerCase() || "property"
                        } located in the prestigious ${
                          property.location
                        }. This stunning residence offers an unparalleled combination of elegance, comfort, and modern sophistication.`}
                    </p>
                    <p className="font-body text-text-primary/80 leading-relaxed">
                      Featuring meticulously designed interiors with premium
                      finishes throughout, this property represents the pinnacle
                      of luxury real estate. Every detail has been carefully
                      considered to create a living experience that exceeds
                      expectations.
                    </p>
                  </div>
                </motion.div>

                {/* Features & Amenities */}
                {property.features && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h2 className="font-heading text-3xl text-text-primary mb-6 tracking-luxury">
                      Features & Amenities
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {property.features.map((feature, index) => {
                        const IconComponent = amenityIcons[feature] || Shield;
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-4 bg-primary border border-accent/20 rounded-lg"
                          >
                            <IconComponent className="w-5 h-5 text-accent flex-shrink-0" />
                            <span className="font-body text-text-primary">
                              {feature}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-primary border border-accent/20 rounded-lg p-6 sticky top-32"
                >
                  <h3 className="font-heading text-2xl text-text-primary mb-6 tracking-luxury">
                    Contact Agent
                  </h3>

                  {/* Agent Info */}
                  {property.agent && (
                    <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                      <div className="font-body text-text-primary font-semibold mb-1">
                        {property.agent}
                      </div>
                      <div className="font-body text-text-primary/60 text-sm mb-3">
                        Luxury Real Estate Specialist
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-text-primary/70">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="font-body text-sm">
                            {companyInfo.contact.phone}
                          </span>
                        </div>
                        <div className="flex items-center text-text-primary/70">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="font-body text-sm">
                            {companyInfo.contact.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        className="bg-transparent border-accent/30 text-text-primary placeholder:text-text-primary/60 focus:border-accent"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        className="bg-transparent border-accent/30 text-text-primary placeholder:text-text-primary/60 focus:border-accent"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            phone: e.target.value,
                          })
                        }
                        className="bg-transparent border-accent/30 text-text-primary placeholder:text-text-primary/60 focus:border-accent"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Message"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        className="w-full bg-transparent border border-accent/30 rounded-lg px-3 py-2 text-text-primary placeholder:text-text-primary/60 focus:border-accent focus:outline-none resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-accent text-text-secondary hover:bg-accent/90"
                    >
                      Send Message
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>

            {/* Related Properties */}
            {relatedProperties.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-24"
              >
                <h2 className="font-heading text-4xl text-text-primary mb-12 text-center tracking-luxury">
                  Similar Properties
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedProperties.map((relatedProperty, index) => (
                    <motion.div
                      key={relatedProperty.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    >
                      <PropertyCard property={relatedProperty} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
