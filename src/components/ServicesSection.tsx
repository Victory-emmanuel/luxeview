import { motion } from 'framer-motion';
import { services } from '@/data/services';

const ServicesSection = () => {
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
              Our Services
            </h2>
            <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
            <p className="font-body text-xl text-text-primary/80 max-w-3xl mx-auto leading-relaxed">
              Comprehensive luxury real estate services tailored to your unique needs
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 25 }
                }}
                className="bg-primary border border-accent/20 rounded-lg p-8 hover:border-accent/40 transition-all duration-300 group"
              >
                {/* Service Icon */}
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-2xl text-text-primary mb-4 tracking-luxury">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="font-body text-text-primary/80 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Features */}
                <ul className="space-y-2">
                  {service.features.slice(0, 4).map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="font-body text-sm text-text-primary/70 flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <motion.div
                  className="mt-6 pt-6 border-t border-accent/20"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <span className="font-body text-accent text-sm uppercase tracking-wide cursor-pointer hover:text-accent/80 transition-colors">
                    Learn More →
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="font-body text-text-primary/60 mb-8">
              Ready to experience luxury real estate at its finest?
            </p>
            <motion.button
              whileHover={{ 
                backgroundColor: "hsl(var(--accent))",
                color: "hsl(var(--text-secondary))",
                scale: 1.02
              }}
              className="font-body text-accent border border-accent bg-transparent px-12 py-4 text-lg tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              Schedule Consultation
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
