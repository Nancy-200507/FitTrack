import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthContext();

  const loginUser = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://fittrack-s4zk.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      // ✅ SAFE: read as text first
      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Server response is not valid JSON");
      }

      // ❌ handle backend errors properly
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ success
      localStorage.setItem("user", JSON.stringify(data));
      login(data);

    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
};