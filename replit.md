# Biblical Consultation System - CPAD

## Overview

This is a full-stack web application designed as a theological consultation system for the Assembleia de Deus CPAD (Assembly of God CPAD). The system allows users to ask biblical and theological questions and receive comprehensive responses that include biblical verses, original language analysis, and references to CPAD publications.

The application is built as a modern web application with a React frontend and Express.js backend, featuring AI-powered biblical consultation capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CPAD branding colors
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage with fallback to database persistence
- **AI Integration**: OpenRouter API for theological consultations

### Development Environment
- **Platform**: Replit with Node.js 20, Web, and PostgreSQL 16 modules
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation

## Key Components

### Core Features
1. **Theological Query System**: Users can ask biblical questions with different response complexity levels
2. **Biblical Response Engine**: Provides structured responses including:
   - AI-generated explanations
   - Relevant biblical verses with context
   - Original language word analysis (Greek, Hebrew, Aramaic)
   - References to CPAD publications
3. **Conversation History**: Persistent storage of all queries and responses
4. **Settings Management**: Configurable AI model and API key settings

### Database Schema
- **Conversations Table**: Stores user questions, response levels, and complete biblical responses
- **Settings Table**: Manages API keys and AI model configurations
- **Response Structure**: JSON-based storage for complex biblical response data

### AI Integration Services
- **OpenRouter Service**: Handles AI model interactions for theological consultations
- **Biblical Words Service**: Provides original language analysis for key terms
- **PDF Processor Service**: Searches through CPAD publication content for relevant references

## Data Flow

1. **User Query**: User submits a theological question through the frontend interface
2. **Backend Processing**: Express server receives query and coordinates multiple services:
   - AI consultation through OpenRouter API
   - Biblical word analysis for original language insights
   - PDF content search for CPAD publication references
3. **Response Compilation**: Backend structures the complete biblical response
4. **Database Storage**: Conversation and response are persisted to PostgreSQL
5. **Frontend Display**: Structured response is displayed with organized sections for verses, original words, and book references

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **AI Service**: OpenRouter API for theological AI consultations
- **UI Components**: Radix UI primitives for accessible components

### Key Libraries
- **Frontend**: React, Vite, TanStack Query, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Drizzle ORM, tsx for TypeScript execution
- **Validation**: Zod for runtime type validation
- **Utilities**: date-fns for date formatting, clsx for conditional styling

## Deployment Strategy

### Development
- Runs on Replit with hot reload capabilities
- Development server on port 5000 with Vite HMR
- Database migrations handled through Drizzle Kit

### Production
- **Primary Target**: Render.com deployment
  - PostgreSQL database with Neon/Render
  - Web service with Node.js environment
  - Environment variables: NODE_ENV, DATABASE_URL, OPENROUTER_API_KEY
- **Alternative**: Autoscale deployment target on Replit
- Frontend built and served as static assets
- Backend compiled with esbuild for optimal performance
- Port configuration: Uses process.env.PORT for Render compatibility

### Build Process
1. Frontend assets built with Vite to `dist/public`
2. Backend compiled with esbuild to `dist/index.js`
3. Static file serving configured for production deployment

## Changelog

- July 1, 2025: Correção de problemas de build no Render
  - Identificado problema: Vite em devDependencies não sendo instalado no build do Render
  - Criado render.yaml com buildCommand que inclui --include=dev
  - Atualizado build.sh para usar npx e verificar ferramentas de build
  - Criado RENDER_DEPLOY.md com instruções detalhadas de deploy
  - Configuração de build command: `npm install --include=dev && npm run build`
- June 30, 2025: Preparação para deploy no Render
  - Configurado endpoint /health para monitoramento
  - Ajustada configuração de porta para usar process.env.PORT
  - Criados arquivos render.yaml, RENDER_SETUP.md e DEPLOY_RENDER.md
  - Melhoradas exibições de palavras originais e referências da Declaração de Fé
- June 25, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.