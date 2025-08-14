import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Building,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";

import { Property, PropertyFilters, PropertyStatus } from "@/types";
import {
  getProperties,
  deleteProperty,
  getPropertiesCount,
} from "@/lib/propertyService";
import { useAuth } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import PropertyFiltersComponent from "@/components/admin/PropertyFilters";

const PropertyManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<PropertyFilters>({
    propertyType: undefined,
    purchaseType: undefined,
    status: undefined,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null
  );
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Load properties
  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Loading properties with filters:", filters);

      const searchFilters: PropertyFilters = {
        ...filters,
        ...(searchTerm && { searchTerm }),
      };

      const { properties: fetchedProperties } = await getProperties(
        searchFilters,
        50
      );

      console.log("Fetched properties:", fetchedProperties);
      setProperties(fetchedProperties || []);

      const count = await getPropertiesCount(searchFilters);
      setTotalCount(count || 0);
    } catch (error: any) {
      console.error("Error loading properties:", error);
      setError(error.message || "Failed to load properties");

      // More specific error messages
      if (error.message?.includes("Missing or insufficient permissions")) {
        toast.error(
          "Access denied. Please ensure you have admin permissions and Firestore rules are configured correctly."
        );
      } else if (error.message?.includes("network")) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error(
          "Failed to load properties. Please check your Firebase setup."
        );
      }

      setProperties([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    if (!authLoading && user) {
      loadProperties();
    }
  }, [loadProperties, authLoading, user]);

  const handleCreateProperty = () => {
    navigate("/dashboard/admin/properties/create");
  };

  const handleEditProperty = (property: Property) => {
    navigate(`/dashboard/admin/properties/edit/${property.id}`);
  };

  const handleViewProperty = (property: Property) => {
    navigate(`/property/${property.id}`);
  };

  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return;

    try {
      await deleteProperty(propertyToDelete.id);
      toast.success("Property deleted successfully");
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
      loadProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    }
  };

  const openDeleteDialog = (property: Property) => {
    setPropertyToDelete(property);
    setDeleteDialogOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400";
      case "sold":
        return "bg-red-500/20 text-red-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "rented":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-text-primary/70 font-body">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state if user is not authenticated
  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-heading text-text-primary mb-4">
              Access Denied
            </h2>
            <p className="text-text-primary/70 font-body mb-6">
              You need to be signed in to access this page.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-heading text-text-primary">
              Property Management
            </h1>
            <p className="text-text-primary/70 font-body">
              Manage your property listings and track performance
            </p>
          </div>
          <Button
            onClick={handleCreateProperty}
            className="bg-accent hover:bg-accent/90 text-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="bg-primary border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary/70 text-sm font-body">
                    Total Properties
                  </p>
                  <p className="text-2xl font-heading text-text-primary mt-1">
                    {totalCount}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-400/10">
                  <Building className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary/70 text-sm font-body">
                    Available
                  </p>
                  <p className="text-2xl font-heading text-text-primary mt-1">
                    {properties.filter((p) => p.status === "available").length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-400/10">
                  <Building className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary/70 text-sm font-body">Sold</p>
                  <p className="text-2xl font-heading text-text-primary mt-1">
                    {properties.filter((p) => p.status === "sold").length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-red-400/10">
                  <Building className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary/70 text-sm font-body">
                    Pending
                  </p>
                  <p className="text-2xl font-heading text-text-primary mt-1">
                    {properties.filter((p) => p.status === "pending").length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-400/10">
                  <Building className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-primary border-accent/20">
            <CardContent className="p-6">
              <ErrorBoundary
                fallback={
                  <div className="text-text-primary/70 text-sm">
                    Search and filter options temporarily unavailable
                  </div>
                }
              >
                <PropertyFiltersComponent
                  searchTerm={searchTerm}
                  filters={filters}
                  onSearchChange={setSearchTerm}
                  onFiltersChange={setFilters}
                />
              </ErrorBoundary>
            </CardContent>
          </Card>
        </motion.div>

        {/* Properties Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-primary border-accent/20">
            <CardHeader>
              <CardTitle className="text-text-primary font-heading">
                Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-8">
                  <Building className="w-12 h-12 text-text-primary/40 mx-auto mb-4" />
                  <p className="text-text-primary/70 font-body">
                    No properties found
                  </p>
                  <Button
                    onClick={handleCreateProperty}
                    className="mt-4 bg-accent hover:bg-accent/90 text-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Property
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <p className="text-text-primary/70 font-body mb-4">
                    Found {properties.length} properties
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-accent/20">
                        <TableHead className="text-text-primary font-body">
                          Property
                        </TableHead>
                        <TableHead className="text-text-primary font-body">
                          Location
                        </TableHead>
                        <TableHead className="text-text-primary font-body">
                          Type
                        </TableHead>
                        <TableHead className="text-text-primary font-body">
                          Price
                        </TableHead>
                        <TableHead className="text-text-primary font-body">
                          Status
                        </TableHead>
                        <TableHead className="text-text-primary font-body">
                          Details
                        </TableHead>
                        <TableHead className="text-text-primary font-body">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((property) => (
                        <TableRow
                          key={property.id}
                          className="border-accent/20 hover:bg-accent/5"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-accent/10">
                                {property.images &&
                                property.images.length > 0 ? (
                                  <img
                                    src={property.images[0]}
                                    alt={property.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Building className="w-6 h-6 text-accent" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-body text-text-primary font-medium">
                                  {property.name}
                                </p>
                                <p className="text-sm text-text-primary/70 font-body">
                                  {property.neighborhood}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-accent" />
                              <span className="text-text-primary font-body text-sm">
                                {property.location}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge
                                variant="outline"
                                className="border-accent/30 text-accent"
                              >
                                {property.propertyType}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-accent/30 text-accent"
                              >
                                {property.purchaseType}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-accent" />
                              <span className="font-body text-text-primary font-medium">
                                {formatPrice(property.price)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(property.status)}>
                              {property.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-4 text-sm text-text-primary/70">
                              <div className="flex items-center space-x-1">
                                <Bed className="w-4 h-4" />
                                <span>{property.bedrooms}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Bath className="w-4 h-4" />
                                <span>{property.bathrooms}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Square className="w-4 h-4" />
                                <span>{property.sqft} sqft</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-text-primary hover:bg-accent/10"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-primary border-accent/20"
                              >
                                <DropdownMenuItem
                                  onClick={() => handleViewProperty(property)}
                                  className="text-text-primary hover:bg-accent/10 cursor-pointer"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleEditProperty(property)}
                                  className="text-text-primary hover:bg-accent/10 cursor-pointer"
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openDeleteDialog(property)}
                                  className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-primary border-accent/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-text-primary font-heading">
              Delete Property
            </AlertDialogTitle>
            <AlertDialogDescription className="text-text-primary/70 font-body">
              Are you sure you want to delete "{propertyToDelete?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-accent/30 text-text-primary hover:bg-accent/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default PropertyManagement;
