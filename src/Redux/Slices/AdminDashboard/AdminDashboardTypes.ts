import type { User } from "../Auth/AuthType";
import type { Enrolled } from "../Enrolled/EnrolledType";

export interface AdminDashboardState {
  error: string | null;
  instructors: User[];
  students: User[];
  enrolled: Enrolled[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface AdminDashboardReturn {
  message: string;
  success: boolean;
  instructors: User[];
  students: User[];
  enrolled: Enrolled[];
  [key: string]: any;
}
