import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import image from "../../../assets/login-security.gif";
import { HiPhoto } from "react-icons/hi2";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { server_url, useFetch } from "../../../Hooks/customHook";
import { Link, useNavigate } from "react-router-dom";

function InstructorSignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profile, setProfile] = useState<File>();
  const [loading,setLoading]=useState(false)
  const [bio, setBio] = useState<string>("");
  const [error, setError] = useState<any>({});
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!profile) newErrors.profile = "Profile file is required";
    if (!bio.trim()) newErrors.bio = "Bio is required";

    if (Object.keys(newErrors).length > 0) {
      setLoading(false)
      setError(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("email", email.trim());
    formData.append("password", password.trim());
    if (profile) formData.append("profile", profile);
    formData.append("bio", bio.trim());

    try {
         await toast.promise(
    useFetch(`${server_url}/instructor/register`, {
      method: "POST",
      body: formData,
      credentials: "include",
    }),
    {
      loading: "Creating...",
      success: (result: any) => {
        setLoading(false)
        if (!result.success) throw new Error(result.message || "Error saving");
        navigate("/otp",{state:{email}});
        return <b>Settings saved!</b>;
      },
      error: (err: any) => <b>{err?.message || "Could not save."}</b>,
    }
  );
    } catch (error: any) {
      setLoading(false)
      toast.error(error?.message || error || "Something went wrong");
    }
  };

  return (
    <>
      <section className="auth-section">
        <div className="auth-image-cont">
          <img src={image} className="auth-image" alt="login image" />
        </div>
        <div className="auth-form-cont">
          <div className="auth-content">
            <h3 className="auth-title">
              Instructor Signup<span className="text-[#754FFE]">!</span>{" "}
            </h3>
            <p className="auth-description">
              Explore, learn, and grow with us. enjoy a seamless and enriching
              educational journey. lets begin!
            </p>
            <form className="auth-form" onSubmit={handleSignup}>
              {error.firstName && (
                <p className="error-message">{error.firstName}</p>
              )}
              <label htmlFor="firstName" className="auth-input-label">
                First name
              </label>
              <br />
              <div className="auth-input-group">
                <FaUserAlt className="auth-input-icon" />
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="auth-input-field"
                  placeholder="Enter your first name"
                />
              </div>

              {error.lastName && (
                <p className="error-message">{error.lastName}</p>
              )}
              <label htmlFor="lastName" className="auth-input-label">
                LastName
              </label>
              <br />
              <div className="auth-input-group">
                <FaUserAlt className="auth-input-icon" />
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="auth-input-field"
                  placeholder="Enter your last name"
                />
              </div>

              {error.email && <p className="error-message">{error.email}</p>}
              <label htmlFor="email" className="auth-input-label">
                Your email
              </label>
              <br />
              <div className="auth-input-group">
                <FaUserAlt className="auth-input-icon" />
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input-field"
                  placeholder="Enter your email"
                />
              </div>

              {error.password && (
                <p className="error-message">{error.password}</p>
              )}
              <label htmlFor="password" className="auth-input-label">
                Your password
              </label>
              <br />
              <div className="auth-input-group">
                <FaLock className="auth-input-icon" />
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input-field"
                  placeholder="Enter your password"
                />
              </div>

              {error.profile && (
                <p className="error-message">{error.profile}</p>
              )}
              <label htmlFor="profile" className="auth-input-label">
                Select profile
              </label>
              <br />
              <div className="auth-input-group">
                <HiPhoto className="auth-input-icon" />
                <input
                  type="file"
                  name="profile"
                  onChange={(e) => setProfile(e.target.files?.[0])}
                  className="auth-input-field"
                />
              </div>

              {error.bio && <p className="error-message">{error.bio}</p>}
              <label htmlFor="bio" className="auth-input-label">
                Enter your bio
              </label>
              <br />
              <div className="auth-input-group">
                <textarea
                  name="bio"
                  rows={3}
                  placeholder="message..."
                  className="auth-input-textfield"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              {
                !loading?<button className="auth-button">Sign up</button>:<button disabled className="auth-button">Submiting...</button>
              }
              
              <p className="auth-switch">
                Alldready have an account? <span className="auth-link"><Link to={'/login'}>Login </Link></span>
              </p>
              <p className="auth-switch">
                <span className="auth-link">
                    <Link to={'/signup'}>Sign up</Link></span> as a Student
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default InstructorSignUpForm;
