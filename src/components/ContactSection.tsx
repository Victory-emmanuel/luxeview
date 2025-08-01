import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { companyInfo } from '@/data/company';

const ContactSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-primary"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-text-primary mb-6 tracking-luxury">
              Get In Touch
            </h2>
            <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
            <p className="font-body text-xl text-text-primary/80 max-w-3xl mx-auto leading-relaxed">
              Ready to begin your luxury real estate journey? Contact our expert team today.
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-heading text-3xl text-text-primary mb-8 tracking-luxury">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Phone */}
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

                  {/* Email */}
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

                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-body text-text-primary/60 text-sm uppercase tracking-wide mb-1">
                        Address
                      </div>
                      <div className="font-body text-text-primary text-lg">
                        {companyInfo.contact.address}
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-body text-text-primary/60 text-sm uppercase tracking-wide mb-1">
                        Hours
                      </div>
                      <div className="font-body text-text-primary text-lg whitespace-pre-line">
                        {companyInfo.contact.hours}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-heading text-xl text-text-primary mb-4 tracking-luxury">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {companyInfo.contact.socialMedia?.instagram && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-accent/20 p-3 rounded-lg cursor-pointer hover:bg-accent/30 transition-colors"
                    >
                      <span className="font-body text-accent text-sm">IG</span>
                    </motion.div>
                  )}
                  {companyInfo.contact.socialMedia?.linkedin && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-accent/20 p-3 rounded-lg cursor-pointer hover:bg-accent/30 transition-colors"
                    >
                      <span className="font-body text-accent text-sm">LI</span>
                    </motion.div>
                  )}
                  {companyInfo.contact.socialMedia?.facebook && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-accent/20 p-3 rounded-lg cursor-pointer hover:bg-accent/30 transition-colors"
                    >
                      <span className="font-body text-accent text-sm">FB</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Quick Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-primary border border-accent/20 rounded-lg p-8"
            >
              <h3 className="font-heading text-3xl text-text-primary mb-8 tracking-luxury">
                Quick Contact
              </h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-accent/30 rounded-lg px-4 py-3 text-text-primary focus:border-accent focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-accent/30 rounded-lg px-4 py-3 text-text-primary focus:border-accent focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border border-accent/30 rounded-lg px-4 py-3 text-text-primary focus:border-accent focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border border-accent/30 rounded-lg px-4 py-3 text-text-primary focus:border-accent focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="font-body text-text-primary/80 text-sm uppercase tracking-wide mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border border-accent/30 rounded-lg px-4 py-3 text-text-primary focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your luxury real estate needs..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ 
                    backgroundColor: "hsl(var(--accent))",
                    color: "hsl(var(--text-secondary))",
                    scale: 1.02
                  }}
                  className="w-full font-body text-accent border border-accent bg-transparent py-4 text-lg tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
