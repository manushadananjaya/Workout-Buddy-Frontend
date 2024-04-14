import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (response.ok) {
        //save token to local storage
        localStorage.setItem("user", JSON.stringify(json));

        //update auth context
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);

        console.log(json);
      } else {
        setIsLoading(false);
        setError("Signup failed Server error");
      }
    } catch (error) {
      setError("Signup failed Network error");
    }
  };
  return { error, isLoading, signup };
};