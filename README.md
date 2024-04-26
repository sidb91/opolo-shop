**eCommerce platform built with the MERN stack & Redux.**

**Features**

Full featured shopping cart
Product reviews and ratings
Top products carousel
Product pagination
Product search feature
User profile with orders
Admin product management
Admin user management
Admin Order details page
Mark orders as delivered option
Checkout process (shipping, payment method, etc)
PayPal / credit card integration
Database seeder (products & users)

Env Variables
Rename the .env.example file to .env and add the following

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
Change the JWT_SECRET and PAGINATION_LIMIT to what you want

Install Dependencies (frontend & backend)
npm install
cd frontend
npm install
Run

**# Run frontend (:3000) & backend (:5000)**
npm run dev

**# Run backend only**
npm run server
Build & Deploy

**# Create frontend prod build**
cd frontend
npm run build
Seed Database
You can use the following commands to seed the database with some sample users and products as well as destroy all data

**# Import data**
npm run data:import

**# Destroy data**
npm run data:destroy

# Sample User Logins
{
    "email": "admin@email.com",
    "password": "user1234"
}

{
    "email": "sid@email.com",
    "password": "user1234"
}


# Paypal SDK
Client ID : AZqxyllU1Skl_-XIGQd6zE1VcUPqJr4PvrYREk8dqZRhS-mKgrpGs2LbPBe6P2WVb3RsKq526RaED9hj
Secret Key1 : EK1ff28mP8g4cGPVDnyvsxyN-8EzggLFLOFfERpKwkmPf9AtYKPzWT9Wgz-yjrDnK8fWY9ApMmNnf1yf


# Pending Features

1) Deployment - Hosting, CI/CD pipeline, Container instances (optional)
2) Unit & Integration Testing (automated) - Jest and Playright
3) GitHub branching strategy - master, release, develop, features
4) Code Review Tool - SonarLint / ESLint
5) Security testing - OWASP Top 10
6) Error Monitoring - Sentry
7) API documentation - Swagger
8) Web Performance Analysis - Google Analytics


# Add on features

1) create a react native mobile app.
2) create a feed and put on filters - price, brand, category, review ratings
3) create a global search
4) build file / images upload feature for sellers
5) create api gateway to connect with backend
6) write backend in spring boot microservices with postgres/mongo DB and caching.


# AI integration

1) Add a recommendation engine

2) Add user/customer reviews and analyse those reviews to summarize good and bad features of the products to customers, perform intent/sentiment analysis

3) Add a Q&A chatbot for answering user questions about the platform

4) Measure click and view count of users on diffrent pages and make analyses for in demand products
