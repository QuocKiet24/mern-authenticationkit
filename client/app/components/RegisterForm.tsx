"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";

const RegisterForm = () => {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <form onSubmit={registerUser} className="form-container">
      <div className="form-index">
        <h1 className="title">Register for an account</h1>
        <p className="message">
          Create an account. Already have an account?{" "}
          <a href="/login" className="link">
            Login
          </a>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input"
            placeholder="Enter your name"
            value={name}
            onChange={handlerUserInput("name")}
          />
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={handlerUserInput("email")}
          />
        </div>
        <div className="relative mt-4 flex flex-col">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={handlerUserInput("password")}
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>
        <div className="flex">
          <button type="submit" className="button">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
