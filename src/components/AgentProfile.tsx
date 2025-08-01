import { motion } from 'framer-motion';
import agentImage from '@/assets/agent-profile.jpg';

const AgentProfile = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-secondary"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Agent Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img 
                src={agentImage}
                alt="Luxury Real Estate Agent"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          {/* Agent Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <h3 className="font-heading text-4xl md:text-5xl text-text-secondary tracking-luxury">
              Your Guide to Luxury.
            </h3>
            
            <p className="font-body text-lg text-text-secondary/80 leading-relaxed">
              With over two decades of experience in ultra-luxury real estate, I specialize in 
              connecting discerning clients with exceptional properties. My commitment to white-glove 
              service and intimate knowledge of the most exclusive markets ensures a seamless journey 
              to your dream home.
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(176, 141, 87, 0.2)"
              }}
              className="bg-accent-brand text-text-secondary font-body px-10 py-4 text-lg tracking-wide transition-all duration-300 hover:bg-accent-brand/90"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AgentProfile;