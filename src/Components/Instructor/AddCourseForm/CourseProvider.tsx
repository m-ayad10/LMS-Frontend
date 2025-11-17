// CourseProvider.tsx
import React, { createContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type ActiveTab = "basic" | "pricing" | "media" | "curiculum" | "finish";

export const ActiveTabContext = createContext<{
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
}>({
  activeTab: "basic",
  setActiveTab: () => {},
});

export type Lesson = {
  id: string;
  name: string;
  file?: File | null;
};

export type Course = {
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "";
  isPaid: boolean;
  price: number | null;
  thumbnail?: File | null;
  previewVideo?: File | null;
  lessons: Lesson[];
};

export const defaultCourse: Course = {
  title: "",
  description: "",
  category: "",
  level: "",
  isPaid: false,
  price: null,
  thumbnail: undefined,
  previewVideo: undefined,
  lessons: [{ id: uuidv4(), name: "", file: undefined }],
};

export const CourseContext = createContext<{
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
}>({
  course: defaultCourse,
  setCourse: () => {},
});

export const AppProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // const [activeTab, setActiveTab] = useState<ActiveTab>("basic");
  const [course, setCourse] = useState<Course>(defaultCourse);

  // memoize context values to prevent unnecessary re-renders
  // const activeTabValue = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);
  const courseValue = useMemo(() => ({ course, setCourse }), [course]);

  return (
    // <ActiveTabContext.Provider value={activeTabValue}>
      <CourseContext.Provider value={courseValue}>{children}</CourseContext.Provider>
    // </ActiveTabContext.Provider>
  );
};
