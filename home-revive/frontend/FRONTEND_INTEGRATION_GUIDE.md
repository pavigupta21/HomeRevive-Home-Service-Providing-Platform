# Frontend Integration Guide for HomeRevive

This guide explains how to integrate the frontend with the backend API for the HomeRevive home service platform.

## Prerequisites

1. Backend server running on `http://localhost:5000`
2. MongoDB Atlas connection configured
3. Frontend running on `http://localhost:3000` or `http://localhost:5173`

## Setup Instructions

### 1. Install Dependencies

The frontend integration uses the existing dependencies. No additional packages are required.

### 2. API Configuration

The API utility file (`src/utils/api.js`) is already configured with:
- Base URL: `http://localhost:5000/api`
- Authentication token handling
- Error handling
- All required API endpoints

### 3. Updated Components

#### ServiceHistory.jsx
- **Fetches user orders** from `GET /api/orders/:userId`
- **Displays service history** with status, dates, prices, and locations
- **Shows loading states** and error handling
- **Responsive design** with service icons and status badges

#### Reviews.jsx
- **Fetches all reviews** from `GET /api/reviews`
- **Displays reviews** with ratings, comments, and user information
- **Shows average ratings** and star displays
- **Handles empty states** and loading indicators

#### ReviewDialogueBox.jsx
- **Creates new reviews** via `POST /api/reviews`
- **Form validation** and error handling
- **Authentication checks** before submission
- **Auto-refresh** reviews after submission

## Authentication Integration

### Login/Signup Integration

To integrate authentication with your existing Login and Signup pages, use the API utilities:

```javascript
import { authAPI, authUtils } from '../utils/api';

// In your Login component
const handleLogin = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    authUtils.setAuthData(response.data.user, response.data.token);
    // Redirect to dashboard or home
  } catch (error) {
    // Handle error
  }
};

// In your Signup component
const handleSignup = async (userData) => {
  try {
    const response = await authAPI.signup(userData);
    authUtils.setAuthData(response.data.user, response.data.token);
    // Redirect to dashboard or home
  } catch (error) {
    // Handle error
  }
};
```

### Authentication State Management

The `authUtils` provides these functions:
- `authUtils.isAuthenticated()` - Check if user is logged in
- `authUtils.getCurrentUser()` - Get current user data
- `authUtils.setAuthData(user, token)` - Store auth data
- `authUtils.clearAuthData()` - Clear auth data (logout)

## API Endpoints Used

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Orders
- `POST /api/orders` - Create service booking
- `GET /api/orders/:userId` - Get user's orders
- `PUT /api/orders/:orderId` - Update order status

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:serviceId` - Get service-specific reviews
- `DELETE /api/reviews/:reviewId` - Delete review

## Data Flow

### Service History Flow
1. User navigates to Service History page
2. Component checks authentication status
3. If authenticated, fetches user orders from backend
4. Displays orders with status, dates, and details
5. Shows appropriate loading and error states

### Reviews Flow
1. User navigates to Reviews page
2. Component fetches all reviews from backend
3. Displays reviews with ratings and comments
4. User can click "Write a Review" to open modal
5. Modal validates input and submits to backend
6. Reviews refresh automatically after submission

## Error Handling

All components include comprehensive error handling:
- **Network errors** - Display user-friendly messages
- **Authentication errors** - Prompt user to login
- **Validation errors** - Show specific field errors
- **Server errors** - Display generic error messages

## Styling

The components use Tailwind CSS classes and maintain the existing design system:
- **Purple color scheme** (`#5D35EE`, `#4F378A`)
- **Consistent typography** with Istok Web font family
- **Responsive design** for different screen sizes
- **Hover effects** and transitions
- **Status badges** with appropriate colors

## Testing the Integration

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Start Frontend
```bash
cd home-revive
npm install
npm run dev
```

### 3. Test Features
1. **Service History**: Navigate to Service History page (requires login)
2. **Reviews**: Navigate to Reviews page to see all reviews
3. **Write Review**: Click "Write a Review" button (requires login)
4. **Authentication**: Test login/signup functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for your frontend URL
2. **Authentication Errors**: Check if user is logged in and token is valid
3. **API Connection**: Verify backend is running on port 5000
4. **Data Not Loading**: Check browser console for error messages

### Debug Tips

1. **Check Network Tab**: Look for failed API requests
2. **Console Logs**: Check for JavaScript errors
3. **Backend Logs**: Monitor backend console for errors
4. **Database**: Verify MongoDB connection and data

## Next Steps

1. **Add more service types** to the services list
2. **Implement user profile management**
3. **Add order status updates**
4. **Implement review editing/deletion**
5. **Add search and filtering** for reviews
6. **Implement pagination** for large datasets

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify backend server is running
3. Check MongoDB Atlas connection
4. Review the API documentation in `backend/README.md`
