import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95" />
      <div
        className={`"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23B08D57" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"`}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-block">
            <h1 className="font-heading text-3xl text-accent tracking-luxury">
              LuxeView Elite
            </h1>
          </Link>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-primary/80 backdrop-blur-sm border border-accent/20 rounded-lg p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl text-text-primary mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="font-body text-text-primary/70 text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          {children}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="font-body text-text-primary/50 text-xs">
            © 2024 LuxeView Elite. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
