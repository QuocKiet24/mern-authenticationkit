"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";

const LoginForm = () => {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <form onSubmit={loginUser} className="form-container">
      <div className="form-index">
        <h1 className="title">Login to your account</h1>
        <p className="message">
          Login to your account. Dont't have an account?{" "}
          <a href="/register" className="link">
            Register
          </a>
        </p>
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
        <div className="mt-4 flex justify-end">
          <a href="/forgot-password" className="link">
            Forgot password?
          </a>
        </div>
        <div className="flex">
          <button
            disabled={!email || !password}
            type="submit"
            className="button"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
