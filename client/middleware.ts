import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { sessionClaims } = await auth();
  // const { userId } = await auth();
  // console.log("User ID Mid:", userId);

  const userRole =
    (sessionClaims?.metadata as { userType: "student" | "teacher" })
      ?.userType || "student";

  if (isStudentRoute(request)) {
    if (userRole !== "student") {
      const url = new URL("/teacher/courses", request.url);
      return NextResponse.redirect(url);
    }
  }

  if (isTeacherRoute(request)) {
    if (userRole !== "teacher") {
      const url = new URL("/user/courses", request.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
