import { motion } from 'framer-motion';

interface PropertyCardProps {
  image: string;
  price: string;
  location: string;
}

const PropertyCard = ({ image, price, location }: PropertyCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      className="relative w-80 h-96 flex-shrink-0 mx-4 cursor-pointer group"
    >
      {/* Property Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg group-hover:from-black/80 transition-all duration-300" />
      
      {/* Property Details */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="font-heading text-2xl mb-2 text-text-primary">
          {price}
        </div>
        <div className="font-body text-sm text-text-primary/80 mb-3">
          {location}
        </div>
        <div className="font-body text-xs text-accent-brand uppercase tracking-wide hover:text-accent-brand/80 transition-colors">
          View Details →
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;