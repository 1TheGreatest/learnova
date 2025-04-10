import express from "express"; // Web framework for Node.js
import dotenv from "dotenv"; // Load environment variables from .env file
import bodyParser from "body-parser"; // Middleware for parsing request bodies
import cors from "cors"; // Middleware for enabling CORS
import helmet from "helmet"; // Security middleware
import morgan from "morgan"; // HTTP request logger middleware
import * as dynamoose from "dynamoose"; // DynamoDB ORM for Node.js
import courseRoutes from "./routes/courseRoutes";
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth,
} from "@clerk/express";
import userClerkRoutes from "./routes/userClerkRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userCourseProgressRoutes from "./routes/userCourseProgressRoutes";
import serverless from "serverless-http"; // Middleware for serverless applications
import seed from "./seed/seedDynamodb"; // Import the seed function for seeding the database
/* ROUTE IMPORTS */

/* CONFIGURATIONS */
dotenv.config();

const isProduction = process.env.NODE_ENV === "production"; // Check if the environment is production
if (!isProduction) {
  dynamoose.aws.ddb.local(); // Use local DynamoDB for non-production environments
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
}); // Initialize Clerk client

const app = express(); // Create an Express application
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS
app.use(helmet()); // Use Helmet for security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Set cross-origin resource policy
app.use(morgan("common")); // Use Morgan for logging HTTP requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded request bodies (false for simple parsing)
app.use(clerkMiddleware()); // Use Clerk middleware for authentication

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Import your routes here
app.use("/courses", courseRoutes);
app.use("/users/clerk", requireAuth(), userClerkRoutes);
app.use("/transactions", requireAuth(), transactionRoutes);
app.use("/users/course-progress", requireAuth(), userCourseProgressRoutes);

/* SERVER */
const port = process.env.PORT || 3000; // Define the port for the server
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// AWS production environment
const serverlessApp = serverless(app);
export const handler = async (event: any, context: any) => {
  if (event.action === "seed") {
    // Seed the database not ideal for production
    await seed();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Database seeded successfully" }),
    };
  } else {
    return serverlessApp(event, context);
  }
};
