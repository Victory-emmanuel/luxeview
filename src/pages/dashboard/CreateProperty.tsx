import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PropertyForm from '@/components/admin/PropertyForm';
import { PropertyFormData } from '@/types';
import { createProperty } from '@/lib/propertyService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const CreateProperty: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (data: PropertyFormData) => {
    if (!user) {
      toast.error('You must be logged in to create a property');
      return;
    }

    try {
      const propertyId = await createProperty(data, user.uid);
      toast.success('Property created successfully!');
      navigate('/dashboard/admin/properties');
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Failed to create property. Please try again.');
      throw error;
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/admin/properties');
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading text-text-primary">Create New Property</h1>
            <p className="text-text-primary/70 font-body">
              Add a new property to your listings
            </p>
          </div>
        </div>

        <PropertyForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default CreateProperty;
