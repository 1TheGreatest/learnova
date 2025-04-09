import { useGetCourseQuery } from "@/state/api";
import { useSearchParams } from "next/navigation";

export const useCurrentCourse = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id") ?? "";
  const { data: course, ...rest } = useGetCourseQuery(courseId); // Fetch course data using the courseId from search params

  return { course, courseId, ...rest };
};
