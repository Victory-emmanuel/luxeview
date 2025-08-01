import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyFilterProps {
  onFilterChange: (filters: any) => void;
  onViewChange: (view: 'grid' | 'list') => void;
  currentView: 'grid' | 'list';
}

const PropertyFilter = ({ onFilterChange, onViewChange, currentView }: PropertyFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    status: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange({ ...newFilters, searchTerm });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ ...filters, searchTerm: value });
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
      status: ''
    };
    setFilters(clearedFilters);
    setSearchTerm('');
    onFilterChange({ ...clearedFilters, searchTerm: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-primary border border-accent/20 rounded-lg p-6 mb-8"
    >
      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search properties by location, type, or features..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-transparent border-accent/30 text-text-primary placeholder:text-text-primary/60 focus:border-accent"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={currentView === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('grid')}
            className={currentView === 'grid' 
              ? 'bg-accent text-text-secondary hover:bg-accent/90' 
              : 'border-accent/30 text-text-primary hover:bg-accent/20'
            }
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={currentView === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('list')}
            className={currentView === 'list' 
              ? 'bg-accent text-text-secondary hover:bg-accent/90' 
              : 'border-accent/30 text-text-primary hover:bg-accent/20'
            }
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-accent/30 text-text-primary hover:bg-accent/20"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-accent/20 pt-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Price Range */}
            <div>
              <label className="font-body text-text-primary/80 text-sm mb-2 block">
                Price Range
              </label>
              <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                <SelectTrigger className="bg-transparent border-accent/30 text-text-primary">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5000000">Under $5M</SelectItem>
                  <SelectItem value="5000000-10000000">$5M - $10M</SelectItem>
                  <SelectItem value="10000000-20000000">$10M - $20M</SelectItem>
                  <SelectItem value="20000000+">$20M+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div>
              <label className="font-body text-text-primary/80 text-sm mb-2 block">
                Property Type
              </label>
              <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
                <SelectTrigger className="bg-transparent border-accent/30 text-text-primary">
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="estate">Estate</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="font-body text-text-primary/80 text-sm mb-2 block">
                Bedrooms
              </label>
              <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                <SelectTrigger className="bg-transparent border-accent/30 text-text-primary">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1+">1+</SelectItem>
                  <SelectItem value="2+">2+</SelectItem>
                  <SelectItem value="3+">3+</SelectItem>
                  <SelectItem value="4+">4+</SelectItem>
                  <SelectItem value="5+">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="font-body text-text-primary/80 text-sm mb-2 block">
                Bathrooms
              </label>
              <Select value={filters.bathrooms} onValueChange={(value) => handleFilterChange('bathrooms', value)}>
                <SelectTrigger className="bg-transparent border-accent/30 text-text-primary">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1+">1+</SelectItem>
                  <SelectItem value="2+">2+</SelectItem>
                  <SelectItem value="3+">3+</SelectItem>
                  <SelectItem value="4+">4+</SelectItem>
                  <SelectItem value="5+">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <label className="font-body text-text-primary/80 text-sm mb-2 block">
                Location
              </label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger className="bg-transparent border-accent/30 text-text-primary">
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="colorado">Colorado</SelectItem>
                  <SelectItem value="florida">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <label className="font-body text-text-primary/80 text-sm mb-2 block">
                Status
              </label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="bg-transparent border-accent/30 text-text-primary">
                  <SelectValue placeholder="Any Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-accent/30 text-text-primary hover:bg-accent/20"
            >
              Clear All Filters
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PropertyFilter;
