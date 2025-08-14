import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Upload, X, Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

import {
  PropertyFormData,
  PropertyType,
  PurchaseType,
  PropertyFeature,
  Property,
  Coordinates,
} from "@/types";
import { getCoordinatesFromAddress } from "@/lib/propertyService";

// Property form validation schema
const propertySchema = z.object({
  name: z.string().min(1, "Property name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  bedrooms: z.number().min(0, "Bedrooms must be 0 or greater"),
  bathrooms: z.number().min(0, "Bathrooms must be 0 or greater"),
  sqft: z.number().min(1, "Square feet must be greater than 0"),
  propertyType: z.enum([
    "condo",
    "apartment",
    "house",
    "townhouse",
    "villa",
    "penthouse",
    "estate",
    "others",
  ]),
  purchaseType: z.enum(["sale", "rent"]),
  features: z.array(z.string()).min(1, "Select at least one feature"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  agentContact: z.object({
    name: z.string().min(1, "Agent name is required"),
    phone: z.string().min(1, "Agent phone is required"),
    email: z.string().email("Valid email is required"),
    whatsappLink: z.string().optional(),
  }),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: PropertyFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "condo", label: "Condo" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "estate", label: "Estate" },
  { value: "others", label: "Others" },
];

const PURCHASE_TYPES: { value: PurchaseType; label: string }[] = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

const PROPERTY_FEATURES: { value: PropertyFeature; label: string }[] = [
  { value: "gym", label: "Gym" },
  { value: "pool", label: "Swimming Pool" },
  { value: "security", label: "Security" },
  { value: "solar_power", label: "Solar Power" },
  { value: "parking", label: "Parking" },
  { value: "garden", label: "Garden" },
  { value: "balcony", label: "Balcony" },
  { value: "elevator", label: "Elevator" },
  { value: "air_conditioning", label: "Air Conditioning" },
  { value: "heating", label: "Heating" },
  { value: "fireplace", label: "Fireplace" },
  { value: "walk_in_closet", label: "Walk-in Closet" },
  { value: "laundry_room", label: "Laundry Room" },
  { value: "storage", label: "Storage" },
  { value: "pet_friendly", label: "Pet Friendly" },
  { value: "furnished", label: "Furnished" },
  { value: "internet", label: "Internet" },
  { value: "cable_tv", label: "Cable TV" },
  { value: "dishwasher", label: "Dishwasher" },
  { value: "microwave", label: "Microwave" },
  { value: "refrigerator", label: "Refrigerator" },
  { value: "washer_dryer", label: "Washer/Dryer" },
];

const PropertyForm: React.FC<PropertyFormProps> = ({
  property,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(
    property?.coordinates || null
  );
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(property?.images || []);
  const [newImageUrl, setNewImageUrl] = useState("");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: property?.name || "",
      location: property?.location || "",
      description: property?.description || "",
      neighborhood: property?.neighborhood || "",
      price: property?.price || 0,
      bedrooms: property?.bedrooms || 0,
      bathrooms: property?.bathrooms || 0,
      sqft: property?.sqft || 0,
      propertyType: property?.propertyType || "apartment",
      purchaseType: property?.purchaseType || "sale",
      features: property?.features || [],
      images: property?.images || [],
      agentContact: {
        name: property?.agentContact?.name || "",
        phone: property?.agentContact?.phone || "",
        email: property?.agentContact?.email || "",
        whatsappLink: property?.agentContact?.whatsappLink || "",
      },
    },
  });

  const watchedLocation = watch("location");
  const watchedFeatures = watch("features");

  // Auto-generate coordinates when location changes
  useEffect(() => {
    const generateCoordinates = async () => {
      if (watchedLocation && watchedLocation.length > 3) {
        setIsGeocodingLoading(true);
        try {
          const coords = await getCoordinatesFromAddress(watchedLocation);
          setCoordinates(coords);
          toast.success("Coordinates generated successfully");
        } catch (error) {
          toast.error("Failed to generate coordinates");
        } finally {
          setIsGeocodingLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(generateCoordinates, 1000);
    return () => clearTimeout(timeoutId);
  }, [watchedLocation]);

  // Update images in form when imageUrls changes
  useEffect(() => {
    setValue("images", imageUrls);
  }, [imageUrls, setValue]);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleFeatureToggle = (feature: PropertyFeature, checked: boolean) => {
    const currentFeatures = watchedFeatures || [];
    if (checked) {
      setValue("features", [...currentFeatures, feature]);
    } else {
      setValue(
        "features",
        currentFeatures.filter((f) => f !== feature)
      );
    }
  };

  const onFormSubmit = async (data: PropertyFormValues) => {
    try {
      const formData: PropertyFormData = {
        ...data,
        coordinates: coordinates || undefined,
      };
      await onSubmit(formData);
    } catch (error) {
      toast.error("Failed to save property");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="bg-primary border-accent/20">
        <CardHeader>
          <CardTitle className="text-text-primary font-heading text-2xl">
            {property ? "Edit Property" : "Create New Property"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-text-primary font-body">
                  Property Name *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="bg-transparent border-accent/30 text-text-primary"
                  placeholder="Enter property name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="neighborhood"
                  className="text-text-primary font-body"
                >
                  Neighborhood *
                </Label>
                <Input
                  id="neighborhood"
                  {...register("neighborhood")}
                  className="bg-transparent border-accent/30 text-text-primary"
                  placeholder="Enter neighborhood"
                />
                {errors.neighborhood && (
                  <p className="text-red-400 text-sm">
                    {errors.neighborhood.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location and Coordinates */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-text-primary font-body"
                >
                  Location Address *
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    {...register("location")}
                    className="bg-transparent border-accent/30 text-text-primary pr-10"
                    placeholder="Enter full address"
                  />
                  {isGeocodingLoading && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-accent" />
                  )}
                  {!isGeocodingLoading && coordinates && (
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                  )}
                </div>
                {errors.location && (
                  <p className="text-red-400 text-sm">
                    {errors.location.message}
                  </p>
                )}
                {coordinates && (
                  <p className="text-text-primary/70 text-sm">
                    Coordinates: {coordinates.latitude.toFixed(6)},{" "}
                    {coordinates.longitude.toFixed(6)}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-text-primary font-body"
              >
                Description *
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                className="bg-transparent border-accent/30 text-text-primary min-h-[100px]"
                placeholder="Describe the property in detail..."
              />
              {errors.description && (
                <p className="text-red-400 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-text-primary font-body">
                  Price (₦) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className="bg-transparent border-accent/30 text-text-primary"
                  placeholder="0"
                />
                {errors.price && (
                  <p className="text-red-400 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bedrooms"
                  className="text-text-primary font-body"
                >
                  Bedrooms *
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  {...register("bedrooms", { valueAsNumber: true })}
                  className="bg-transparent border-accent/30 text-text-primary"
                  placeholder="0"
                />
                {errors.bedrooms && (
                  <p className="text-red-400 text-sm">
                    {errors.bedrooms.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bathrooms"
                  className="text-text-primary font-body"
                >
                  Bathrooms *
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  {...register("bathrooms", { valueAsNumber: true })}
                  className="bg-transparent border-accent/30 text-text-primary"
                  placeholder="0"
                />
                {errors.bathrooms && (
                  <p className="text-red-400 text-sm">
                    {errors.bathrooms.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sqft" className="text-text-primary font-body">
                  Square Feet *
                </Label>
                <Input
                  id="sqft"
                  type="number"
                  {...register("sqft", { valueAsNumber: true })}
                  className="bg-transparent border-accent/30 text-text-primary"
                  placeholder="0"
                />
                {errors.sqft && (
                  <p className="text-red-400 text-sm">{errors.sqft.message}</p>
                )}
              </div>
            </div>

            {/* Property Type and Purchase Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-text-primary font-body">
                  Property Type *
                </Label>
                <Controller
                  name="propertyType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-transparent border-accent/30 text-text-primary">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.propertyType && (
                  <p className="text-red-400 text-sm">
                    {errors.propertyType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-text-primary font-body">
                  Purchase Type *
                </Label>
                <Controller
                  name="purchaseType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-transparent border-accent/30 text-text-primary">
                        <SelectValue placeholder="Select purchase type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PURCHASE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.purchaseType && (
                  <p className="text-red-400 text-sm">
                    {errors.purchaseType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Property Features */}
            <div className="space-y-4">
              <Label className="text-text-primary font-body">
                Property Features *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {PROPERTY_FEATURES.map((feature) => (
                  <div
                    key={feature.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={feature.value}
                      checked={
                        watchedFeatures?.includes(feature.value) || false
                      }
                      onCheckedChange={(checked) =>
                        handleFeatureToggle(feature.value, checked as boolean)
                      }
                      className="border-accent/30"
                    />
                    <Label
                      htmlFor={feature.value}
                      className="text-text-primary/80 text-sm cursor-pointer"
                    >
                      {feature.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.features && (
                <p className="text-red-400 text-sm">
                  {errors.features.message}
                </p>
              )}
              {watchedFeatures && watchedFeatures.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchedFeatures.map((feature) => {
                    const featureLabel = PROPERTY_FEATURES.find(
                      (f) => f.value === feature
                    )?.label;
                    return (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="bg-accent/20 text-accent"
                      >
                        {featureLabel}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Property Images */}
            <div className="space-y-4">
              <Label className="text-text-primary font-body">
                Property Images *
              </Label>
              <div className="space-y-4">
                {/* Add new image URL */}
                <div className="flex gap-2">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="bg-transparent border-accent/30 text-text-primary flex-1"
                    placeholder="Enter image URL"
                  />
                  <Button
                    type="button"
                    onClick={handleAddImage}
                    variant="outline"
                    className="border-accent/30 text-accent hover:bg-accent/10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Display current images */}
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Property image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-accent/20"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/300x200?text=Invalid+Image";
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.images && (
                <p className="text-red-400 text-sm">{errors.images.message}</p>
              )}
            </div>

            {/* Agent Contact Information */}
            <div className="space-y-4">
              <Label className="text-text-primary font-body text-lg">
                Agent Contact Information
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="agentName"
                    className="text-text-primary font-body"
                  >
                    Agent Name *
                  </Label>
                  <Input
                    id="agentName"
                    {...register("agentContact.name")}
                    className="bg-transparent border-accent/30 text-text-primary"
                    placeholder="Enter agent name"
                  />
                  {errors.agentContact?.name && (
                    <p className="text-red-400 text-sm">
                      {errors.agentContact.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="agentPhone"
                    className="text-text-primary font-body"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="agentPhone"
                    {...register("agentContact.phone")}
                    className="bg-transparent border-accent/30 text-text-primary"
                    placeholder="Enter phone number"
                  />
                  {errors.agentContact?.phone && (
                    <p className="text-red-400 text-sm">
                      {errors.agentContact.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="agentEmail"
                    className="text-text-primary font-body"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="agentEmail"
                    type="email"
                    {...register("agentContact.email")}
                    className="bg-transparent border-accent/30 text-text-primary"
                    placeholder="Enter email address"
                  />
                  {errors.agentContact?.email && (
                    <p className="text-red-400 text-sm">
                      {errors.agentContact.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="agentWhatsapp"
                    className="text-text-primary font-body"
                  >
                    WhatsApp Link (Optional)
                  </Label>
                  <Input
                    id="agentWhatsapp"
                    {...register("agentContact.whatsappLink")}
                    className="bg-transparent border-accent/30 text-text-primary"
                    placeholder="https://wa.me/..."
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-accent/20">
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="border-accent/30 text-text-primary hover:bg-accent/10"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {property ? "Updating..." : "Creating..."}
                  </>
                ) : property ? (
                  "Update Property"
                ) : (
                  "Create Property"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyForm;
