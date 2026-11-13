import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://automationexercise.com/api',
  testUser: {
    email: process.env.TEST_USER_EMAIL || 'testuser@example.com',
    password: process.env.TEST_USER_PASSWORD || 'Test@123',
  },
  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
  },
  retries: {
    default: 2,
    ci: 3,
  },
};

export const endpoints = {
  home: '/',
  login: '/login',
  products: '/products',
  cart: '/view_cart',
  checkout: '/checkout',
  contactUs: '/contact_us',
  testCases: '/test_cases',
  deleteAccount: '/delete_account',
};
