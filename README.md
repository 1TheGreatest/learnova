# 🎓 Full-Stack Learning Management Platform

A **production-grade Learning Management System** (LMS) inspired by platforms like Udemy and Coursera — featuring user authentication, course creation, video uploads, billing, and progress tracking. Built with **Next.js, Node.js, and AWS**, the platform is fully scalable, secure, and cloud-native.

> 🚀 Designed to educate, built to scale — this LMS is cloud-ready and deployable on AWS with modern, serverless infrastructure.

---

## 🌟 Features

- **User Authentication & Profile Management**
  Secure, seamless auth with [Clerk](https://clerk.dev), including signup, login, and profile settings.

- **Course Creation & Management**
  Teachers can create, edit, reorder sections/chapters, upload videos, and publish content using a dynamic course builder.

- **Student Dashboard & Enrollment**
  Learners can browse, preview, and enroll in courses. Progress tracking allows users to mark chapters as complete/incomplete.

- **Video Uploads via AWS S3**
  Supports efficient video uploads using **pre-signed URLs**, stored securely on **Amazon S3**.

- **Payment Integration with Stripe**
  Fully integrated Stripe checkout for enrolling in paid courses — including guest checkout and billing history.

- **Interactive UI**
  Built with **TailwindCSS**, **ShadCN**, and **Framer Motion** for beautiful, responsive, and animated interfaces.

- **Progress Tracking**
  Mark sections complete and track your learning journey with chapter-level completion indicators.

- **Admin Dashboard (Teachers)**
  Instructors can view, manage, and delete their courses, sections, and chapters with full CRUD operations.

---

## 🧱 Tech Stack

### Frontend

- **Framework**: [Next.js 14+](https://nextjs.org/)
- **UI Styling**: [TailwindCSS](https://tailwindcss.com/), [ShadCN](https://ui.shadcn.com/)
- **State Management**: Redux Toolkit + RTK Query
- **Forms & Validation**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Authentication**: Clerk
- **Payments**: Stripe

### Backend

- **Framework**: Node.js + Express
- **Database**: DynamoDB (NoSQL)
- **Storage**: AWS S3 (video content)
- **Infrastructure**:

  - **Dockerized backend**
  - **ECR** (Elastic Container Registry)
  - **Lambda** (Serverless backend)
  - **API Gateway** (Request routing)
  - **CloudFront** (CDN for video delivery)

---

## 📦 AWS Architecture Overview

- **ECR**: Containerized backend services are stored securely for consistent deployment.
- **Lambda**: Event-driven compute for backend APIs.
- **API Gateway**: Acts as a secure, scalable entry point for frontend requests.
- **DynamoDB**: High-performance NoSQL database.
- **S3**: Scalable video storage with presigned upload URLs.
- **CloudFront**: CDN for fast, global video content delivery.

---

## 🧪 Local Development

### Prerequisites

- Node.js (v18+)
- Docker (for backend)
- AWS CLI (optional for manual deployment)
- Stripe test keys
- Clerk project setup

### Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### Environment Variables

Create a `.env` file in both the `frontend` and `backend` directories.

**Frontend `.env.local`**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend `.env`**

```env
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=
```

---

## 🏁 Running the Project

### Frontend

```bash
cd frontend
npm run dev
```

### Backend

```bash
cd backend
docker build -t lms-backend .
docker run -p 5000:5000 lms-backend
```

Visit `http://localhost:3000` to explore the platform.

---
