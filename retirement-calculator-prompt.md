# Ultimate Retirement Planner - Complete Build Prompt

Create a comprehensive retirement cash flow calculator web application that provides detailed 30-year financial projections with advanced modeling capabilities.

## 🎯 Core Requirements

### Project Overview
Build "URP - Ultimate Retirement Planner" - a sophisticated retirement calculator featuring:
- 30-year cash flow projections with monthly and annual views
- Advanced Social Security benefit modeling with spousal strategies
- Mortgage amortization with accelerated payoff options
- Investment growth with realistic market assumptions
- AI-powered financial analysis and recommendations
- Multi-scenario comparison and saving capabilities

### Technical Stack
- **Frontend**: React 18 with TypeScript, Vite build tool
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI API for financial insights
- **Charts**: Custom HTML5 Canvas-based visualizations
- **State Management**: React hooks with TanStack Query

## 📊 Financial Modeling Requirements

### Personal Information
- **Family Details**: Paul (age 63, born July 1962), Jessica (age 56, born December 1968), Luke (age 20, born November 2004)
- **End of Life Planning**: Default to age 100 for both spouses for comprehensive planning
- **Projection Period**: 30-year default timeline with configurable options

### Social Security System
Implement sophisticated two-tier Social Security system:

**Paul's Benefits**:
- Full benefit at age 70: $3,968/month
- Start date: August 2032 (birth month timing)
- Taxable at configurable rate

**Jessica's Two-Tier System**:
- **Tier 1** (Own Benefit): $872/month starting January 2031 (age 62)
- **Tier 2** (Spousal Benefit): +$263/month when Paul starts (August 2032)
- Birth month logic: Benefits start in December when age is reached

**Critical Features**:
- Annual COLA adjustments (default 3%)
- Proper birth month timing for benefit starts
- Taxable/non-taxable options per person
- Integration with overall tax calculations

### Income Modeling
**VA Disability Benefits**:
- $4,050/month non-taxable
- 3% annual increases
- Lifetime duration

**Business Income**:
- Default: $4,000/month
- Duration: 60 months (5 years)
- Start: Month 1 of projection
- Taxable income

**Jessica's Work Income**:
- Default: $2,000/month
- Duration: 12 months
- Taxable income

**Chapter 35 Education Benefits**:
- $1,000/month non-taxable
- Duration: 24 months

**Additional Income Streams**:
- 3 configurable additional income sources
- Custom names, amounts, durations, and tax status

### Housing & Mortgage
**Property Details**:
- Home value: $1,000,000
- Annual appreciation: 2.5%

**Mortgage Modeling**:
- Current balance: $37,400
- Interest rate: 5.5%
- Monthly payment: $1,816.92
- Accelerated payoff: 10 months (target payoff June 2026)
- Interest savings calculation: $1,030.98
- Optional lump sum payments

### Investment & Savings
**Account Modeling**:
- Initial balance: $30,000
- Annual return rate: 5% default
- Tax on gains: 15% capital gains rate
- Additional annual contributions

**Asset Allocation Strategies**:
- Conservative: 40% stocks, 50% bonds, 10% cash (4.5% expected return)
- Balanced: 60% stocks, 35% bonds, 5% cash (6.2% expected return)  
- Aggressive: 70% stocks, 15% bonds, 15% international (8.5% expected return)
- Custom allocation option

### Expense Management
**Budget System**:
- Fixed monthly amount option
- Detailed category breakdown:
  - Housing & Utilities: $1,500
  - Food & Dining: $800
  - Transportation: $600
  - Healthcare: $400
  - Entertainment: $300
  - Personal Care: $200
  - Clothing: $150
  - Gifts & Donations: $250
  - Miscellaneous: $300

**Special Expenses**:
- Life Insurance: $500/month (configurable duration)
- 3 additional custom expense categories
- Inflation adjustments (3% default)

### Tax System
**Tax Rates Configuration**:
- Federal income tax: 22%
- Social Security tax: 15% 
- Business income tax: 25%
- Capital gains tax: 15%
- State tax considerations

## 🎨 User Interface Design

### Layout & Navigation
- Clean, modern design with purple/yellow robot branding theme
- Tabbed interface for major sections: Inputs, Results, Charts, Scenarios, AI
- Responsive design for desktop and mobile
- Dark/light mode support

### Input Sections
**Personal Information Tab**:
- Age calculators with birth date inputs
- End of life age sliders
- Projection year selector

**Income & Benefits Tab**:
- Social Security calculator with benefit optimization
- VA Disability with automatic increases
- Business income with duration controls
- Multiple additional income streams

**Housing & Mortgage Tab**:
- Mortgage amortization calculator
- Accelerated payoff modeling
- Home appreciation tracking
- Refinancing scenario analysis

**Investments & Savings Tab**:
- Asset allocation pie charts
- Expected return calculations
- Tax efficiency analysis
- Rebalancing strategies

**Expenses & Budget Tab**:
- Category-based budget builder
- Inflation adjustment controls
- Special expense planning
- Cost of living calculators

### Results & Visualization
**Summary Dashboard**:
- Key metrics cards: Total savings, monthly cash flow, payoff dates
- Progress indicators and milestones
- Warning alerts for negative cash flow periods

**Interactive Charts**:
- Savings growth projection with compound interest visualization
- Monthly cash flow chart with income/expense breakdowns
- Net worth trajectory over 30 years
- Social Security benefit timeline
- Mortgage payoff visualization

**Data Tables**:
- Annual projections with expandable monthly details
- Configurable column visibility
- Export capabilities (CSV/PDF)
- Year-over-year comparison views

## 🤖 AI Integration

### OpenAI Implementation
**Financial Analysis Features**:
- Scenario optimization recommendations
- Risk assessment and mitigation strategies  
- Personalized retirement advice based on cash flow patterns
- Market condition impact analysis

**Conversational Interface**:
- Natural language queries: "What if I retire at 65?"
- Plan adjustment suggestions
- Educational content about financial concepts
- Warning system for risky financial decisions

**AI Dialogue Component**:
- Chat-style interface with URP robot personality
- Context-aware responses based on current scenario
- Actionable recommendations with one-click implementation
- Learning from user preferences and adjustments

## 🔧 Advanced Features

### Scenario Management
**Multi-Scenario Comparison**:
- Save and name different retirement strategies
- Side-by-side comparison views
- Best/worst case scenario modeling
- Stress testing with market downturns

**Template Scenarios**:
- Conservative retirement approach
- Aggressive early retirement
- Healthcare-focused planning
- Estate planning optimization

### Calculation Engine
**Core Algorithms**:
- Compound interest calculations with monthly compounding
- Mortgage amortization with extra payment modeling
- Social Security benefit optimization with timing strategies
- Tax-efficient withdrawal sequencing
- Inflation adjustments across all categories

**Performance Optimization**:
- Real-time calculations with debounced updates
- Efficient state management for complex scenarios
- Caching of expensive calculations
- Progressive loading for large datasets

### Data Persistence
**State Management**:
- LocalStorage for quick saves and default preferences
- PostgreSQL for named scenarios and sharing
- Automatic backup of work in progress
- Version history for scenario changes

**Sharing & Collaboration**:
- Public scenario sharing with unique URLs
- Financial advisor collaboration features
- Family member access controls
- Print-friendly reports

## 📱 Technical Implementation

### Database Schema
**Core Tables**:
```sql
-- Users table for authentication
users (id, email, name, created_at, updated_at)

-- Scenarios table for saving calculations
scenarios (id, user_id, name, data_json, created_at, updated_at, is_public)

-- Sessions table for authentication
sessions (sid, sess, expire)
```

### API Endpoints
**Scenario Management**:
- GET /api/scenarios - List saved scenarios
- POST /api/scenarios - Create new scenario
- PUT /api/scenarios/:id - Update scenario
- DELETE /api/scenarios/:id - Delete scenario
- GET /api/scenarios/:id/share - Get shareable link

**AI Integration**:
- POST /api/ai/analyze - Get AI analysis of current scenario
- POST /api/ai/optimize - Get optimization suggestions
- POST /api/ai/chat - Conversational interface

### Component Architecture
**Input Components**:
- PersonalInfoSection with age calculators
- IncomeSection with multiple income types
- HousingSection with mortgage modeling
- InvestmentSection with allocation tools
- ExpenseSection with budget categories

**Visualization Components**:
- SavingsChart with interactive timeline
- CashFlowChart with monthly breakdown
- SummaryCards with key metrics
- ResultsTable with drill-down capability

**AI Components**:
- AIDialogue with chat interface
- ScenarioOptimizer with recommendations
- RiskAnalyzer with warning system

## 🚀 Success Metrics

### Calculation Accuracy
- Precise mortgage amortization matching financial calculators
- Social Security timing accurate to birth month
- Tax calculations reflecting current rates
- Investment returns with realistic market assumptions

### User Experience
- Sub-second response times for calculations
- Intuitive navigation requiring minimal explanation
- Mobile-responsive design working on all devices
- Error handling with helpful guidance messages

### Advanced Functionality
- AI recommendations that provide actionable insights
- Scenario comparison revealing meaningful differences
- Export capabilities producing professional reports
- Sharing features enabling collaboration

## 🎯 Implementation Priority

### Phase 1: Core Calculator (Week 1-2)
1. Basic input forms with validation
2. Core calculation engine
3. Simple results display
4. Data persistence with localStorage

### Phase 2: Advanced Features (Week 3-4)
1. Interactive charts and visualizations
2. Scenario saving and management
3. Advanced mortgage and SS modeling
4. Professional styling and UX

### Phase 3: AI Integration (Week 5-6)
1. OpenAI API integration
2. Conversational interface
3. Optimization recommendations
4. Risk analysis features

### Phase 4: Polish & Deploy (Week 7-8)
1. Mobile responsiveness
2. Performance optimization
3. Error handling and edge cases
4. Documentation and deployment

## 📋 Quality Checklist

### Financial Accuracy
- [ ] Social Security benefits start in correct birth months
- [ ] Mortgage calculations match amortization schedules
- [ ] Tax calculations reflect current brackets
- [ ] Investment returns include realistic volatility
- [ ] Inflation adjustments compound properly

### Technical Quality
- [ ] TypeScript strict mode with no errors
- [ ] Responsive design works on mobile devices
- [ ] Performance optimized for real-time calculations
- [ ] Error boundaries handle edge cases gracefully
- [ ] Accessibility compliance for screen readers

### User Experience
- [ ] Intuitive workflow requiring minimal learning
- [ ] Visual feedback for all user actions
- [ ] Help text and tooltips for complex concepts
- [ ] Professional appearance suitable for financial planning
- [ ] Export and sharing capabilities work reliably

---

**Build a retirement calculator that financial advisors would recommend to their clients - comprehensive, accurate, and incredibly user-friendly. The goal is to demystify retirement planning through powerful calculations and AI-guided insights.**

Start with the core calculation engine, then layer on the advanced features. Focus on accuracy first, user experience second, and advanced features third. Every calculation should be verifiable against standard financial planning tools.