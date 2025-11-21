import { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import toast from "react-hot-toast";
import { server_url, useFetch } from "../../../Hooks/customHook";

function AdminAccountInformation() {
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
        useFetch(`${server_url}/admin/change-password`, {
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
   <div className="password-change-container">
     <div className="password-change-card">
       <div className="password-header">
         <div className="password-icon-wrapper">
           <FaLock className="password-main-icon" />
         </div>
         <h1 className="password-main-title">Change Password</h1>
         <p className="password-subtitle">Update your account password for enhanced security</p>
       </div>
   
       <div className="password-divider"></div>
   
       <div className="password-form-container">
         <form className="modern-password-form" onSubmit={(e) => e.preventDefault()}>
           {/* Email Field */}
           <div className="form-field-group">
             <label htmlFor="email" className="form-field-label">
               Email Address
             </label>
             <div className="input-container">
               <FaEnvelope className="input-icon" />
               <input
                 id="email"
                 type="email"
                 className="modern-form-input"
                 value={email}
                 disabled
                 placeholder="your.email@example.com"
               />
             </div>
           </div>
   
           {/* Current Password */}
           <div className="form-field-group">
             <label htmlFor="current-password" className="form-field-label">
               Current Password
             </label>
             <div className="input-container">
               <FaLock className="input-icon" />
               <input
                 id="current-password"
                 type="password"
                 className="modern-form-input"
                 value={prevPassword}
                 onChange={(e) => setPrevPassword(e.target.value)}
                 placeholder="Enter your current password"
               />
             </div>
           </div>
   
           {/* New Password */}
           <div className="form-field-group">
             <label htmlFor="new-password" className="form-field-label">
               New Password
             </label>
             <div className="input-container">
               <FaLock className="input-icon" />
               <input
                 id="new-password"
                 type="password"
                 className="modern-form-input"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Create a new password"
               />
             </div>
           </div>
   
           {/* Confirm Password */}
           <div className="form-field-group">
             <label htmlFor="confirm-password" className="form-field-label">
               Confirm Password
             </label>
             <div className="input-container">
               <FaLock className="input-icon" />
               <input
                 id="confirm-password"
                 type="password"
                 className="modern-form-input"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 placeholder="Confirm your new password"
               />
             </div>
           </div>
   
           {/* Action Button */}
           <div className="form-actions">
             <button
               className="save-password-button"
               type="button"
               onClick={handleSave}
             >
               <FaSave className="button-icon" />
               Update Password
             </button>
           </div>
         </form>
       </div>
     </div>
   </div>
  );
}

export default AdminAccountInformation;
