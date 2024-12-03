"use client";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { forgotPassword } = useUserContext();
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    forgotPassword(email);

    // clear input
    setEmail("");
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    window.history.back();
  };
  return (
    <form className="form-container">
      <button onClick={handleClick}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div className="form-index">
        <h1 className="title">Enter email to reset password</h1>

        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            placeholder="Enter your email"
            className="input"
          />
        </div>
        <div className="flex">
          <button type="submit" onClick={handleSubmit} className="button">
            Reset Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
