import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

// set axios to include credentials with every request
axios.defaults.withCredentials = true;
export const ContextProvider = ({ children }) => {
  const serverUrl = "https://mern-authenticationkit.onrender.com";

  const router = useRouter();

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isLoggin, setIsLoggin] = useState(false);
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
      // refresh the user details
      await getUser(); // fetch before redirecting
      router.push("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user loggin status
  const userLoginStatus = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true, // send cookies to the server
      });

      setIsLoggin(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  };

  //logout user
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });
      toast.success("User logged out successfully");

      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user details
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/v1/profile`, {
        withCredentials: true,
      });

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });
      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //update user
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true, // send cookies to the server
      });
      // update the user state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });
      toast.success("User updated successfully");

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //email verification
  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-email`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Email verification sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error sending email verification", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //verify user
  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-user/${token}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );
      toast.success("User verified successfully");
      // refresh the user details
      getUser();
      setLoading(false);
      // redirect to home page
      router.push("/");
    } catch (error) {
      console.log("Error verifying user", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //forgot password
  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/forgot-password`,
        { email },
        { withCredentials: true }
      );

      toast.success("Password reset link sent to your email");

      setLoading(false);
    } catch (error) {
      console.log("Error sending forgot password email", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //reset password
  const resetPassword = async (token, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );
      toast.success("Password reset successfully");
      setLoading(false);
      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${serverUrl}/api/v1/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      toast.success("Password changed successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // admin routes
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${serverUrl}/api/v1/admin/users`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      setAllUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      console.log("Error getting all users", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // delete user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${serverUrl}/api/v1/admin/users/${id}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User deleted successfully");
      setLoading(false);
      // refresh the users list
      getAllUsers();
    } catch (error) {
      console.log("Error deleting user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();

      if (isLoggedIn) {
        await getUser();
      }
    };

    loginStatusGetUser();
  }, []);

  useEffect(() => {
    if (user.role === "admin") {
      getAllUsers();
    }
  }, [user.role]);
  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        userLoginStatus,
        logoutUser,
        user,
        updateUser,
        emailVerification,
        loading,
        verifyUser,
        forgotPassword,
        resetPassword,
        changePassword,
        allUsers,
        deleteUser,
        isLoggin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
