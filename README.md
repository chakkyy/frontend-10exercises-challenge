# Frontend Challenge - Carlos Ramirez

A showcase of 10 frontend engineering exercises demonstrating skills in React, TypeScript, Testing, Performance Optimization, and User Experience Design.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Project Structure

```
CarlosRamirez/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage with exercise cards
│   ├── globals.css         # Global styles
│   ├── exercise1/          # SCSS & Responsive Navigation
│   ├── exercise2/          # Accessible Newsletter Form
│   ├── exercise3/          # Shopping Cart State Management
│   ├── exercise4/          # Data Fetching Dashboard
│   ├── exercise5/          # Internationalization (i18n)
│   ├── exercise6/          # Testing Strategy
│   ├── exercise7/          # Invoice Form Validation
│   ├── exercise8/          # Performance Optimization
│   ├── exercise9/          # Role-Based Access Control (RBAC)
│   └── exercise10/         # UX Problem Solving
├── components/             # Shared components
│   └── ui/                 # shadcn/ui components
└── lib/                    # Shared utilities
```

## 🛠 Tech Stack

### Core

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety (strict mode)
- **pnpm** - Fast, efficient package manager

### Styling

- **TailwindCSS 4** - Utility-first CSS
- **shadcn/ui** - Accessible component library
- **SCSS** - CSS preprocessor (Exercise 1)
- **PostCSS** - CSS transformations

### State & Data

- **React Hooks** - useState, useEffect, useCallback, useMemo
- **localStorage API** - Client-side persistence
- **BroadcastChannel API** - Multi-tab synchronization
- **Native Fetch API** - HTTP requests
- **React Hook Form** - Form handling (Exercise 7 )
- **Yup** - Schema validation (Exercise 7 )

### Testing

- **Jest** - Unit testing framework
- **Testing Library** - React component testing
- **Playwright** - End-to-end testing

### Code Quality

- **ESLint** - Linting with Next.js config
- **Prettier** - Code formatting
- **TypeScript strict mode** - No `any` types allowed

## 📋 Exercises Overview

### Exercise 1: SCSS & Responsive Navigation

**Technologies**: SCSS, BEM, Responsive Design  
**Highlights**:

- Traditional SCSS with BEM methodology
- Responsive breakpoints (mobile/desktop)
- Active link highlighting
- Comprehensive SCSS organization guide
- References [my article on modern styling](https://cramirez.is-a.dev/articles/modern-styling-in-react/)

### Exercise 2: Accessible Newsletter Form

**Technologies**: HTML5, ARIA, Accessibility  
**Highlights**:

- Accessibility compliant
- Semantic HTML structure
- Full keyboard navigation
- Screen reader support
- HTML5 validation

### Exercise 3: Shopping Cart State Management

**Technologies**: localStorage, BroadcastChannel API, TypeScript  
**Highlights**:

- Add/remove products
- Persistent cart (survives reload)
- Multi-tab synchronization
- Robust error handling
- Edge case management

### Exercise 4: Data Fetching Dashboard

**Technologies**: Fetch API, Sorting, Filtering  
**Highlights**:

- Public API integration
- Responsive table design
- Client-side sorting/filtering
- Loading skeletons
- Error boundaries

### Exercise 5: Internationalization (i18n)

**Technologies**: Intl API, Timezones, Currency  
**Highlights**:

- Date formatting with timezones
- Currency formatting with locales
- Edge case handling
- Comprehensive unit tests
- No external i18n library needed

### Exercise 6: Testing Strategy

**Technologies**: Jest, Playwright, MSW  
**Highlights**:

- Unit tests with Jest
- E2E tests with Playwright
- Testing best practices
- Unit vs E2E comparison

### Exercise 7: Invoice Form Validation

**Technologies**: Yup, Async Validation  
**Highlights**:

- Three-field invoice form
- Async unique invoice number check (Simulated backend call)
- Date validation (no future dates)
- Email format validation
- Real-time error display

### Exercise 8: Performance Optimization

**Technologies**: react-window, Virtualization  
**Highlights**:

- Before/after comparison
- Event delegation vs individual listeners
- Virtual scrolling for large lists
- Performance measurement techniques
- Memory optimization

### Exercise 9: Role-Based Access Control (RBAC)

**Technologies**: TypeScript, Permissions  
**Highlights**:

- Role-based permission system
- Admin, Editor, Viewer roles
- Conditional rendering
- HOC and hook patterns
- Comprehensive permission tests

### Exercise 10: UX Problem Solving

**Technologies**: UX Analysis, Design Thinking  
**Highlights**:

- User feedback analysis
- Three concrete solutions
- Tradeoff evaluation
- Recommendation with rationale
- Interactive mockups

## 🎯 Key Features

### Modern Architecture

- Server Components where beneficial
- Client Components for interactivity
- Proper use of React 19 features
- TypeScript strict mode throughout

### Accessibility First

- Accessibility compliance
- Semantic HTML
- Keyboard navigation
- Screen reader support
- ARIA attributes

### Performance Optimized

- Code splitting (automatic with Next.js)
- Lazy loading
- Virtual scrolling
- Memoization patterns
- Optimized images

### Production Ready

- Error boundaries
- Loading states
- Error handling
- Type safety
- Comprehensive tests

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
pnpm test
```

### E2E Tests

```bash
# Run Playwright tests
pnpm test:e2e
```

## 📖 Documentation

Each exercise includes:

- **README.md** - Problem statement (from original requirements)
- **solution.md** - Detailed implementation explanation with approach, tradeoffs, and key decisions
- **Components** - Working, interactive solution demonstrating the implementation
- **Tests** - Comprehensive test coverage (unit tests with Jest, E2E tests with Playwright)

## 📝 Notes on Implementation Choices

### Why TailwindCSS + SCSS?

This project uses **TailwindCSS for most styling** but demonstrates **SCSS in Exercise 1**. This hybrid approach shows:

- Proficiency in both modern (Tailwind) and traditional (SCSS) approaches
- Understanding of when to use each tool
- Real-world pragmatism over dogmatism

### Why shadcn/ui?

- Built on Radix UI (accessible primitives)
- Fully customizable (not a black box)
- TypeScript-first
- No runtime overhead
- Industry best practices

### Why No State Management Library?

- React hooks are sufficient for this scope
- Demonstrates understanding of when NOT to add complexity
- Shows proficiency with native React patterns
- Easier for reviewers to understand

## 🚀 Deployment

This project is ready deployed on Vercel:

[Deploy Link](linkhere)

## 👤 Author

**Carlos Ramirez**

- Portfolio: [cramirez.is-a.dev](https://cramirez.is-a.dev)
- LinkedIn: [Carlos Ramirez](https://www.linkedin.com/in/carlosramirezdev/)

## 📄 License

This project is part of a take-home challenge for a Frontend Engineer position.
