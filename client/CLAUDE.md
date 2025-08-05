# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm start` - Run the development server on http://localhost:3000
- `npm run build` - Build the app for production to the `build` folder
- `npm test` - Run tests in interactive watch mode
- `npm run deploy` - Deploy to GitHub Pages
- `npm run server` - Run JSON server on port 3001 (mock API)

### Code Formatting
- Prettier is configured with specific rules (tabs, single quotes, trailing commas)
- No explicit lint command - ESLint is configured via Create React App defaults

## Architecture Overview

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: Zustand stores in `/src/store/`
- **Styling**: Tailwind CSS with custom animations
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with auth interceptors
- **Rich Text**: React Quill
- **Payments**: Toss Payments SDK

### Project Structure
- `/src/api/` - API layer with Axios instances (auth/non-auth)
- `/src/component/` - Reusable components organized by feature
- `/src/pages/` - Route page components
- `/src/store/` - Zustand stores for global state
- `/src/types/` - TypeScript type definitions
- `/src/utils/` - Utility functions
- `/src/schema/` - Zod validation schemas

### Key Architectural Patterns

1. **API Layer**: Two Axios instances
   - `axiosInstance` - Public endpoints
   - `axiosInstanceWithAuth` - Protected endpoints with token interceptors
   - Tokens stored in sessionStorage (Authorization, RefreshToken)

2. **State Management**: Zustand stores for
   - Member data (`MemberStore`)
   - Mentee data (`MenteeStore`)
   - Mentoring data (`MentoringStore`)
   - UI state (Modal, Toast)

3. **Component Organization**:
   - Common components in `/component/common/`
   - Feature-specific components grouped in folders
   - Custom hooks in `/hooks/`

4. **Routing**: Centralized in `Router.tsx`
   - Main routes: /, /signup, /auth, /mentorlist, /user, /creatementoring
   - Payment routes: /paymentcompleted, /paymentfailed

5. **Styling**: Tailwind with custom theme
   - Custom colors: primary, secondary, additional1-3
   - Custom animations: fadeIn, shake, jelly, etc.
   - Custom fonts: PartialSansKR, GmarketSans

### Environment Variables
- `REACT_APP_BASE_URL` - API base URL (required)

### Code Conventions
- Prettier formatting with tabs, single quotes
- TypeScript for all components
- Barrel exports for API types
- Consistent file naming (PascalCase for components, camelCase for utilities)