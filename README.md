# 🍬 Sweet Shop Management System - Frontend

A modern, responsive React application for managing a sweet shop inventory system. Features include user authentication, sweet browsing with search/filter, purchase functionality, and a comprehensive admin panel for inventory management.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.x-red.svg)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-1.x-purple.svg)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌐 Live Demo

- **Frontend Application:** [https://incubyte-frontend-lake.vercel.app](https://incubyte-frontend-lake.vercel.app)
- **Backend API:** [https://incubyte-backend-jf38.onrender.com](https://incubyte-backend-jf38.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components](#components)
- [Routing](#routing)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

## ✨ Features

### User Features
- ✅ **User Authentication**
  - Registration with email validation
  - Login with JWT token management
  - Persistent sessions using localStorage
  - Automatic token refresh
  - Secure logout

- ✅ **Sweet Browsing**
  - View all available sweets in grid layout
  - Real-time search by name, category, or description
  - Filter by category with one-click buttons
  - Responsive card design with hover effects
  - Stock status indicators (in stock, low stock, out of stock)

- ✅ **Purchase System**
  - One-click purchase functionality
  - Real-time quantity updates
  - Stock availability checks
  - Purchase confirmation messages
  - Login redirect for non-authenticated users

- ✅ **User Dashboard**
  - Personalized welcome message
  - Account information display
  - Quick stats overview
  - Navigation to sweet list

### Admin Features
- ✅ **Admin Panel** (Admin role required)
  - Add new sweets with comprehensive form
  - View complete inventory in table format
  - Restock sweets with custom quantity
  - Delete sweets with confirmation
  - Real-time inventory updates
  - Stock status badges

### UI/UX Features
- ✅ **Modern Design**
  - Gradient color schemes
  - Smooth animations and transitions
  - Glassmorphism effects
  - Responsive layout (mobile, tablet, desktop)
  - Loading states and spinners
  - Error handling with user-friendly messages

- ✅ **Navigation**
  - Responsive navbar with auth-aware menu
  - Protected routes for authenticated users
  - Admin-only routes with role checking
  - Automatic redirects based on auth status

## 🛠️ Tech Stack

### Core Technologies
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.x
- **HTTP Client:** Axios 1.6.0
- **Styling:** Vanilla CSS with modern features

### State Management
- **Context API** - Global authentication state
- **React Hooks** - Local component state (useState, useEffect)
- **Custom Hooks** - useAuth for authentication

### Development Tools
- **Build Tool:** Create React App
- **Package Manager:** npm
- **Environment Variables:** dotenv

## 📸 Screenshots

### Home Page
Beautiful landing page with hero section and feature cards.

### Sweet List
Grid layout with search and filter functionality.

### Admin Panel
Comprehensive inventory management interface.

### Authentication
Modern login and registration forms with validation.

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-frontend-repo-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_NAME=Sweet Shop Management System
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html            # HTML template
│   └── favicon.ico           # App icon
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminPanel.js       # Admin dashboard
│   │   │   └── AdminPanel.css      # Admin styles
│   │   ├── auth/
│   │   │   ├── Login.js            # Login component
│   │   │   ├── Register.js         # Registration component
│   │   │   └── Auth.css            # Auth styles
│   │   ├── dashboard/
│   │   │   ├── Dashboard.js        # User dashboard
│   │   │   └── Dashboard.css       # Dashboard styles
│   │   ├── layout/
│   │   │   ├── Navbar.js           # Navigation bar
│   │   │   └── Navbar.css          # Navbar styles
│   │   ├── pages/
│   │   │   ├── Home.js             # Landing page
│   │   │   └── Home.css            # Home styles
│   │   └── sweets/
│   │       ├── SweetList.js        # Sweet grid with search
│   │       ├── SweetList.css       # List styles
│   │       ├── SweetCard.js        # Individual sweet card
│   │       └── SweetCard.css       # Card styles
│   ├── context/
│   │   └── AuthContext.js    # Authentication context
│   ├── App.js                # Main app component
│   ├── App.css               # Global styles
│   ├── index.js              # App entry point
│   └── index.css             # Base styles
├── .env                      # Environment variables (not in repo)
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

## 🧩 Components

### Authentication Components

#### **Login Component** (`components/auth/Login.js`)
- Email and password input fields
- Client-side validation
- Error message display
- Loading state during authentication
- Redirect to dashboard on success
- Link to registration page

#### **Register Component** (`components/auth/Register.js`)
- Full name, email, password, confirm password fields
- Comprehensive client-side validation
- Password strength requirements
- Password match validation
- Success/error message handling
- Redirect to dashboard on success

### Layout Components

#### **Navbar Component** (`components/layout/Navbar.js`)
- Responsive navigation menu
- Auth-aware menu items
- User info display (name, role)
- Admin badge for admin users
- Admin panel link (admin only)
- Logout functionality
- Mobile-friendly hamburger menu

#### **Home Component** (`components/pages/Home.js`)
- Hero section with call-to-action
- Feature cards highlighting key features
- Gradient backgrounds
- Responsive layout

### Dashboard Components

#### **Dashboard Component** (`components/dashboard/Dashboard.js`)
- Personalized welcome message
- User account information
- Quick stats cards
- Admin panel access (admin only)
- Navigation to sweet list

### Sweet Components

#### **SweetList Component** (`components/sweets/SweetList.js`)
- Fetches sweets from API on mount
- Search bar for filtering
- Category filter buttons
- Results counter
- Grid layout for sweet cards
- Loading and error states
- Empty state handling

#### **SweetCard Component** (`components/sweets/SweetCard.js`)
- Sweet details display (name, category, price, quantity)
- Category-based icons
- Stock status indicator
- Purchase button with authentication check
- Disabled state for out-of-stock items
- Loading spinner during purchase
- Success/error messages

### Admin Components

#### **AdminPanel Component** (`components/admin/AdminPanel.js`)
- Add sweet form with validation
- Inventory table with all sweets
- Restock functionality with prompt
- Delete functionality with confirmation
- Real-time inventory updates
- Stock status badges
- Responsive table design

## 🛣️ Routing

### Route Structure

```javascript
/                     # Home page (public)
/sweets               # Sweet list (public)
/login                # Login page (public, redirects if authenticated)
/register             # Registration page (public, redirects if authenticated)
/dashboard            # User dashboard (protected, requires login)
/admin                # Admin panel (protected, requires admin role)
```

### Route Protection

#### **ProtectedRoute**
- Checks if user is authenticated
- Redirects to `/login` if not authenticated
- Shows loading spinner during check

#### **AdminRoute**
- Checks if user has admin role
- Redirects to `/dashboard` if not admin
- Shows loading spinner during check

#### **PublicRoute**
- Redirects to `/dashboard` if already authenticated
- Allows access if not authenticated

## 🔄 State Management

### AuthContext

Global authentication state managed using React Context API:

```javascript
{
  user: {
    id: string,
    name: string,
    email: string,
    role: 'user' | 'admin'
  },
  token: string,
  loading: boolean,
  error: string | null,
  register: (userData) => Promise,
  login: (credentials) => Promise,
  logout: () => void,
  isAuthenticated: () => boolean,
  isAdmin: () => boolean,
  updateUser: (updatedUser) => void,
  clearError: () => void
}
```

### Local State

Components use `useState` and `useEffect` hooks for:
- Form data management
- Loading states
- Error handling
- Search/filter state
- UI interactions

## 🔌 API Integration

### Axios Configuration

Base URL configured via environment variable:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Authentication Headers

JWT token automatically added to requests:
```javascript
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### API Endpoints Used

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

#### Sweets
- `GET /sweets` - Fetch all sweets
- `GET /sweets/:id` - Fetch single sweet
- `POST /sweets` - Create sweet (admin)
- `PUT /sweets/:id` - Update sweet (admin)
- `DELETE /sweets/:id` - Delete sweet (admin)
- `POST /sweets/:id/purchase` - Purchase sweet

### Error Handling

```javascript
try {
  const response = await axios.post('/endpoint', data);
  // Handle success
} catch (error) {
  const errorMessage = error.response?.data?.message || 'Operation failed';
  // Display error to user
}
```

## 🎨 Styling

### Design System

#### Colors
- **Primary Gradient:** `#667eea` → `#764ba2`
- **Success:** `#28a745` (green)
- **Warning:** `#ffc107` (yellow)
- **Danger:** `#dc3545` (red)
- **Background:** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

#### Typography
- **Font Family:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Headings:** Bold, gradient text
- **Body:** 16px, line-height 1.6

#### Components
- **Cards:** White background, border-radius 16px, box-shadow
- **Buttons:** Gradient background, hover effects, transitions
- **Inputs:** Border-radius 12px, focus states
- **Badges:** Rounded, color-coded by status

### Responsive Design

```css
/* Desktop: 3-column grid */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}

/* Tablet: 2-column grid */
@media (min-width: 768px) and (max-width: 1023px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Mobile: 1-column grid */
@media (max-width: 767px) {
  grid-template-columns: 1fr;
}
```

### Animations

```css
/* Smooth transitions */
transition: all 0.3s ease;

/* Hover effects */
transform: translateY(-5px);

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## 🚀 Deployment

### Deployed On
- **Platform:** Vercel
- **URL:** https://incubyte-frontend-lake.vercel.app
- **Auto-Deploy:** Enabled on push to main branch

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: ready for deployment"
   git push origin main
   ```

2. **Configure Vercel**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Set Environment Variables**
   ```env
   REACT_APP_API_URL=https://incubyte-backend-jf38.onrender.com/api
   REACT_APP_NAME=Sweet Shop Management System
   ```

4. **Deploy**
   - Vercel auto-deploys on push to main branch
   - Preview deployments for pull requests

### Build Optimization

- Code splitting with React.lazy
- Minification and compression
- Asset optimization
- Service worker for caching (optional)

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `https://api.example.com/api` |
| `REACT_APP_NAME` | Application name | `Sweet Shop Management System` |

**Note:** All environment variables must be prefixed with `REACT_APP_` to be accessible in React.

## 🔒 Security Features

### Authentication
- ✅ JWT token storage in localStorage
- ✅ Automatic token inclusion in API requests
- ✅ Token expiration handling
- ✅ Secure logout (clears token and user data)

### Route Protection
- ✅ Protected routes for authenticated users
- ✅ Admin-only routes with role checking
- ✅ Automatic redirects for unauthorized access

### Input Validation
- ✅ Client-side form validation
- ✅ Email format validation
- ✅ Password strength requirements
- ✅ Required field checks

### Error Handling
- ✅ User-friendly error messages
- ✅ Network error handling
- ✅ API error response handling
- ✅ Fallback UI for errors

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** ≥ 1024px

### Mobile Features
- Hamburger menu for navigation
- Single-column grid layout
- Touch-friendly buttons
- Optimized images
- Responsive typography

## ⚡ Performance Optimization

### Code Splitting
- Route-based code splitting
- Lazy loading of components
- Dynamic imports

### Asset Optimization
- Image compression
- CSS minification
- JavaScript bundling
- Tree shaking

### Caching
- Browser caching
- Service worker (optional)
- API response caching

## 🧪 Testing (Future Enhancement)

### Recommended Testing Tools
- **Unit Tests:** Jest + React Testing Library
- **Integration Tests:** Cypress
- **E2E Tests:** Playwright

### Test Coverage Goals
- Components: 80%+
- Utilities: 90%+
- Integration: 70%+

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Anant Kapoor**
- GitHub: [@anantk13](https://github.com/anantk13)
- Email: anant.kapooor@gmail.com

## 🙏 Acknowledgments

- Built as part of Incubyte assessment
- Uses modern React best practices
- Responsive design principles
- User-centered design approach

## 📞 Support

For support, email anant.kapooor@gmail.com or open an issue in the repository.

---

**⭐ If you find this project useful, please consider giving it a star!**

**🔗 Related Projects**
- [Backend Repository](https://github.com/anantk13/incubyte-backend)
- [Live Demo](https://incubyte-frontend-lake.vercel.app)
