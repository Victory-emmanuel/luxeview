import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedListings from "@/components/FeaturedListings";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AgentProfile from "@/components/AgentProfile";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <AnimatePresence>
      <Navigation />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <HeroSection />
        <AboutSection />
        <FeaturedListings />
        <ServicesSection />
        <TestimonialsSection />
        <AgentProfile />
        <ContactSection />
        <Footer />
      </motion.main>
    </AnimatePresence>
  );
};

export default HomePage;
