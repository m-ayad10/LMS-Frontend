import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import toast from "react-hot-toast";
import { server_url, useFetch } from "../../../Hooks/customHook";

function InstructorAccountInformation() {
  const user = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<string>("");
  const [prevPassword, setPrevPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Initialize email from Redux state when user is loaded
  useEffect(() => {
    if (user.status === "succeeded" && user.user?.email) {
      setEmail(user.user.email);
    }
  }, [user.status, user.user?.email]);

  const handleSave = async () => {
    if (!prevPassword || !password || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("New password do not match");
      return;
    }

    try {
      await toast.promise(
        useFetch(`${server_url}/instructor/change-password`, {
          method: "PATCH",
          body: JSON.stringify({
            prevPassword,
            password,
            confirmPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }),
        {
          loading: "Updating password...",
          success: (res) => {
            // Handle backend failure manually
            if (!res.success) {
              // Throwing here will trigger toast.error automatically
              throw new Error(res.message || "Failed to update password");
            }
            return res.message || "Password updated successfully";
          },
          error: (err) => err?.message || "Internal server error",
        }
      );
    } catch (error: any) {
      toast.error(error?.message || "Unexpected error occurred");
    }
  };

  return (
    <div className="profile-section">
      <h1 className="profile-title">Account Information</h1>
      <hr className="profile-divider" />

      <div className="profile-form-wrapper">
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email" className="auth-input-label">
            Your email
          </label>
          <div className="auth-input-group">
            <FaUserAlt className="auth-input-icon" />
            <input
              id="email"
              type="email"
              className="auth-input-field"
              value={email}
              disabled
              placeholder="Enter your email"
            />
          </div>

          <label htmlFor="current-password" className="auth-input-label">
            Current Password
          </label>
          <div className="auth-input-group">
            <FaLock className="auth-input-icon" />
            <input
              id="current-password"
              type="password"
              className="auth-input-field"
              value={prevPassword}
              onChange={(e) => setPrevPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <label htmlFor="new-password" className="auth-input-label">
            New Password
          </label>
          <div className="auth-input-group">
            <FaLock className="auth-input-icon" />
            <input
              id="new-password"
              type="password"
              className="auth-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <label htmlFor="confirm-password" className="auth-input-label">
            Confirm Password
          </label>
          <div className="auth-input-group">
            <FaLock className="auth-input-icon" />
            <input
              id="confirm-password"
              type="password"
              className="auth-input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          <div className="profile-form-actions">
            <button
              className="profile-btn-save"
              type="button"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InstructorAccountInformation;
