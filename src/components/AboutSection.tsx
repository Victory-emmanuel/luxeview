import { motion } from 'framer-motion';
import { companyInfo } from '@/data/company';

const AboutSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-secondary"
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
            <h2 className="font-heading text-5xl md:text-6xl text-text-secondary mb-6 tracking-luxury">
              About LuxeView Elite
            </h2>
            <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
            <p className="font-body text-xl text-text-secondary/80 max-w-3xl mx-auto leading-relaxed">
              {companyInfo.description}
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-heading text-3xl text-text-secondary mb-4 tracking-luxury">
                  Our Mission
                </h3>
                <p className="font-body text-lg text-text-secondary/80 leading-relaxed">
                  {companyInfo.mission}
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-3xl text-text-secondary mb-4 tracking-luxury">
                  Our Vision
                </h3>
                <p className="font-body text-lg text-text-secondary/80 leading-relaxed">
                  {companyInfo.vision}
                </p>
              </div>
            </motion.div>

            {/* Stats & Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="font-heading text-4xl text-accent mb-2">
                    {new Date().getFullYear() - parseInt(companyInfo.founded)}+
                  </div>
                  <div className="font-body text-text-secondary/80 uppercase tracking-wide text-sm">
                    Years of Excellence
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="font-heading text-4xl text-accent mb-2">
                    $2.5B+
                  </div>
                  <div className="font-body text-text-secondary/80 uppercase tracking-wide text-sm">
                    Properties Sold
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="font-heading text-4xl text-accent mb-2">
                    500+
                  </div>
                  <div className="font-body text-text-secondary/80 uppercase tracking-wide text-sm">
                    Satisfied Clients
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="font-heading text-4xl text-accent mb-2">
                    98%
                  </div>
                  <div className="font-body text-text-secondary/80 uppercase tracking-wide text-sm">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              <div className="bg-text-secondary/5 p-8 rounded-lg">
                <h4 className="font-heading text-xl text-text-secondary mb-4">
                  Founded in {companyInfo.founded}
                </h4>
                <p className="font-body text-text-secondary/80 leading-relaxed">
                  LuxeView Elite was established with a vision to redefine luxury real estate. 
                  Our commitment to excellence and personalized service has made us the trusted 
                  choice for discerning clients worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
