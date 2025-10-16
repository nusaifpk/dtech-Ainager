# DTEC AI Assistant

## Overview

This project is an AI-powered chatbot for DTEC (Dubai Technology Entrepreneur Campus), the largest tech startup coworking campus in the Middle East. The application features a modern web interface that combines DTEC's existing brand identity with a contemporary AI chat experience. Users can interact with an AI assistant to learn about DTEC's coworking spaces, startup programs, events, and services in Dubai Silicon Oasis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: 
- Shadcn/ui components (New York style variant) with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Component library includes 40+ pre-built UI components (buttons, dialogs, forms, navigation, etc.)

**Styling Approach**:
- CSS-in-JS via Tailwind with custom HSL-based color system
- Dark mode primary theme with light mode support
- Custom design tokens for elevation states, borders, and interactive elements
- Typography uses Inter (primary) and Poppins (headings) font families

**State Management**:
- TanStack Query (React Query) for server state management
- React hooks for local component state
- Custom hooks for chat functionality and mobile responsiveness

**Routing**: Wouter for lightweight client-side routing

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**API Design**:
- RESTful endpoints for chat operations
- Streaming support for AI responses (Server-Sent Events pattern)
- Request validation using Zod schemas
- Session-based conversation tracking

**Data Layer**:
- In-memory storage implementation (MemStorage class)
- Database-ready schema using Drizzle ORM with PostgreSQL dialect
- Prepared for production database migration with schema already defined

**AI Integration**:
- OpenAI API integration for chat completions
- GPT-5 model configured as default
- Context injection with DTEC-specific knowledge base
- Support for both streaming and non-streaming responses

### Data Storage Solutions

**Current Implementation**: In-memory storage for development

**Production-Ready Schema**:
- Users table: Authentication and user management
- Chat messages table: Conversation history with session tracking
- Drizzle ORM configuration pointing to PostgreSQL

**Schema Design**:
- UUID primary keys with automatic generation
- Timestamp tracking for messages
- Session-based message grouping
- Role-based message storage (user/assistant)

### Authentication and Authorization

**Current State**: Basic user schema defined but not actively implemented in routes

**Prepared Infrastructure**:
- User schema with username/password fields
- Session management ready for implementation
- Storage interface includes user CRUD methods

### Key Architectural Decisions

**Monorepo Structure**:
- Problem: Need to share types between frontend and backend
- Solution: Shared schema directory with Zod schemas for type safety across stack
- Benefits: Single source of truth for data models, automatic type inference

**Streaming vs Non-Streaming Chat**:
- Problem: Need responsive AI interactions without blocking UI
- Solution: Dual endpoint approach (both /api/chat and /api/chat/stream)
- Benefits: Flexibility for different use cases, progressive response rendering

**Component-Based Design System**:
- Problem: Maintain consistent UI while allowing customization
- Solution: Shadcn/ui pattern with local component ownership
- Benefits: Full control over components, easy customization, no package lock-in

**Hybrid Rendering Approach**:
- Problem: Balance between SEO, performance, and interactivity
- Solution: SPA with Vite dev server in development, static build for production
- Benefits: Fast development experience, optimized production bundles

**Path Aliasing Strategy**:
- Problem: Avoid messy relative imports across growing codebase
- Solution: TypeScript path aliases (@/, @shared/, @assets/)
- Benefits: Clean imports, easier refactoring, better code organization

## External Dependencies

**AI Services**:
- OpenAI API (GPT-5 model) for natural language processing
- Requires OPENAI_API_KEY environment variable

**Database**:
- PostgreSQL (via Neon serverless driver)
- Requires DATABASE_URL environment variable
- Drizzle ORM for type-safe database operations

**UI Libraries**:
- Radix UI primitives (40+ components for accessible UI patterns)
- Lucide React for iconography
- Embla Carousel for interactive carousels
- Recharts for potential data visualizations

**Development Tools**:
- Vite for build tooling and dev server
- TSX for TypeScript execution
- Replit-specific plugins (cartographer, dev banner, error overlay)

**Styling Dependencies**:
- Tailwind CSS for utility-first styling
- PostCSS with Autoprefixer
- class-variance-authority for variant-based component styling
- clsx and tailwind-merge for conditional class handling

**Form Management**:
- React Hook Form for form state
- Hookform resolvers with Zod for validation
- Date-fns for date manipulation

**State & Data Fetching**:
- TanStack Query for server state
- Custom fetch wrapper with credential handling
- Optimistic updates and caching strategy