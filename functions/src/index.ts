import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes';

// Initialize Firebase Admin
admin.initializeApp();

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: true }));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register your API routes
registerRoutes(app);

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);

