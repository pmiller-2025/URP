# URP - Ultimate Retirement Planner

## Overview

URP (Ultimate Retirement Planner) is a comprehensive retirement cash flow calculator web application that provides 20-year retirement projections with both annual and monthly views. The system is built as a full-stack TypeScript application with a React frontend and Express backend, featuring AI-powered financial analysis and scenario comparison capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless connection
- **ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth with session-based authentication
- **AI Integration**: OpenAI API for financial analysis and scenario comparison

### Data Storage Solutions
- **Primary Database**: PostgreSQL (Neon serverless)
- **Session Storage**: PostgreSQL-backed session store
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Data Validation**: Zod for runtime type checking

## Key Components

### Core Calculator Engine
- **Real-time Calculations**: Instant updates as inputs change
- **Dual View Modes**: Annual summary and monthly breakdown views
- **Tax Calculations**: Individual tax rates per income source
- **Mortgage Amortization**: Extra payment calculations for accelerated payoff
- **Investment Growth**: Compound returns with annual additions
- **Inflation Adjustments**: Different growth rates for income and expenses

### AI-Powered Features
- **Financial Analysis**: AI-driven insights and recommendations
- **Scenario Comparison**: Compare different retirement strategies
- **Natural Language Interface**: Chat-based interaction for plan adjustments

### User Management
- **Authentication**: Replit OAuth with invite-based access control
- **Scenario Management**: Save, load, and compare multiple retirement scenarios
- **Data Persistence**: User-specific financial projections and preferences

### Visualization
- **Interactive Charts**: HTML5 Canvas-based savings projection charts
- **Summary Cards**: Key metrics display with financial indicators
- **Responsive Tables**: Configurable column visibility and formatting

## Data Flow

1. **User Input**: Financial parameters entered through tabbed interface
2. **Real-time Calculation**: Calculator engine processes inputs immediately
3. **Data Persistence**: Scenarios saved to PostgreSQL via Drizzle ORM
4. **AI Analysis**: OpenAI API processes scenarios for insights
5. **Visualization**: Results rendered in charts and summary cards
6. **Export/Compare**: Multiple scenarios can be saved and compared

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless deployment
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/react-***: UI component primitives
- **drizzle-orm**: Type-safe database operations
- **openai**: AI-powered financial analysis
- **bcryptjs**: Password hashing for development authentication

### Development Tools
- **Vite**: Frontend build tool with HMR
- **ESBuild**: Backend bundling for production
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js with tsx for TypeScript execution
- **Database**: Neon PostgreSQL with connection pooling
- **Authentication**: Replit Auth with local development fallback
- **Hot Reload**: Vite HMR for frontend, tsx watch for backend

### Production Build
- **Frontend**: Vite build to static assets
- **Backend**: ESBuild bundle to single Node.js file
- **Database**: Drizzle push for schema deployment
- **Assets**: Static file serving through Express

### Environment Configuration
- **Database**: `DATABASE_URL` for PostgreSQL connection
- **Authentication**: `REPLIT_DOMAINS`, `ISSUER_URL`, `SESSION_SECRET`
- **AI**: `OPENAI_API_KEY` for GPT-4 integration
- **Build**: `NODE_ENV` for environment-specific configuration

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **January 06, 2025**: Fixed mortgage balance calculation issues in both annual and monthly views
- **January 06, 2025**: Implemented conservative accelerated payoff logic that spreads payments over target period
- **January 06, 2025**: Capped extra mortgage payments at 10% of remaining balance to prevent overly aggressive payoff
- **January 06, 2025**: Ensured mortgage balance reduces gradually over full 24-month acceleration period
- **January 06, 2025**: Implemented shared scenario storage system - all saved scenarios are now accessible by all users
- **January 06, 2025**: Added "Set as Default" and "Reset to Default" functionality for personalized baseline settings
- **January 06, 2025**: Fixed Social Security eligibility calculation to work month-by-month with precise birth date handling
- **January 06, 2025**: Fixed monthly view year dropdown to correctly display "Year 1 (2025)" instead of "Year 1 (2024)"
- **January 06, 2025**: Monthly projections now properly start from June 2025 as intended
- **January 06, 2025**: Changed Jessica's default monthly income from $1,250 to $2,000
- **January 06, 2025**: Updated End of Life calculations with correct Social Security survivor benefit rules
- **January 06, 2025**: When Paul dies, Jessica receives 100% of Paul's SS benefit but loses her own
- **January 06, 2025**: When Jessica dies, only her SS stops (Paul keeps his benefit)
- **January 06, 2025**: VA Disability stops when Paul dies, with survivor benefit rules
- **January 06, 2025**: VA Disability survivor benefit: Jessica gets 50% only if Paul dies in March 2035 or later (zero benefits for all years if Paul dies before March 2035)

## Changelog

Changelog:
- July 06, 2025. Initial setup