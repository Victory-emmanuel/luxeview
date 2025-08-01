import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { companyInfo } from '@/data/company';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyInterest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const offices = [
    {
      name: 'Manhattan Office',
      address: '432 Park Avenue, Suite 1500\nNew York, NY 10016',
      phone: '+1 (212) 555-0123',
      email: 'manhattan@luxeviewelite.com'
    },
    {
      name: 'Beverly Hills Office',
      address: '9200 Sunset Boulevard, Suite 800\nBeverly Hills, CA 90210',
      phone: '+1 (310) 555-0456',
      email: 'beverlyhills@luxeviewelite.com'
    },
    {
      name: 'Miami Office',
      address: '1450 Brickell Avenue, Suite 2000\nMiami, FL 33131',
      phone: '+1 (305) 555-0789',
      email: 'miami@luxeviewelite.com'
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 bg-primary"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl text-text-primary mb-6 tracking-luxury">
              Contact Us
            </h1>
            <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
            <p className="font-body text-xl text-text-primary/80 leading-relaxed">
              Ready to begin your luxury real estate journey? Our expert team is here to assist you every step of the way.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-3xl text-text-primary mb-8 tracking-luxury">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        value={contactForm.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="bg-transparent border-accent/30 text-text-primary focus:border-accent"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        value={contactForm.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="bg-transparent border-accent/30 text-text-primary focus:border-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-transparent border-accent/30 text-text-primary focus:border-accent"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-transparent border-accent/30 text-text-primary focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                      Subject *
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full bg-transparent border border-accent/30 rounded-lg px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="investment">Investment Opportunities</option>
                      <option value="consultation">Schedule Consultation</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                      Property Interest
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Manhattan Penthouse, Beverly Hills Estate"
                      value={contactForm.propertyInterest}
                      onChange={(e) => handleInputChange('propertyInterest', e.target.value)}
                      className="bg-transparent border-accent/30 text-text-primary focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full bg-transparent border border-accent/30 rounded-lg px-3 py-2 text-text-primary focus:border-accent focus:outline-none resize-none"
                      placeholder="Tell us about your luxury real estate needs..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent text-text-secondary hover:bg-accent/90 py-4 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-heading text-3xl text-text-primary mb-8 tracking-luxury">
                    Get In Touch
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Main Contact */}
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/20 p-3 rounded-lg">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-body text-text-primary/60 text-sm uppercase tracking-wide mb-1">
                          Phone
                        </div>
                        <div className="font-body text-text-primary text-lg">
                          {companyInfo.contact.phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/20 p-3 rounded-lg">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-body text-text-primary/60 text-sm uppercase tracking-wide mb-1">
                          Email
                        </div>
                        <div className="font-body text-text-primary text-lg">
                          {companyInfo.contact.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/20 p-3 rounded-lg">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-body text-text-primary/60 text-sm uppercase tracking-wide mb-1">
                          Headquarters
                        </div>
                        <div className="font-body text-text-primary text-lg whitespace-pre-line">
                          {companyInfo.contact.address}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/20 p-3 rounded-lg">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-body text-text-primary/60 text-sm uppercase tracking-wide mb-1">
                          Business Hours
                        </div>
                        <div className="font-body text-text-primary text-lg whitespace-pre-line">
                          {companyInfo.contact.hours}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Response Promise */}
                <div className="bg-primary border border-accent/20 rounded-lg p-6">
                  <h3 className="font-heading text-xl text-text-primary mb-4 tracking-luxury">
                    Quick Response Guarantee
                  </h3>
                  <p className="font-body text-text-primary/80 leading-relaxed mb-4">
                    We understand that luxury real estate decisions are time-sensitive. Our team commits to responding to all inquiries within 2 hours during business hours.
                  </p>
                  <div className="flex items-center text-accent">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-body text-sm">Average response time: 45 minutes</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-text-secondary mb-6 tracking-luxury">
                Our Offices
              </h2>
              <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
              <p className="font-body text-xl text-text-secondary/80 max-w-3xl mx-auto leading-relaxed">
                Visit us at any of our prestigious locations across the country
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/40 transition-all duration-300"
                >
                  <h3 className="font-heading text-xl text-text-secondary mb-4 tracking-luxury">
                    {office.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-accent mt-1 mr-3 flex-shrink-0" />
                      <span className="font-body text-text-secondary/80 text-sm whitespace-pre-line">
                        {office.address}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-accent mr-3" />
                      <span className="font-body text-text-secondary/80 text-sm">
                        {office.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-accent mr-3" />
                      <span className="font-body text-text-secondary/80 text-sm">
                        {office.email}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
