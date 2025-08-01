import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Property } from '@/types';
import { Button } from '@/components/ui/button';

interface PropertyListCardProps {
  property: Property;
  view: 'grid' | 'list';
}

const PropertyListCard = ({ property, view }: PropertyListCardProps) => {
  const statusColors = {
    available: 'bg-green-500',
    pending: 'bg-yellow-500',
    sold: 'bg-red-500'
  };

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.01 }}
        className="bg-primary border border-accent/20 rounded-lg overflow-hidden hover:border-accent/40 transition-all duration-300 group"
      >
        <div className="flex flex-col md:flex-row">
          {/* Property Image */}
          <div className="md:w-1/3 relative">
            <div 
              className="h-64 md:h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${property.image})` }}
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-body text-white uppercase tracking-wide ${statusColors[property.status || 'available']}`}>
                {property.status || 'Available'}
              </span>
            </div>
            <button className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Property Details */}
          <div className="md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading text-2xl text-text-primary mb-2 tracking-luxury">
                    {property.price}
                  </h3>
                  <div className="flex items-center text-text-primary/80 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="font-body">{property.location}</span>
                  </div>
                  {property.propertyType && (
                    <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-body uppercase tracking-wide">
                      {property.propertyType}
                    </span>
                  )}
                </div>
              </div>

              {property.description && (
                <p className="font-body text-text-primary/80 mb-4 line-clamp-2">
                  {property.description}
                </p>
              )}

              {/* Property Stats */}
              <div className="flex items-center space-x-6 mb-4">
                {property.bedrooms && (
                  <div className="flex items-center text-text-primary/70">
                    <Bed className="w-4 h-4 mr-2" />
                    <span className="font-body text-sm">{property.bedrooms} Beds</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center text-text-primary/70">
                    <Bath className="w-4 h-4 mr-2" />
                    <span className="font-body text-sm">{property.bathrooms} Baths</span>
                  </div>
                )}
                {property.sqft && (
                  <div className="flex items-center text-text-primary/70">
                    <Square className="w-4 h-4 mr-2" />
                    <span className="font-body text-sm">{property.sqft.toLocaleString()} sqft</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              {property.agent && (
                <div className="font-body text-text-primary/60 text-sm">
                  Listed by {property.agent}
                </div>
              )}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent/30 text-accent hover:bg-accent/20"
                >
                  Contact Agent
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-accent text-text-secondary hover:bg-accent/90"
                >
                  <Link to={`/property/${property.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.03,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      className="bg-primary border border-accent/20 rounded-lg overflow-hidden hover:border-accent/40 transition-all duration-300 group"
    >
      {/* Property Image */}
      <div className="relative h-64">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${property.image})` }}
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-body text-white uppercase tracking-wide ${statusColors[property.status || 'available']}`}>
            {property.status || 'Available'}
          </span>
        </div>
        <button className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors">
          <Heart className="w-5 h-5 text-white" />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-heading text-2xl text-text-primary mb-2 tracking-luxury">
            {property.price}
          </h3>
          <div className="flex items-center text-text-primary/80 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="font-body">{property.location}</span>
          </div>
          {property.propertyType && (
            <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-body uppercase tracking-wide">
              {property.propertyType}
            </span>
          )}
        </div>

        {/* Property Stats */}
        <div className="flex items-center justify-between mb-4 text-text-primary/70">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span className="font-body text-sm">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span className="font-body text-sm">{property.bathrooms}</span>
            </div>
          )}
          {property.sqft && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span className="font-body text-sm">{property.sqft.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {property.agent && (
            <div className="font-body text-text-primary/60 text-sm">
              Listed by {property.agent}
            </div>
          )}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-accent/30 text-accent hover:bg-accent/20"
            >
              Contact
            </Button>
            <Button
              asChild
              size="sm"
              className="flex-1 bg-accent text-text-secondary hover:bg-accent/90"
            >
              <Link to={`/property/${property.id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyListCard;
