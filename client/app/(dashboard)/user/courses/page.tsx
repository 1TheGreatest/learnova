"use client";

import { useGetUserEnrolledCoursesQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState, useMemo } from "react";
import Header from "@/components/header";
import Toolbar from "@/components/toolbar";
import CourseCard from "@/components/course-card";
import Loading from "@/components/loading";

const Courses = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetUserEnrolledCoursesQuery(user?.id ?? "", {
    skip: !isLoaded || !user, // Skip the query if user is not loaded or not authenticated
  });

  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  const handleGoToCourse = (course: Course) => {
    if (
      course.sections &&
      course.sections.length > 0 &&
      course.sections[0].chapters.length > 0
    ) {
      // If there are sections and chapters, redirect to the first chapter
      const firstChapter = course.sections[0].chapters[0];
      router.push(
        `/user/courses/${course.courseId}/chapters/${firstChapter.chapterId}`,
        {
          scroll: false,
        }
      );
    } else {
      // If there are no sections or chapters, redirect to the course overview
      router.push(`/user/courses/${course.courseId}`, {
        scroll: false,
      });
    }
  };

  if (!isLoaded || isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view your courses.</div>;
  if (isError || !courses || courses.length === 0)
    return <div>You are not enrolled in any courses yet.</div>;

  return (
    <div className="user-courses">
      <Header title="My Courses" subtitle="View your enrolled courses" />
      <Toolbar
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />
      <div className="user-courses__grid">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            onGoToCourse={handleGoToCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
