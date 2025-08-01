import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';

const Services = () => {
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
              Our Services
            </h1>
            <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
            <p className="font-body text-xl text-text-primary/80 leading-relaxed">
              Comprehensive luxury real estate services tailored to meet your unique needs and exceed your expectations
            </p>
          </div>
        </div>
      </motion.section>

      {/* Services Overview */}
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
                Excellence in Every Service
              </h2>
              <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
              <p className="font-body text-xl text-text-secondary/80 max-w-3xl mx-auto leading-relaxed">
                From property acquisition to investment management, we provide end-to-end luxury real estate solutions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:border-accent/40 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-heading text-2xl text-text-secondary mb-4 tracking-luxury">
                    {service.title}
                  </h3>
                  <p className="font-body text-text-secondary/80 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <motion.div
                    className="flex items-center text-accent cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <span className="font-body text-sm uppercase tracking-wide mr-2">
                      Learn More
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          className={`py-24 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={index % 2 === 1 ? 'lg:col-start-2' : ''}
                >
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h2 className={`font-heading text-4xl mb-6 tracking-luxury ${
                    index % 2 === 0 ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {service.title}
                  </h2>
                  <p className={`font-body text-lg leading-relaxed mb-8 ${
                    index % 2 === 0 ? 'text-text-primary/80' : 'text-text-secondary/80'
                  }`}>
                    {service.detailedDescription || service.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" />
                        <span className={`font-body ${
                          index % 2 === 0 ? 'text-text-primary/80' : 'text-text-secondary/80'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-text-secondary"
                  >
                    Schedule Consultation
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={index % 2 === 1 ? 'lg:col-start-1' : ''}
                >
                  <div className={`rounded-lg p-8 ${
                    index % 2 === 0 
                      ? 'bg-secondary border border-accent/20' 
                      : 'bg-primary border border-accent/20'
                  }`}>
                    <h3 className={`font-heading text-2xl mb-6 tracking-luxury ${
                      index % 2 === 0 ? 'text-text-secondary' : 'text-text-primary'
                    }`}>
                      What's Included
                    </h3>
                    <div className="space-y-3">
                      {service.features.slice(0, 6).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                          <span className={`font-body text-sm ${
                            index % 2 === 0 ? 'text-text-secondary/80' : 'text-text-primary/80'
                          }`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-6 tracking-luxury">
                Our Process
              </h2>
              <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
              <p className="font-body text-xl text-text-primary/80 max-w-3xl mx-auto leading-relaxed">
                A streamlined approach to luxury real estate that ensures exceptional results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Initial Consultation',
                  description: 'Understanding your unique needs and preferences'
                },
                {
                  step: '02',
                  title: 'Market Analysis',
                  description: 'Comprehensive research and property evaluation'
                },
                {
                  step: '03',
                  title: 'Strategic Planning',
                  description: 'Customized approach tailored to your goals'
                },
                {
                  step: '04',
                  title: 'Execution & Support',
                  description: 'Seamless transaction management and ongoing service'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="font-heading text-xl text-accent">{step.step}</span>
                  </div>
                  <h3 className="font-heading text-xl text-text-primary mb-4 tracking-luxury">
                    {step.title}
                  </h3>
                  <p className="font-body text-text-primary/80 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-text-secondary mb-6 tracking-luxury">
                Ready to Get Started?
              </h2>
              <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
              <p className="font-body text-xl text-text-secondary/80 mb-12 leading-relaxed">
                Experience the difference that exceptional service and expertise can make in your luxury real estate journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-accent text-text-secondary hover:bg-accent/90 px-8 py-4 text-lg"
                >
                  Schedule Consultation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-text-secondary px-8 py-4 text-lg"
                >
                  View Properties
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
