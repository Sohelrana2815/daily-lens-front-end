# Daily Lens

**Daily Lens** is a full-stack newspaper website designed to revolutionize how users consume news. The platform aggregates trending articles, offers premium features, and ensures a seamless user experience.

## Admin Credentials
- **Username:** sohelrana@gmail.com
- **Password:** @31007Sohel

## Live Site URL
[Daily Lens Web App](https://daily-lens-90dd8.web.app)

## Technology Stack
### Frontend
- **React.js** - Core framework with Vite
- **Tailwind CSS** - Styled with modern utility classes
- **React Router DOM** - Client-side routing
- **React TanStack Query** - Server-state management
- **React Google Charts** - Data visualization
- **Swiper.js** - Interactive carousels

### Backend
- **Node.js** - Runtime environment
- **Express.js** - REST API framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **CORS** - Cross-origin resource sharing

### DevOps & Tools
- **Firebase** - Hosting & Authentication
- **Vercel** - Backend deployment
- **Git** - Version control
- **ESLint** - Code quality
- **React Hot Toast** - Notifications

## Key Features
1. **Responsive Design**  
   - Fully optimized for mobile, tablet, and desktop devices, including the admin dashboard.

2. **Trending Articles**  
   - Displays trending articles based on user engagement (view count).

3. **Role-Based Access Control**  
   - Secure admin dashboard with JWT verification for managing content and users.

12. **Real-Time Updates**  
    - Statistics updated in real time with `react-countup`.

## Challenges Faced
### 1. Subscription Management
- **Problem:** Implementing automatic downgrade from premium to normal users after subscription expiration
- **Solution:** Created a cron job that runs daily to check expiration dates and update user status

### 2. Article View Tracking
- **Problem:** Accurate view count updates without duplicate counts
- **Solution:** Implemented IP-based tracking with a 24-hour cache system using MongoDB

### 3. Search & Filter Optimization
- **Problem:** Efficient handling of complex search queries with multiple filters
- **Solution:** Developed backend API endpoints with MongoDB aggregation pipelines for fast query processing

### 4. Payment Gateway Integration
- **Problem:** Secure handling of premium subscriptions
- **Solution:** Integrated Stripe API with webhook verification for payment confirmation

## Developer Information
- **Frontend Repository:** [GitHub Link](https://github.com/Sohelrana2815/daily-lens-front-end)
- **Backend Repository:** [GitHub Link](https://github.com/Sohelrana2815/daily-lens-back-end)

## Additional Notes
- **Security:** Implemented rate limiting and Helmet middleware for API protection
- **Performance:** Optimized MongoDB queries with proper indexing
- **Error Handling:** Comprehensive error logging with Winston middleware

Thank you for exploring **Daily Lens**!
