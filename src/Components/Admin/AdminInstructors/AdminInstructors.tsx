import { FaGraduationCap } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { useState } from "react";
import type { User } from "../../../Redux/Slices/Auth/AuthType";
import { server_url } from "../../../Hooks/customHook";
import toast from "react-hot-toast";
import { editInstructor } from "../../../Redux/Slices/AdminDashboard/AdminDashboardSlice";

interface ToggleReturn {
  message: string;
  success: boolean;
  data: User;
}

function AdminInstructors() {
  const instructors = useSelector(
    (state: RootState) => state.adminDashboard.instructors
  );
  const [activeTab, setActiveTab] = useState<"active" | "non-active">("active");
  return (
    <>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <FaGraduationCap className="dashboard-title-icon" /> Instructors
        </div>
      </div>
      <div className="user-management">
        <div className="user-management__filter-buttons">
          <button
            onClick={() => setActiveTab("active")}
            className={`user-management__filter-btn ${
              activeTab === "active" && "user-management__filter-btn-active"
            } `}
          >
            Active Instructor
          </button>
          <button
            onClick={() => setActiveTab("non-active")}
            className={`user-management__filter-btn ${
              activeTab === "non-active" && "user-management__filter-btn-active"
            }`}
          >
            Non Active User
          </button>
        </div>

        <div className="user-management__list">
          {activeTab === "active" ? (
            <ActiveUsers users={instructors} />
          ) : (
            <NonActiveUsers users={instructors} />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminInstructors;

function ActiveUsers({ users }: { users: User[] }) {
  const dispatch = useDispatch<AppDispatch>();
  async function toggleActive(id: string) {
    try {
      const response = await fetch(`${server_url}/admin/activate-toggle/${id}`, {
        method:"PATCH",
        credentials: "include",
      });
      const data: ToggleReturn = await response.json();
      if (!data.success) {
        return toast.error(data.message || "Failed");
      }
    dispatch(editInstructor({data:data.data}));
    toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.message || error || "Something went wrong");
    }
  }
  return (
    <>
      {users.filter((value) => value.isActive).length === 0 && (
        <div className="text-center text-gray-500 py-8 text-lg">
          No active users
        </div>
      )}
      {users
        .filter((value) => value.isActive)
        .map((instructor, index) => {
          return (
            <div className="user-card" key={instructor?._id || index}>
              <div className="user-card__info">
                <img
                  src={instructor?.profile}
                  alt="User profile"
                  className="user-card__image"
                />
                <p className="user-card__name">
                  {instructor
                    ? instructor.firstName + " " + instructor.lastName
                    : "No name"}
                </p>
              </div>
              <div className="user-card__actions">
                {instructor?.isActive ? (
                  <button
                    onClick={() => toggleActive(instructor?._id || "")}
                    className="user-card__btn user-card__btn--block"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => toggleActive(instructor?._id || "")}
                    className="user-card__btn user-card__btn--activate"
                  >
                    Activate
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}

function NonActiveUsers({ users }: { users: User[] }) {
  const dispatch = useDispatch<AppDispatch>();
  async function toggleActive(id: string) {
    try {
      const response = await fetch(`${server_url}/admin/activate-toggle/${id}`, {
        method:"PATCH",
        // headers:{"Content-Type":"application/json"},
        credentials: "include",
      });
      const data: ToggleReturn = await response.json();
      if (!data.success) {
        return toast.error(data.message || "Failed");
      }
    dispatch(editInstructor({data:data.data}));
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.message || error || "Something went wrong");
    }
  }
  return (
    <>
      {users.filter((value) => !value.isActive).length === 0 && (
        <div className="text-center text-gray-500 py-8 text-lg">
          No non-active users
        </div>
      )}
      {users
        .filter((value) => !value.isActive)
        .map((instructor, index) => {
          return (
            <div className="user-card" key={instructor?._id || index}>
              <div className="user-card__info">
                <img
                  src={instructor?.profile}
                  alt="User profile"
                  className="user-card__image"
                />
                <p className="user-card__name">
                  {instructor
                    ? instructor.firstName + " " + instructor.lastName
                    : "No name"}
                </p>
              </div>
              <div className="user-card__actions">
                {instructor?.isActive ? (
                  <button
                    onClick={() => toggleActive(instructor?._id || "")}
                    className="user-card__btn user-card__btn--block"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => toggleActive(instructor?._id || "")}
                    className="user-card__btn user-card__btn--activate"
                  >
                    Activate
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}
