import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import "./style.css";
import { useLocation, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { server_url } from "../../../Hooks/customHook";

interface Otp3Props {
  userEmail?: string;
  onVerify?: (otp: string) => void;
  onBackToSignup?: () => void;
  onResendCode?: () => void;
}

export default function Otp3({
  onBackToSignup,
}: Otp3Props) {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location=useLocation()
  const [email, setEmail] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
    }
    else{
        toast.error("Cannot access OTP page directly!")
        navigate('/signup',{replace:true})
    }
  }, [location.state]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const index = inputRefs.current.indexOf(target);

    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Backspace") {
      e.preventDefault();

      if (target.value === "") {
        // If current field is empty, move to previous and clear it
        if (index > 0) {
          const prevInput = inputRefs.current[index - 1];
          setOtp((prevOtp) => {
            const newOtp = [...prevOtp];
            newOtp[index - 1] = "";
            return newOtp;
          });
          if (prevInput) {
            prevInput.focus();
          }
        }
      } else {
        // If current field has value, clear it but stay in same field
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index] = "";
          return newOtp;
        });
      }
    }

    if (e.key === "Delete") {
      e.preventDefault();
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = "";
        return newOtp;
      });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);

    if (target.value && /^[0-9]$/.test(target.value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = target.value;
        return newOtp;
      });

      // Move to next input if available
      if (index < otp.length - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (target.value === "") {
      // Handle clearing the input
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = "";
        return newOtp;
      });
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");

    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }

    const digits = text.split("");
    setOtp(digits);

    // Focus the last input after paste
    const lastInput = inputRefs.current[otp.length - 1];
    if (lastInput) {
      lastInput.focus();
    }
  };

  const handleVerify =async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log(enteredOtp)
    try {
        const response=await fetch(`${server_url}/verify-otp`,{
            method:'POST',
            body:JSON.stringify({email,otp:enteredOtp}),
            headers:{"Content-Type":"application/json"}
        })
        const data=await response.json()
        if(!data.success)
        {
            toast.error(data.message)
            if(data.message=='OTP Expired')
            {
                navigate(-1 )
                return
            }
        }
        toast.success(data.message)
        navigate('/login')
    } catch (error:any) {
        toast.error(error.message||error||"Something went wrong")
    }

  };

  const handleBackToSignup = () => {
    if (onBackToSignup) {
      onBackToSignup();
    } else {
      window.history.back();
    }
  };


  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="otp-container">
      {/* Back to Signup */}
      <button
        onClick={handleBackToSignup}
        className="otp-back-button"
        type="button"
      >
        <FaArrowLeft />
        <span>Back to Signup</span>
      </button>

      {/* Main Card Container */}
      <div className="otp-card">
        {/* Academy Logo/Header */}
        <div className="otp-header">
          <div className="otp-logo-container">
            <div className="otp-logo">
              <FaGraduationCap className="otp-logo-icon" />
            </div>
          </div>
          <h1 className="otp-title">Academy</h1>
          <p className="otp-subtitle">Verify Your Email Address</p>
        </div>

        {/* Email Display */}
        <div className="otp-email-display">
          <FaEnvelope className="otp-email-icon" />
          <span className="otp-email-text">{email}</span>
        </div>

        {/* OTP Form */}
        <div>
          <p className="otp-instructions">
            Enter the 4-digit code sent to your email
          </p>

          <form className="otp-form">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="otp-input"
              />
            ))}
          </form>

         
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!isOtpComplete}
          className="otp-verify-button"
          type="button"
        >
          Verify Email
        </button>

        {/* Support Text */}
        <p className="otp-support">
          Having trouble?{" "}
          <a href="mailto:support@academy.com" className="otp-support-link">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
