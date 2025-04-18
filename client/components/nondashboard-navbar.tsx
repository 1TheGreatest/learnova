"use client";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import Loading from "./loading";

const NonDashboardNavbar = () => {
  const { user, isLoaded } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";

  if (!isLoaded) return <Loading />;
  return (
    <nav className="nondashboard-navbar">
      <div className="nondashboard-navbar__container">
        {/* Right side */}
        <div className="nondashboard-navbar__search">
          <Link href="/" scroll={false} className="nondashboard-navbar__brand">
            Learnova
          </Link>
          <div className="flex items-center gap-4">
            {/* Search  */}
            <div className="relative group">
              <Link
                href="/search"
                scroll={false}
                className="nondashboard-navbar__search-input"
              >
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden">Search</span>
              </Link>
              <BookOpen
                className="nondashboard-navbar__search-icon"
                size={18}
              />
            </div>
          </div>
        </div>
        {/* Left side */}
        <div className="nondashboard-navbar__actions">
          <button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator" />
            <Bell className="nondashboard-navbar__notification-icon" />
          </button>
          {/* Sign in buttons */}
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: dark,
                elements: {
                  userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                  userButtonBox: "scale-90 sm:scale-100",
                },
              }}
              showName={true}
              userProfileMode="navigation"
              userProfileUrl={
                userRole === "teacher" ? "/teacher/profile" : "/user/profile"
              }
            />
          </SignedIn>
          <SignedOut>
            <Link
              href={"/signin"}
              className="nondashboard-navbar__auth-button--login"
            >
              Log in
            </Link>
            <Link
              href={"/signup"}
              className="nondashboard-navbar__auth-button--signup"
            >
              Sign up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default NonDashboardNavbar;
