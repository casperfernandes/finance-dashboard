# Personal Finance Dashboard

A modern, responsive personal finance dashboard built with React, TypeScript, and Tailwind CSS. Track your daily expenses, manage budgets, and gain insights into your spending patterns with beautiful visualizations.

![Finance Dashboard](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-v4-38bdf8) ![Vite](https://img.shields.io/badge/Vite-7.1-646cff)

## 🌟 Features

### 📊 Expense Management
- **Add, Edit, and View Expenses**: Complete CRUD operations for expense tracking
- **Smart Categorization**: Organize expenses with default categories (Food, Transportation, Shopping, Bills & Utilities, Entertainment, Travel, Miscellaneous) or create custom ones
- **Monthly Filtering**: Filter and view expenses by specific months
- **Responsive Design**: Seamless experience across desktop and mobile devices

### 💰 Budget Management
- **Monthly Budget Setting**: Set and edit monthly budget goals
- **Real-time Tracking**: Monitor total spent vs. remaining budget
- **Daily Spending Insights**: Calculate optimal daily spending for the rest of the month
- **Visual Progress Indicators**: Intuitive progress bars and percentage displays
- **Test Data Generation**: Quick setup with sample expenses for demonstration

### 📈 Analytics & Visualizations
- **Category-wise Spending Charts**: Interactive pie charts showing spending distribution
- **Recent Expenses Overview**: Quick access to your latest transactions
- **Spending Analytics**: Comprehensive insights into your financial patterns
- **Performance Optimized**: Efficient data processing with React optimization techniques

### 🎨 User Experience
- **Mobile-First Design**: Optimized for all screen sizes with Tailwind CSS
- **Intuitive Navigation**: Clean, modern interface with easy-to-use controls
- **Loading States**: Smooth loading indicators for better UX
- **Form Validation**: Comprehensive input validation for data integrity

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/casperfernandes/finance-dashboard.git
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🏗️ Architecture & Technical Decisions

### 🔧 Tech Stack

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **React 18.3.1** | UI Framework | Modern hooks, concurrent features, excellent ecosystem |
| **TypeScript** | Type Safety | Enhanced developer experience, better code quality |
| **Vite** | Build Tool | Fast development server, optimized builds |
| **Tailwind CSS v4** | Styling | Utility-first CSS, excellent responsiveness |
| **Zustand** | State Management | Lightweight, simple API, great TypeScript support |
| **React Query** | Data Fetching | Caching, synchronization, background updates |
| **Recharts** | Data Visualization | React-compatible charts, good customization |
| **Lucide React** | Icons | Consistent, customizable icon set |

### 🏛️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (navbar, header, loader)
│   ├── ui/              # Generic UI components
│   │   ├── modals/      # Modal components
│   │   └── tables/      # Table components
│   └── views/           # Page-level components
├── hooks/               # Custom React hooks
├── services/            # API and data services
├── stores/              # Zustand state stores
├── types/               # TypeScript type definitions
├── utils.ts             # Utility functions
└── assets/              # Static assets
```

### 🎯 State Management Strategy

**Zustand for Global State**
- **Why Zustand**: Chosen over Redux for its simplicity and excellent TypeScript support
- **Store Structure**: Separate stores for UI state and data management
- **Benefits**: Minimal boilerplate, intuitive API, great performance

**React Query for Server State**
- **Data Fetching**: Handles API calls, caching, and synchronization
- **Cache Management**: Automatic background updates and cache invalidation
- **Error Handling**: Built-in error boundaries and retry mechanisms

**Local Component State**
- **Form Management**: useState for form inputs and local UI state
- **Performance**: useMemo and useCallback for expensive calculations

### 🔄 Data Flow Architecture

**Data Fetching Flow:**
```
User Interaction → Component → Custom Hook (React Query) → Service Layer → Local Storage
```

**UI State Flow:**
```
User Interaction → Component → Zustand Store → UI Updates
```

### 📱 Responsive Design Approach

**Mobile-First Strategy**
- **Breakpoints**: Tailwind's default breakpoints (sm, md, lg, xl)
- **Navigation**: Adaptive navigation for different screen sizes
- **Tables**: Horizontal scrolling on mobile devices
- **Modals**: Full-screen on mobile, centered on desktop

### ⚡ Performance Optimizations

**React Optimizations**
- **useMemo**: Expensive calculations (category data processing)
- **Single-loop Processing**: Consolidated analytics calculations

## 📋 Data Models

### Expense Interface
```typescript
interface IExpense {
  id: string;
  date: string;
  description: string;
  categoryId: string;
  amount: number;
}
```

### Category Interface
```typescript
interface ICategory {
  id: string;
  name: string;
  isDefault: boolean;
}
```

### Budget Interface
```typescript
interface IBudget {
  id: string;
  month: string;
  amount: number;
}
```

## 🗄️ Data Persistence

**Local Storage Strategy**
- **Expenses**: Stored as JSON array with unique IDs
- **Categories**: Default categories + user-created custom categories
- **Budgets**: Monthly budget settings with month-year keys

## 🔒 Data Validation

**Input Validation**
- **Amount Fields**: Regex validation for currency format (2 decimal places)
- **Date Fields**: Min/max date constraints
- **Description**: Length limits and character validation
- **Category Selection**: Required field validation

## 🧪 Development Workflow

### Code Quality Tools

```bash
# Linting
npm run lint
# or
yarn lint

# Type checking
npx tsc --noEmit
# or
yarn tsc --noEmit

# Build verification
npm run build
# or
yarn build
```

### Development Commands

| Command | NPM | Yarn | Description |
|---------|-----|------|-------------|
| Start development server | `npm run dev` | `yarn dev` | Start development server |
| Build for production | `npm run build` | `yarn build` | Build for production |
| Preview production build | `npm run preview` | `yarn preview` | Preview production build |
| Run ESLint | `npm run lint` | `yarn lint` | Run ESLint |
| Type checking | `npx tsc --noEmit` | `yarn tsc --noEmit` | TypeScript type checking |

## 🚀 Deployment

The application is optimized for static hosting platforms:

- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Static site hosting
