# Firebase Setup Guide for LuxeView Property Management

## 🔥 Firebase Console Setup

### 1. Update Firestore Security Rules

1. Go to your [Firebase Console](https://console.firebase.google.com)
2. Select your LuxeView project
3. Navigate to **Firestore Database** → **Rules**
4. Replace the existing rules with the content from `firestore.rules` file
5. Click **Publish** to apply the new rules

### 2. Create Admin User

Since the property management requires admin access, you need to create an admin user:

#### Option A: Manual Database Update (Recommended)
1. Go to **Firestore Database** → **Data**
2. Find the `users` collection
3. Locate your user document (created when you signed up)
4. Edit the document and change the `role` field from `"client"` to `"admin"`
5. Save the changes

#### Option B: Using Firebase Admin SDK (Advanced)
```javascript
// This would be run server-side with admin privileges
await admin.firestore().collection('users').doc(userId).update({
  role: 'admin'
});
```

### 3. Test the Setup

1. Sign in to your application with the admin account
2. Navigate to `/dashboard/admin/properties`
3. Try creating a new property
4. Verify that the property appears in the Firestore database

## 🏠 Property Management Features

### Available Features:
- ✅ Create new properties with all required fields
- ✅ Edit existing properties
- ✅ Delete properties
- ✅ Search and filter properties
- ✅ Auto-coordinate generation from address
- ✅ Image management via URLs
- ✅ Agent contact information
- ✅ Property features selection

### Property Fields:
- **Basic Info**: Name, location, description, neighborhood
- **Pricing**: Price in Nigerian Naira
- **Details**: Bedrooms, bathrooms, square feet
- **Type**: Property type (condo, apartment, house, etc.)
- **Purchase Type**: Sale or rent
- **Features**: 22+ available features (gym, pool, security, etc.)
- **Images**: Multiple image URLs
- **Agent**: Complete contact information
- **Coordinates**: Auto-generated from address

## 🔧 Troubleshooting

### Common Issues:

#### 1. "Missing or insufficient permissions" Error
- **Cause**: Firestore security rules not updated or user doesn't have admin role
- **Solution**: 
  1. Update Firestore rules using the provided `firestore.rules` file
  2. Ensure your user has `role: "admin"` in the users collection

#### 2. Coordinate Generation Not Working
- **Cause**: Network issues or address format
- **Solution**: 
  - Ensure internet connection is stable
  - Try more specific addresses (include city and state)
  - The system will fallback to default Nigerian city coordinates

#### 3. Images Not Displaying
- **Cause**: Invalid image URLs
- **Solution**: 
  - Ensure image URLs are publicly accessible
  - Use HTTPS URLs when possible
  - Test URLs in browser before adding

#### 4. Property Creation Fails
- **Cause**: Missing required fields or validation errors
- **Solution**: 
  - Fill all required fields marked with *
  - Ensure price is greater than 0
  - Add at least one property feature
  - Include at least one image URL

## 📱 Usage Instructions

### Creating a Property:
1. Go to Admin Dashboard → Properties
2. Click "Add Property" button
3. Fill in all required fields:
   - Property name and location
   - Description and neighborhood
   - Price, bedrooms, bathrooms, square feet
   - Property type and purchase type
   - Select relevant features
   - Add image URLs
   - Enter agent contact information
4. Click "Create Property"

### Managing Properties:
- **View**: Click the eye icon to view property on public site
- **Edit**: Click the edit icon to modify property details
- **Delete**: Click the three dots menu → Delete (with confirmation)
- **Search**: Use the search bar to find properties by name or location
- **Filter**: Use dropdown filters for property type, purchase type, and status

## 🚀 Next Steps

After setting up property management, consider implementing:

1. **Chat Management System**
   - Real-time messaging between clients and agents
   - Inquiry management
   - Automated responses

2. **Advanced Analytics**
   - Property performance metrics
   - User engagement tracking
   - Revenue analytics

3. **Booking System**
   - Property viewing appointments
   - Calendar integration
   - Automated confirmations

4. **Enhanced Search**
   - Map-based property search
   - Advanced filtering options
   - Saved searches and alerts

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify Firebase configuration in `.env` file
3. Ensure Firestore rules are properly set
4. Confirm user has admin role in database

The property management system is now ready for production use! 🎉
