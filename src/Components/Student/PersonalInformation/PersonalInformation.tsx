import {  useEffect, useState } from "react";
import { FaEdit, FaSave, FaUserAlt } from "react-icons/fa";
import "./style.css";
import "./responsive.css";
import image from "../../../assets/banner-man-3.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import toast from "react-hot-toast";
import { server_url, useFetch } from "../../../Hooks/customHook";
import { addAuth } from "../../../Redux/Slices/Auth/AuthSlice";
import { FaCamera, FaUserSlash } from "react-icons/fa6";

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
     <div className="user-profile-container">
  <div className="profile-card">
    <div className="profile-header">
      <h1 className="profile-main-title">Personal Information</h1>
      <p className="profile-subtitle">Manage your personal details and profile</p>
    </div>

    <div className="profile-divider-line"></div>

    {user.status === "succeeded" ? (
      <div className="profile-content">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img
              src={profileUrl ? profileUrl : image}
              alt="User Avatar"
              className="user-avatar-image"
            />
            <div className="avatar-overlay">
              <input
                name="profile"
                type="file"
                className="avatar-upload-input"
                disabled={!isEditing}
                onChange={handleProfileChange}
              />
              <div className="avatar-change-text">
                <FaCamera className="camera-icon" />
                <span>Change Photo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="profile-form-container">
          <form className="modern-profile-form">
            <div className="form-grid-layout">
              <div className="input-field-group">
                <label className="input-label">First Name</label>
                <div className="input-with-icon">
                  <FaUserAlt className="input-field-icon" />
                  <input
                    type="text"
                    value={firstName || user.user.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                    className="modern-input-field"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div className="input-field-group">
                <label className="input-label">Last Name</label>
                <div className="input-with-icon">
                  <FaUserAlt className="input-field-icon" />
                  <input
                    type="text"
                    value={lastName || user.user.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                    className="modern-input-field"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions-container">
              {isEditing ? (
                <button
                  className="save-changes-button"
                  type="button"
                  onClick={saveEdit}
                >
                  <FaSave className="button-icon" />
                  Save Changes
                </button>
              ) : (
                <button
                  className="edit-profile-button"
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit className="button-icon" />
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    ) : user.status === "loading" ? (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading profile...</p>
      </div>
    ) : (
      <div className="empty-state">
        <FaUserSlash className="empty-icon" />
        <p className="empty-text">No profile data found</p>
      </div>
    )}
  </div>
</div>
    </>
  );
}

export default PersonalInformation;
