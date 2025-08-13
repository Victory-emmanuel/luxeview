# LuxeView Elite Authentication System

## Overview

A comprehensive authentication system has been implemented for the LuxeView Elite luxury real estate website, featuring Firebase authentication, role-based access control, and elegant dashboards for both administrators and clients.

## Features

### 🔐 Authentication
- **Email/Password Authentication** - Secure sign-in and sign-up
- **Google OAuth** - One-click authentication with Google
- **Password Reset** - Email-based password recovery
- **Role-Based Access** - Admin and Client user roles
- **Protected Routes** - Automatic redirection based on authentication status

### 🎨 UI/UX
- **Luxury Design** - Consistent with the existing LuxeView Elite aesthetic
- **Responsive Layout** - Works seamlessly on all devices
- **Smooth Animations** - Framer Motion transitions throughout
- **Loading States** - Proper feedback during authentication processes
- **Error Handling** - User-friendly error messages

### 📊 Dashboards

#### Admin Dashboard
- **Property Management** - View and manage property listings
- **User Management** - Monitor client accounts and activity
- **Analytics** - Revenue, views, and engagement metrics
- **Inquiries** - Manage client inquiries and responses
- **Appointments** - Schedule and track property viewings

#### Client Dashboard
- **Saved Properties** - Bookmark favorite properties
- **Viewing History** - Track previously viewed properties
- **Appointments** - Schedule and manage property viewings
- **Preferences** - Set search criteria and preferences
- **Personalized Experience** - Tailored property recommendations

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx          # Shared layout for auth pages
│   │   └── ProtectedRoute.tsx      # Route protection component
│   └── dashboard/
│       └── DashboardLayout.tsx     # Shared dashboard layout
├── contexts/
│   └── AuthContext.tsx             # Authentication state management
├── data/
│   └── mockData.ts                 # Mock data for dashboards
├── hooks/
│   └── useAuth.ts                  # Authentication hooks
├── lib/
│   ├── firebase.ts                 # Firebase configuration
│   └── auth.ts                     # Authentication utilities
├── pages/
│   ├── auth/
│   │   ├── SignIn.tsx              # Sign-in page
│   │   └── SignUp.tsx              # Sign-up page
│   └── dashboard/
│       ├── AdminDashboard.tsx      # Admin dashboard
│       └── ClientDashboard.tsx     # Client dashboard
└── types/
    └── auth.ts                     # TypeScript type definitions
```

## Usage

### Navigation
The navigation bar automatically updates based on authentication status:
- **Unauthenticated**: Shows "Sign In" and "Get Started" buttons
- **Authenticated**: Shows user avatar, dashboard link, and dropdown menu

### Authentication Flow
1. Users can sign up as either "Client" or "Agent" (admin)
2. Email verification and password requirements are enforced
3. Google OAuth provides alternative authentication method
4. Users are redirected to appropriate dashboard based on role

### Dashboard Access
- **Admin Dashboard**: `/dashboard/admin` (requires admin role)
- **Client Dashboard**: `/dashboard/client` (requires client role)
- Automatic role-based redirection prevents unauthorized access

## Configuration

### Firebase Setup
The Firebase configuration is already set up in `.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Firestore Security Rules
Ensure your Firestore has proper security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Development

### Running the Application
```bash
npm run dev
```

### Testing Authentication
1. Navigate to `/auth/signup` to create a new account
2. Choose between "Client" or "Agent" role
3. Complete the registration process
4. Access the appropriate dashboard

### Mock Data
The dashboards use mock data located in `src/data/mockData.ts`. This includes:
- Sample properties with images and details
- User profiles and activity data
- Inquiries and appointments
- Analytics and preferences

## Security Features

- **Protected Routes** - Unauthorized access automatically redirects to sign-in
- **Role-Based Access Control** - Users can only access their designated dashboard
- **Secure Authentication** - Firebase handles all authentication security
- **Input Validation** - Form validation using Zod schemas
- **Error Boundaries** - Graceful error handling throughout the application

## Styling

The authentication system maintains the luxury aesthetic with:
- **Gold Accents** (#B08D57) for highlights and interactive elements
- **Charcoal Background** (#1A1A1A) for primary surfaces
- **Playfair Display** for headings and luxury typography
- **Lato** for body text and readability
- **Consistent Spacing** using the established design system

## Next Steps

1. **Set up Firebase Project** - Configure authentication and Firestore
2. **Customize Branding** - Update colors and typography if needed
3. **Add Real Data** - Replace mock data with actual property information
4. **Implement Features** - Add property management, booking system, etc.
5. **Deploy** - Set up production environment with proper security

## Support

For questions or issues with the authentication system, refer to:
- Firebase Documentation: https://firebase.google.com/docs
- React Router Documentation: https://reactrouter.com
- Framer Motion Documentation: https://www.framer.com/motion
