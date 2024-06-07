
ProdPeek is a platform where users can discover and share their tech products. It allows users to submit new products, upVote  existing products, and post reviews. The platform supports user authentication and role management, including normal users, moderators, and admins. A payment system is integrated for unlocking premium features or obtaining extra facilities through paid subscriptions.

## Live Site URL
[Visit ProdPeek](https://prodpeek-5820d.web.app)

## Features
- **User Authentication**: Secure login and registration with email/password and Google sign-in.
- **User Roles**: Different functionalities for normal users, moderators, and admins.
- **Product Management**: Submit, upvote, and review tech products.
- **Moderation System**: Moderators can approve/reject products and handle reported content.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **Payment Integration**: Users can subscribe to premium features.
- **Environment Variables**: Securely manage Firebase config keys and MongoDB credentials.

## Technologies Used
- **MongoDB**: Database
- **Express.js**: Backend framework
- **React.js**: Frontend library
- **Node.js**: Runtime environment
- **Firebase**: Authentication and hosting
- **JWT**: JSON Web Tokens for secure authentication
- **Stripe**: Payment processing

## Installation

### Client Side
1. Clone the repository:
    ```bash
    git clone https://github.com/example/client-repo.git
    cd client-repo
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add your Firebase config keys:
    ```env
    VITE_APIKEY=your-api-key
    VITE_AUTHDOMAIN=your-auth-domain
    VITE_PROJECTID=your-project-id
    VITE_STORAGEBUCKET=your-storage-bucket
    VITE_MESSAGINGSENDERID=your-messaging-sender-id
    VITE_APPID=your-app-id

    VITE_IMGBB_API_KEY=imgbb-website-apikey
    VITE_Payment_Gateway_Pk=your-stripe-apikey
    ```
4. Start the development server:
    ```bash
    npm start
    ```

### Server Side
1. Clone the repository:
    ```bash
    git clone https://github.com/example/server-repo.git
    cd server-repo
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add your MongoDB credentials and JWT secret:
    ```env
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    STRIPE_SECRET_KEY=your-stripe-apikey

    ```
4. Start the server:
    ```bash
    npm start
    ```

## Usage
- **Homepage**: Browse featured and trending products.
- **Products Page**: View all products with pagination and search functionality.
- **Product Details**: View detailed information, reviews, and upvote/report products.
- **Dashboard**: Manage profile, add products, and view personal products.
- **Admin Dashboard**: Manage users, view statistics, and handle coupons.

## User Roles
1. **Normal Users**:
    - Browse and view the latest tech products.
    - Upvote products.
    - Submit new products for review.
    - Report and review other users' products.
2. **Moderators**:
    - Review and approve/reject submitted products.
    - Handle reported products.
    - Mark products as featured.
3. **Admins**:
    - Manage user roles.
    - Monitor site activities through a statistics page in the dashboard.

