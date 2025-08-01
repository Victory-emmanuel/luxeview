import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 bg-primary border-t border-accent-brand/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="font-heading text-2xl text-accent-brand tracking-luxury">
            LuxeView Elite
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-body">
            <span className="text-text-primary/60">
              © 2024 LuxeView Elite. All rights reserved.
            </span>
            
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-text-primary/60 hover:text-accent-brand transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-text-primary/60 hover:text-accent-brand transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 pt-4">
            <motion.a 
              href="#"
              whileHover={{ scale: 1.1, color: "hsl(var(--accent-brand))" }}
              className="text-text-primary/60 hover:text-accent-brand transition-colors duration-300"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
              </svg>
            </motion.a>
            
            <motion.a 
              href="#"
              whileHover={{ scale: 1.1, color: "hsl(var(--accent-brand))" }}
              className="text-text-primary/60 hover:text-accent-brand transition-colors duration-300"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;