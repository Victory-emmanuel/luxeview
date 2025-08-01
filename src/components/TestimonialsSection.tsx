import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  // Display first 3 testimonials for homepage
  const featuredTestimonials = testimonials.slice(0, 3);

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
              Client Testimonials
            </h2>
            <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
            <p className="font-body text-xl text-text-secondary/80 max-w-3xl mx-auto leading-relaxed">
              Hear from our satisfied clients about their luxury real estate experience
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 25 }
                }}
                className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:border-accent/40 transition-all duration-300"
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="w-5 h-5 text-accent fill-current"
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="font-body text-text-secondary/90 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Client Info */}
                <div className="border-t border-accent/20 pt-6">
                  <div className="font-heading text-lg text-text-secondary mb-1">
                    {testimonial.name}
                  </div>
                  <div className="font-body text-sm text-text-secondary/70 mb-2">
                    {testimonial.location}
                  </div>
                  {testimonial.propertyPurchased && (
                    <div className="font-body text-xs text-accent uppercase tracking-wide">
                      {testimonial.propertyPurchased}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overall Rating Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-lg p-8 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="w-6 h-6 text-accent fill-current mx-1"
                  />
                ))}
              </div>
              <div className="font-heading text-3xl text-text-secondary mb-2">
                5.0 / 5.0
              </div>
              <div className="font-body text-text-secondary/80 text-sm">
                Based on {testimonials.length}+ client reviews
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="font-body text-text-secondary/60 mb-6">
              Join our family of satisfied clients
            </p>
            <motion.button
              whileHover={{ 
                backgroundColor: "hsl(var(--accent))",
                color: "hsl(var(--text-secondary))",
                scale: 1.02
              }}
              className="font-body text-accent border border-accent bg-transparent px-12 py-4 text-lg tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
