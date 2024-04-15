import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        //save token to local storage
        localStorage.setItem("user", JSON.stringify(json));

        //update auth context
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);

        console.log(json);
      } else {
        setIsLoading(false);
        setError(json.error);
      }
    } catch (error) {
      setError("Signup failed Network error");
    }
  };
  return { error, isLoading, login };
};
