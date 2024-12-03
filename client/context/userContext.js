import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

// set axios to include credentials with every request
axios.defaults.withCredentials = true;
export const ContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // dynamic form handler
  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (!userState.name || !userState.email || !userState.password) {
      toast.error("All fields are required");
      return;
    }

    if (userState.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  // login user
  const loginUser = async (e) => {
    e.preventDefault();
    if (!userState.email || !userState.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );
      toast.success("User logged in successfully");
      setUserState({
        name: "",
        email: "",
        password: "",
      });
      router.push("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ registerUser, userState, handlerUserInput, loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
