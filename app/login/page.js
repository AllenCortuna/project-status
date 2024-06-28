"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { errorToast } from "@/config/toast";
import { userStore } from "@/state/user";

const LoginPage = () => {
  const setIsLogin = userStore((state) => state.setIsLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Save the result in local storage (assuming a token is returned)
        localStorage.setItem("token", response.data.result.token);
        setIsLogin(response.data.result.token)
        setIsLoading(false);
        router.push("/"); // Login successful, redirect to the main page
      } else {
        setIsLoading(false);
        errorToast(response.data.error || "Login failed");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Login error: ", err);
      errorToast(err?.response?.data?.error);
    }
  };

  return (
    <div className="w-80 mx-auto flex flex-col justify-center items-center gap-10 p-5 mt-20 rounded-lg">
      <ToastContainer />
  
      <form onSubmit={handleLogin} className="p-5 flex gap-10 flex-col ">
        <div>
          <label className="primary-text ml-1 mb-1">Username:</label>
          <input
            type="text"
            className="custom-input w-full text-normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="primary-text ml-1 mb-1">Password:</label>
          <input
            type="password"
            className="custom-input w-full text-normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className={`btn ${
            isLoading ? "btn-disable" : "btn-neutral"
          } text-xs w-28 mx-auto`}
          disabled={isLoading}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
