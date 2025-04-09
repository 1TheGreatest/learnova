"use client";
import AppSidebar from "@/components/app-sidebar";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { use } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [courseId, setCourseId] = React.useState<string | null>(null);
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <Loading />;
  if (!user) return <div className="">Please sign in to access</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        {/* app sidebar */}
        <AppSidebar />
        <div className="dashboard__content">
          {/* chapter sidebar */}
          {/* {courseId && <ChaptersSidebar />} */}
          {/* <div
            className={cn(
              "dashboard__main",
              isCoursePage && "dashboard__main--not-course"
            )}
            style={{ height: "100vh" }}
          > */}
          <Navbar isCoursePage={false} />
          {/* <main className="dashboard__body">{children}</main> */}
          {/* </div> */}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
