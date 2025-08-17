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
- **January 06, 2025**: Added chart selection dropdown with multiple visualization options
- **January 06, 2025**: Implemented Cash Flow Analysis chart showing monthly income vs expenses trends
- **January 06, 2025**: Charts now include: Savings & Net Worth projection, Cash Flow Analysis with income/expense breakdown
- **January 06, 2025**: Changed projections to start from January 2025 instead of June 2025
- **January 06, 2025**: First 5 months (Jan-May 2025) show zero values for income and expenses
- **January 06, 2025**: Actual retirement calculations begin from June 2025 as originally planned
- **January 18, 2025**: Updated to start projections from September 2025 - all months now show active calculations
- **January 06, 2025**: Added time frame selector to Cash Flow Analysis chart (5, 10, 15, 20, 25, 30 years)
- **January 06, 2025**: Cash flow chart now dynamically adjusts grid lines and labels based on selected time frame
- **January 06, 2025**: Added stacked income source visualization to Cash Flow Analysis chart
- **January 06, 2025**: Individual income sources now displayed as colored stacked areas (Paul SS, Jessica SS, VA Disability, Business, Jessica Work, Chapter 35)
- **January 06, 2025**: Updated chart legend to show all income sources with corresponding colors
- **January 06, 2025**: Replaced Social Security dropdown with custom input fields for monthly amounts
- **January 06, 2025**: Added month/year start date fields for Paul and Jessica Social Security benefits
- **January 06, 2025**: Updated calculation logic to use specific start dates instead of age-based eligibility
- **January 06, 2025**: Removed prefilled benefit amounts - users now have full control over SS benefit amounts and timing
- **January 06, 2025**: Changed Social Security inputs from month/year to age-based start dates with birth month timing
- **January 06, 2025**: Implemented two-tier Social Security system for Jessica
- **January 06, 2025**: Jessica Tier 1: Own benefit starts at specified age in birth month (October)
- **January 06, 2025**: Jessica Tier 2: 50% spousal benefit starts when Paul begins receiving his benefit
- **January 06, 2025**: Added visual distinction with colored sections for both Social Security tiers
- **January 06, 2025**: Fixed mortgage balance calculation to show beginning-of-month balance instead of end-of-month
- **January 06, 2025**: Mortgage balance now displays proper gradual decline month by month
- **January 11, 2025**: Resolved production deployment mortgage calculation issue with enhanced edge case handling
- **January 11, 2025**: Added robust fallback logic for mortgage payments after target payoff period expires
- **January 11, 2025**: Fixed mortgage balance premature payoff issue in production environment
- **January 11, 2025**: Fixed accelerated mortgage payment display to show regular payment + extra payment
- **January 11, 2025**: Enhanced payment calculation logic to properly reflect accelerated payoff schedule
- **January 11, 2025**: Mortgage payments now transparently show base payment plus acceleration amount
- **January 11, 2025**: Resolved mortgage payment inconsistency between year views in monthly table
- **January 11, 2025**: Updated previous year calculation logic to match current accelerated payment method
- **January 11, 2025**: Monthly table now displays consistent accelerated payment amounts across all years
- **January 11, 2025**: Changed Jessica's Tier 2 Social Security from automatic calculation to custom data entry field
- **January 11, 2025**: Users can now manually enter Jessica's spousal benefit amount instead of automatic 50% calculation
- **January 11, 2025**: Updated both monthly and annual projection logic to use custom spousal benefit amounts
- **January 11, 2025**: Fixed Jessica's Social Security to be total of both tiers (Tier 1 + Tier 2) instead of switching between them
- **January 11, 2025**: Before Paul starts benefits: Jessica gets Tier 1 only; After Paul starts: Jessica gets Tier 1 + Tier 2 combined
- **January 11, 2025**: Added "Return on Investments" column to both annual and monthly reports
- **January 11, 2025**: Investment returns calculated from total savings balance (including cash flow and contributions)
- **January 11, 2025**: Returns shown as gross amounts before taxes, with taxes applied at specified investment gains tax rate
- **January 11, 2025**: Monthly returns calculated from current savings balance after cash flow applied
- **January 11, 2025**: Annual returns calculated from total savings balance including all contributions
- **January 11, 2025**: Fixed NaN calculation errors in year 2033+ by adding comprehensive NaN safety checks throughout calculator
- **January 11, 2025**: Investment taxes now properly included in total tax columns for both monthly and annual views
- **January 11, 2025**: Net investment returns (after taxes) are added back to savings balance for proper compounding
- **January 11, 2025**: Added safety checks to prevent calculations on negative savings balances
- **January 18, 2025**: Updated Jessica's Tier 1 Social Security default to $872/month
- **January 18, 2025**: Updated Jessica's Tier 2 spousal benefit default to $263/month
- **January 18, 2025**: Updated Paul's Social Security default to $3,968/month at age 70
- **January 18, 2025**: Added automatic migration to update cached Social Security values to new defaults
- **January 18, 2025**: Updated mortgage balance default to $37,400
- **January 18, 2025**: Updated lump sum payment default to $0
- **January 18, 2025**: Updated target payoff months default to 10 months
- **January 18, 2025**: Updated Jessica's work income duration to 12 months
- **January 18, 2025**: Corrected Jessica's birth month to December 1968 (original correct date)
- **January 18, 2025**: Updated retirement calculations to start from September 2025 instead of January 2025
- **January 18, 2025**: Updated initial savings balance default to $30,000
- **January 18, 2025**: Fixed mortgage payment calculations to start from September 2025 - payments now apply correctly from month 1
- **January 18, 2025**: Updated business income to start from month 1 (September 2025)
- **January 18, 2025**: Updated Paul's current age from 62 to 63
- **January 18, 2025**: Updated Paul's birth month from June to July 1962
- **January 18, 2025**: Updated Jessica's work income to start from month 1 (September 2025)
- **January 18, 2025**: Updated Chapter 35 benefits to start from month 1 (September 2025)
- **January 18, 2025**: Changed default view mode from annual to monthly

## Changelog

Changelog:
- July 06, 2025. Initial setup