import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PropertyForm from '@/components/admin/PropertyForm';
import { Property, PropertyFormData } from '@/types';
import { getProperty, updateProperty } from '@/lib/propertyService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const EditProperty: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const fetchedProperty = await getProperty(id);
        if (fetchedProperty) {
          setProperty(fetchedProperty);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading property:', error);
        toast.error('Failed to load property');
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  const handleSubmit = async (data: PropertyFormData) => {
    if (!user || !id) {
      toast.error('You must be logged in to edit a property');
      return;
    }

    try {
      await updateProperty(id, data, user.uid);
      toast.success('Property updated successfully!');
      navigate('/dashboard/admin/properties');
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property. Please try again.');
      throw error;
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/admin/properties');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
            <p className="text-text-primary/70 font-body">Loading property...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (notFound || !property) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-heading text-text-primary mb-4">Property Not Found</h2>
            <p className="text-text-primary/70 font-body mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/dashboard/admin/properties')}
              className="bg-accent hover:bg-accent/90 text-primary px-6 py-2 rounded-lg font-body"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
            <h1 className="text-3xl font-heading text-text-primary">Edit Property</h1>
            <p className="text-text-primary/70 font-body">
              Update property information for "{property.name}"
            </p>
          </div>
        </div>

        <PropertyForm
          property={property}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default EditProperty;
