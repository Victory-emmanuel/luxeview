import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Home,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { getProperties } from "@/lib/propertyService";
import { useAuth } from "@/contexts/AuthContext";

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentProperties = async () => {
      try {
        setLoading(true);
        const { properties } = await getProperties({ status: "available" }, 3);
        setRecentProperties(properties || []);
      } catch (error) {
        console.error("Error loading recent properties:", error);
        setRecentProperties([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadRecentProperties();
    }
  }, [user]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const stats = [
    {
      title: "Saved Properties",
      value: 0, // TODO: Implement saved properties functionality
      icon: Heart,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      title: "Properties Viewed",
      value: 0, // TODO: Implement viewing history functionality
      icon: Eye,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Scheduled Appointments",
      value: 0, // TODO: Implement appointments functionality
      icon: Calendar,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Price Range",
      value: `${formatCurrency(
        mockClientPreferences.priceRange.min
      )} - ${formatCurrency(mockClientPreferences.priceRange.max)}`,
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  // TODO: Implement appointments functionality
  const upcomingAppointments: any[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-6 border border-accent/20"
        >
          <h2 className="font-heading text-2xl text-text-primary mb-2">
            Welcome to Your Property Journey
          </h2>
          <p className="text-text-primary/70 font-body mb-4">
            Discover luxury properties tailored to your preferences and manage
            your real estate journey.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-primary"
            >
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-accent/30 text-accent"
            >
              <Link to="/dashboard/client/preferences">Update Preferences</Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-primary border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-text-primary/70 text-sm font-body">
                          {stat.title}
                        </p>
                        <p className="text-lg font-heading text-text-primary mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Saved Properties */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-primary border-accent/20">
              <CardHeader>
                <CardTitle className="text-text-primary font-heading flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span>Saved Properties</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-accent/30 text-accent"
                  >
                    <Link to="/dashboard/client/saved">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-text-primary/70 font-body">
                      Loading recent properties...
                    </p>
                  </div>
                ) : recentProperties.length > 0 ? (
                  recentProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center space-x-4 p-3 rounded-lg border border-accent/10 hover:border-accent/20 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-accent/10">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Home className="w-8 h-8 text-accent" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-text-primary font-body font-medium truncate">
                          {property.name}
                        </h4>
                        <div className="flex items-center space-x-1 text-text-primary/70 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{property.location}</span>
                        </div>
                        <p className="text-accent font-medium">
                          {formatCurrency(property.price)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-accent/30 text-accent"
                        asChild
                      >
                        <Link to={`/property/${property.id}`}>View</Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Home className="w-12 h-12 text-text-primary/40 mx-auto mb-4" />
                    <p className="text-text-primary/70 font-body">
                      No recent properties
                    </p>
                    <p className="text-text-primary/50 text-sm">
                      Browse properties to see them here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Viewing History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-primary border-accent/20">
              <CardHeader>
                <CardTitle className="text-text-primary font-heading flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>Recent Views</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-accent/30 text-accent"
                  >
                    <Link to="/dashboard/client/history">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-text-primary/40 mx-auto mb-4" />
                  <p className="text-text-primary/70 font-body">
                    No viewing history yet
                  </p>
                  <p className="text-text-primary/50 text-sm">
                    Your property viewing history will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-primary border-accent/20">
              <CardHeader>
                <CardTitle className="text-text-primary font-heading flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span>Upcoming Appointments</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-accent/30 text-accent"
                  >
                    <Link to="/dashboard/client/appointments">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-lg border border-accent/10 hover:border-accent/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-green-400/10 text-green-400">
                          {formatDate(appointment.date)}
                        </Badge>
                        <span className="text-text-primary/70 text-sm">
                          {appointment.time}
                        </span>
                      </div>
                      <h4 className="text-text-primary font-body font-medium mb-2">
                        {appointment.propertyTitle}
                      </h4>
                      <p className="text-text-primary/70 text-sm">
                        Agent: {appointment.agent}
                      </p>
                      {appointment.notes && (
                        <p className="text-text-primary/60 text-xs mt-2 line-clamp-2">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Preferences Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-primary border-accent/20">
            <CardHeader>
              <CardTitle className="text-text-primary font-heading flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Home className="w-5 h-5 text-accent" />
                  <span>Your Preferences</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-accent/30 text-accent"
                >
                  <Link to="/dashboard/client/preferences">Edit</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-text-primary font-body font-medium mb-2">
                    Price Range
                  </h4>
                  <p className="text-accent">
                    {formatCurrency(mockClientPreferences.priceRange.min)} -{" "}
                    {formatCurrency(mockClientPreferences.priceRange.max)}
                  </p>
                </div>
                <div>
                  <h4 className="text-text-primary font-body font-medium mb-2">
                    Locations
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {mockClientPreferences.locations.map((location) => (
                      <Badge
                        key={location}
                        variant="outline"
                        className="text-xs"
                      >
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-text-primary font-body font-medium mb-2">
                    Property Types
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {mockClientPreferences.propertyTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="outline"
                        className="text-xs capitalize"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-text-primary font-body font-medium mb-2">
                    Amenities
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {mockClientPreferences.amenities
                      .slice(0, 3)
                      .map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="outline"
                          className="text-xs capitalize"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    {mockClientPreferences.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{mockClientPreferences.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
