import {  useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import "./style.css";
import "./responsive.css";
import image from "../../../assets/banner-man-3.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import toast from "react-hot-toast";
import { server_url, useFetch } from "../../../Hooks/customHook";
import { addAuth } from "../../../Redux/Slices/Auth/AuthSlice";

function PersonalInformation() {
  const user = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profile, setProfile] = useState<File>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    if(user.status==='succeeded')
    {
      setFirstName(user.user.firstName||"")
      setLastName(user.user.lastName||"")
      setProfileUrl(user.user.profile||"")
    }

  },[user.status,user.user])
  const saveEdit = async () => {
    if (firstName.trim().length === 0) {
      return toast.error("First name is required");
    }
    if (lastName.trim().length === 0) {
      return toast.error("Last name is required");
    }

    setIsEditing(false);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);

    if (profile) {
      formData.append("profile", profile);
    }

    try {
      await toast.promise(
        useFetch(`${server_url}/student`, {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }),
        {
          loading: "Updating profile...",
          success: (response) => {
            if (response.success) {
              dispatch(addAuth(response.data));
              return response.message || "User updated successfully";
            } else {
              throw new Error(response.message || "Failed to update user");
            }
          },
          error: (err) => err?.message || "Internal server error",
        }
      );
    } catch (error: any) {
      toast.error(error?.message || "Unexpected error occurred");
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file) {
      setProfile(file);
      setProfileUrl(URL.createObjectURL(file));
    }
  };
 
  return (
    <>
      <div className="profile-section">
        <h1 className="profile-title">Personal Information</h1>
        <hr className="profile-divider" />
        {user.status === "succeeded" ? (
          <>
            <div className="profile-avatar-section">
              <img
                src={profileUrl ? profileUrl : image}
                alt="User Avatar"
                className="profile-avatar"
              />
              <input
                name="profile"
                type="file"
                className="profile-avatar-upload"
                disabled={!isEditing}
                placeholder="Change profile"
                onChange={handleProfileChange}
              />
            </div>

            <div className="profile-form-wrapper">
              <form className="profile-form">
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label htmlFor="">First Name</label>
                    <div className="auth-input-group">
                      <FaUserAlt className="auth-input-icon" />
                      <input
                        type="text"
                        value={firstName || user.user.firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!isEditing}
                        className="auth-input-field"
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="">Last Name</label>
                    <div className="auth-input-group">
                      <FaUserAlt className="auth-input-icon" />
                      <input
                        type="text"
                        value={lastName || user.user.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!isEditing}
                        className="auth-input-field"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="profile-form-actions">
                  {isEditing ? (
                    <button
                      className="profile-btn-save"
                      type="button"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="profile-btn-edit"
                      type="button"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        ) : user.status === "loading" ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-lg font-medium">Loading profile...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg font-medium">No profile data found.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default PersonalInformation;
