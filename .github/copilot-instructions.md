# Copilot Instructions for Calorie Tracker App

## Project Overview

This is an AI-powered calorie tracking application built as a full-stack portfolio project. The core innovation is a **hybrid AI workflow** that analyzes food photos using Google's Gemini Vision API and enriches results with Spoonacular API nutritional data.

## Architecture & Tech Stack

**Frontend**: React Native with Expo (mobile-first approach)
**Backend**: Node.js with Express.js 
**Database**: PostgreSQL
**Key APIs**: Google Gemini Vision, Spoonacular API, Open Food Facts API
**Auth**: JWT-based authentication
**DevOps**: Docker containerization, GitHub Actions CI/CD

## Project Structure

```
├── client/          # React Native (Expo) mobile app
├── server/          # Node.js/Express backend API
├── .gitignore       # Standard Node.js + React Native ignores
└── README.md        # Project roadmap and feature specs
```

## Development Phases & Current Status

The project follows a **4-phase roadmap** (see README.md). Currently in **pre-Phase 1** - project initialization stage.

### Phase 1: Core Functionality
- User Authentication (Register/Login with JWT)
- Manual Food Search & Logging (Spoonacular integration)
- Basic Calorie & Macro Tracking Dashboard

### Phase 2: AI & Advanced Features  
- **Hybrid AI Meal Analysis**: Photo → Gemini Vision → Component identification → Spoonacular nutrition lookup
- Interactive Confirmation UI for AI suggestions
- Barcode Scanning (Open Food Facts API)

### Phase 3: Community Features
- Social Groups & Weekly Leaderboards
- Streaks & Achievement System

## Key Development Patterns

### AI Workflow Architecture
When implementing the hybrid AI system:
1. **Photo Capture** → Gemini Vision API for food identification
2. **Component Extraction** → Parse AI response into individual food items
3. **Nutrition Lookup** → Map each item to Spoonacular API for detailed macros
4. **Confirmation UI** → Present editable list for user verification before logging

### Database Design Priorities
- **User-centric data model**: All entities link to user accounts
- **Flexible food logging**: Support both AI-analyzed meals and manual entries
- **Social features preparation**: Design for future group/leaderboard functionality
- **Audit trail**: Track food entry sources (AI, manual, barcode)

### Mobile-First API Design
- Design REST endpoints for React Native consumption
- Implement offline-capable data structures
- Optimize for mobile network conditions
- Consider push notification infrastructure early

## Development Workflow

### Initial Setup Commands
```bash
# Backend setup
cd server
npm init -y
npm install express mongoose jsonwebtoken bcryptjs cors dotenv

# Frontend setup  
cd client
npx create-expo-app --template blank-typescript
npm install @react-navigation/native @react-navigation/stack
```

### Environment Configuration
- Use `.env` files for API keys (Gemini, Spoonacular)
- Separate staging/production database configs
- Configure Expo environment variables for mobile build

### Testing Strategy
- **Backend**: Jest + Supertest for API endpoints
- **Frontend**: Jest + React Native Testing Library
- **AI Integration**: Mock API responses for consistent testing
- **E2E**: Detox for React Native app flows

## External API Integration Notes

### Google Gemini Vision
- Implement rate limiting and error handling
- Cache food identification results to avoid redundant calls
- Design fallback UX when AI analysis fails

### Spoonacular API
- Implement efficient search and nutrition lookup
- Consider local caching for frequently accessed foods
- Handle API quotas and implement graceful degradation

### Open Food Facts (Barcode)
- Free API - implement as primary barcode data source
- Design UPC/EAN barcode scanning workflow
- Handle cases where barcode lookup fails

## Code Organization Principles

- **Separation of Concerns**: Keep AI logic, nutrition data, and user management as distinct modules
- **API Versioning**: Design `/api/v1/` structure from the start
- **Error Boundaries**: Implement comprehensive error handling for AI workflow failures  
- **Modular Components**: Build reusable UI components for food item display/editing
- **State Management**: Consider Redux Toolkit for complex AI workflow state

## Security Considerations

- Secure JWT implementation with refresh tokens
- Sanitize all food photo uploads
- Rate limit AI API endpoints
- Validate all user inputs for food logging
- HTTPS enforcement for production deployment