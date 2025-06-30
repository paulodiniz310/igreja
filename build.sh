#!/bin/bash

# Build script for Render deployment
echo "Starting build process for Sistema Teológico CPAD..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the frontend
echo "Building frontend..."
npm run build

echo "Build completed successfully!"