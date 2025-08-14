import React from "react";
import { motion } from "framer-motion";
import {
  Building,
  Users,
  Eye,
  DollarSign,
  MessageSquare,
  Calendar,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Note: Using real data from Firebase instead of mock data

const AdminDashboard: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
      title: "Total Properties",
      value: "0", // Will be updated with real data
      icon: Building,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Total Users",
      value: "0", // Will be updated with real data
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Monthly Views",
      value: "0", // Will be updated with real data
      icon: Eye,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      title: "Revenue",
      value: formatCurrency(0), // Will be updated with real data
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  // Placeholder data - will be replaced with real Firebase data
  const recentProperties: any[] = [];
  const recentInquiries: any[] = [];
  const upcomingAppointments: any[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
                        <p className="text-2xl font-heading text-text-primary mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
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
          {/* Recent Properties */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-primary border-accent/20">
              <CardHeader>
                <CardTitle className="text-text-primary font-heading flex items-center justify-between">
                  Recent Properties
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/30 text-accent"
                  >
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProperties.length > 0 ? (
                  recentProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center space-x-4 p-3 rounded-lg border border-accent/10 hover:border-accent/20 transition-colors"
                    >
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-text-primary font-body font-medium truncate">
                          {property.title}
                        </h4>
                        <p className="text-text-primary/70 text-sm">
                          {property.location}
                        </p>
                        <p className="text-accent font-medium">
                          {formatCurrency(property.price)}
                        </p>
                      </div>
                      <Badge
                        variant={
                          property.status === "available"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {property.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Building className="w-12 h-12 text-text-primary/40 mx-auto mb-4" />
                    <p className="text-text-primary/70 font-body">
                      No properties yet
                    </p>
                    <p className="text-text-primary/50 text-sm">
                      Create your first property to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-primary border-accent/20">
              <CardHeader>
                <CardTitle className="text-text-primary font-heading flex items-center justify-between">
                  Recent Inquiries
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/30 text-accent"
                  >
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentInquiries.length > 0 ? (
                  recentInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="p-3 rounded-lg border border-accent/10 hover:border-accent/20 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-text-primary font-body font-medium">
                            {inquiry.userName}
                          </h4>
                          <p className="text-text-primary/70 text-sm">
                            {inquiry.propertyTitle}
                          </p>
                        </div>
                        <Badge
                          variant={
                            inquiry.status === "new" ? "default" : "secondary"
                          }
                          className="capitalize"
                        >
                          {inquiry.status}
                        </Badge>
                      </div>
                      <p className="text-text-primary/80 text-sm line-clamp-2">
                        {inquiry.message}
                      </p>
                      <p className="text-text-primary/50 text-xs mt-2">
                        {formatDate(inquiry.date)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-text-primary/40 mx-auto mb-4" />
                    <p className="text-text-primary/70 font-body">
                      No inquiries yet
                    </p>
                    <p className="text-text-primary/50 text-sm">
                      Customer inquiries will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-primary border-accent/20">
            <CardHeader>
              <CardTitle className="text-text-primary font-heading flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span>Upcoming Appointments</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent/30 text-accent"
                >
                  View Calendar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-lg border border-accent/10 hover:border-accent/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-accent/10 text-accent">
                          {formatDate(appointment.date)}
                        </Badge>
                        <span className="text-text-primary/70 text-sm">
                          {appointment.time}
                        </span>
                      </div>
                      <h4 className="text-text-primary font-body font-medium mb-2">
                        {appointment.propertyTitle}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-accent/20 text-accent text-xs">
                            {appointment.agent.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-text-primary/70 text-sm">
                          {appointment.agent}
                        </span>
                      </div>
                      {appointment.notes && (
                        <p className="text-text-primary/60 text-xs mt-2 line-clamp-2">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 col-span-full">
                    <Calendar className="w-12 h-12 text-text-primary/40 mx-auto mb-4" />
                    <p className="text-text-primary/70 font-body">
                      No appointments scheduled
                    </p>
                    <p className="text-text-primary/50 text-sm">
                      Upcoming appointments will appear here
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
