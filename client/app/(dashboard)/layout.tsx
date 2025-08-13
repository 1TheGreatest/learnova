"use client";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CourseChaptersSidebar from "./user/courses/[courseId]/course-chapters-sidebar";
import Loading from "@/components/loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathName
  );

  useEffect(() => {
    if (isCoursePage) {
      const match = pathName.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathName]);

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        {/* app sidebar */}
        <AppSidebar />
        <div className="dashboard__content">
          {/* chapter sidebar */}
          {courseId && <CourseChaptersSidebar />}
          <div
            className={cn(
              "dashboard__main",
              isCoursePage && "dashboard__main--not-course"
            )}
            style={{ height: "100vh" }}
          >
            <Navbar isCoursePage={isCoursePage} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
