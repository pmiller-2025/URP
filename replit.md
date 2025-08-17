# URP - Ultimate Retirement Planner

## Overview
URP (Ultimate Retirement Planner) is a comprehensive web application designed to provide detailed 30-year retirement cash flow projections, offering both annual and monthly views. This full-stack TypeScript application, featuring a React frontend and Express backend, includes AI-powered financial analysis and scenario comparison capabilities. The vision is to empower users with clear, actionable insights into their financial future, enabling informed decision-making for retirement planning.

## Recent Changes (August 2025)
- **Fixed Critical Social Security Bug**: Resolved issue where Paul's Social Security benefits incorrectly stopped in January 2033 due to End of Life age being set to 70 instead of 100
- **Enhanced Birth Month Logic**: Implemented proper Social Security benefit timing based on birth months - Jessica's Tier 1 starts January 2031 (age 62), increases to Tier 1+Tier 2 when Paul starts August 2032 (age 70)
- **Mortgage Calculations**: Finalized $37,400 balance with 10-month accelerated payoff saving $1,030.98 in interest
- **Personal Details Updated**: Paul (July 1962, age 63), Jessica (December 1968, age 56), with accurate Social Security timing calculations
- **Income Timeline Chart Added**: New visualization showing stacked bar chart of income sources over time, with annual and monthly views to track transition from work income to retirement benefits
- **Fixed Business Income Default**: Updated localStorage migration to correct business income from old $2000 default to new $4000 default for deployed app consistency
- **Complete UI Redesign**: Transformed vertical column layout to horizontal stacked sections with collapsible functionality for improved user experience and visual balance
- **Four-Section Layout**: Organized input sections as Personal Information → Income → Benefits → Living Expenses in logical workflow order with expand/collapse capability

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library, using Radix UI primitives
- **Visualization**: Interactive HTML5 Canvas-based charts for savings projections and cash flow analysis.
- **Reporting**: Summary cards for key metrics and responsive tables with configurable column visibility.

### Technical Implementations
- **Frontend State Management**: React hooks with TanStack Query for server state.
- **Frontend Routing**: Wouter for lightweight client-side routing.
- **Backend Runtime**: Node.js with Express.js framework.
- **Database**: PostgreSQL with Neon serverless connection.
- **ORM**: Drizzle ORM for type-safe database operations and schema management.
- **Authentication**: Replit Auth with session-based authentication.
- **AI Integration**: OpenAI API for financial analysis and scenario comparison.
- **Data Validation**: Zod for runtime type checking.

### Feature Specifications
- **Core Calculator Engine**: Provides real-time calculations with dual annual/monthly views, including individual tax rates, mortgage amortization with extra payments, investment growth with compounding, and inflation adjustments.
- **AI-Powered Features**: Offers AI-driven financial insights, scenario comparison, and a natural language interface for plan adjustments.
- **User Management**: Supports Replit OAuth with invite-based access control, allowing users to save, load, and compare multiple retirement scenarios with data persistence.
- **Data Flow**: User inputs drive real-time calculations, data is persisted to PostgreSQL, processed by OpenAI for AI analysis, and results are visualized through charts and summary cards, enabling scenario export and comparison.

### System Design Choices
- **Full-Stack TypeScript**: Ensures type safety across both frontend and backend.
- **Serverless Database**: Utilizes Neon PostgreSQL for scalable and efficient data storage.
- **Modular Component Design**: Employs shadcn/ui and Radix UI for reusable and consistent UI components.
- **Separation of Concerns**: Clear distinction between frontend (React) and backend (Express) responsibilities.

## External Dependencies
- **@neondatabase/serverless**: For PostgreSQL serverless database connections.
- **@tanstack/react-query**: For server state management and data caching on the frontend.
- **@radix-ui/react-***: Core UI component primitives.
- **drizzle-orm**: For type-safe database interactions and ORM functionalities.
- **openai**: To integrate AI capabilities for financial analysis.
- **bcryptjs**: Used for password hashing, primarily in development authentication.
- **Vite**: Frontend build tool.
- **ESBuild**: Backend bundling for production deployments.
- **TypeScript**: Core language for type safety.
- **Tailwind CSS**: Utility-first CSS framework for styling.
```