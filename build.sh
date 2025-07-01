#!/bin/bash

# Build script for Render deployment
echo "Starting build process for Sistema Teológico CPAD..."

# Install all dependencies including devDependencies for build
echo "Installing all dependencies (including dev dependencies)..."
npm install --include=dev

# Verify critical build tools are available
echo "Verifying build tools..."
npx vite --version || echo "Warning: Vite not found"
npx esbuild --version || echo "Warning: esbuild not found"

# Build the frontend
echo "Building frontend with Vite..."
npx vite build

# Build the backend
echo "Building backend with esbuild..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"
echo "Frontend built to: dist/public"
echo "Backend built to: dist/index.js""