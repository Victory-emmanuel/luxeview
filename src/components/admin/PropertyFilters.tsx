import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PropertyFilters, PropertyType, PurchaseType, PropertyStatus } from '@/types';

interface PropertyFiltersProps {
  searchTerm: string;
  filters: PropertyFilters;
  onSearchChange: (value: string) => void;
  onFiltersChange: (filters: PropertyFilters) => void;
}

const PropertyFiltersComponent: React.FC<PropertyFiltersProps> = ({
  searchTerm,
  filters,
  onSearchChange,
  onFiltersChange,
}) => {
  const handlePropertyTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      propertyType: value === 'all' ? undefined : (value as PropertyType),
    });
  };

  const handlePurchaseTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      purchaseType: value === 'all' ? undefined : (value as PurchaseType),
    });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value === 'all' ? undefined : (value as PropertyStatus),
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-5 h-5" />
        <Input
          placeholder="Search properties by name, location, or neighborhood..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-transparent border-accent/30 text-text-primary"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Select
          value={filters.propertyType || 'all'}
          onValueChange={handlePropertyTypeChange}
        >
          <SelectTrigger className="w-40 bg-transparent border-accent/30 text-text-primary">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="penthouse">Penthouse</SelectItem>
            <SelectItem value="estate">Estate</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.purchaseType || 'all'}
          onValueChange={handlePurchaseTypeChange}
        >
          <SelectTrigger className="w-32 bg-transparent border-accent/30 text-text-primary">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sale">Sale</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status || 'all'}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-32 bg-transparent border-accent/30 text-text-primary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PropertyFiltersComponent;
