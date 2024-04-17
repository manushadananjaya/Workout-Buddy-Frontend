import React, { useEffect, useState } from "react";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import WorkoutItem from "../../components/WorkoutItem/WorkoutItem";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);

  useEffect(() => {
    const refreshAccessToken = async (refreshToken) => {
      try {
        const refreshResponse = await fetch("/api/user/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            RefreshToken: refreshToken,
          }),
        });
        const refreshJson = await refreshResponse.json();
        if (refreshResponse.ok) {
          dispatch({
            type: "UPDATE_ACCESS_TOKEN",
            payload: refreshJson.AccessToken,
          });
          setLoginRequired(false);
          return refreshJson.AccessToken;
        } else {
          console.error("Token refresh failed:", refreshJson.error);
          setLoginRequired(true);
        }
      } catch (refreshError) {
        console.error("Token refresh request failed:", refreshError);
        setLoginRequired(true);
      }
      return null;
    };

    const fetchWorkouts = async () => {
      if (user) {
        try {
          const response = await fetch("/api/workouts/", {
            headers: {
              Authorization: `Bearer ${user.AccessToken}`,
            },
          });
          const json = await response.json();

          if (response.ok) {
            dispatch({ type: "SET_WORKOUTS", payload: json.workouts });
          } else if (json.error === "Token expired" && user.RefreshToken) {
            const newAccessToken = await refreshAccessToken(user.RefreshToken);
            if (newAccessToken) {
              const retryResponse = await fetch("/api/workouts/", {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              const retryJson = await retryResponse.json();
              if (retryResponse.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: retryJson.workouts });
              }
            }
          }
        } catch (error) {
          console.error("Fetch workouts error:", error);
          setLoginRequired(true);
        }
      }
    };

    fetchWorkouts();
  }, [dispatch, user]);

  const toggleWorkoutForm = () => {
    if (loginRequired) {
      return;
    }
    setShowWorkoutForm(!showWorkoutForm);
  };

  const handleLoginAgain = () => {
    logout(); 

    setLoginRequired(true);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Workouts</h1>
        {user && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={toggleWorkoutForm}
          >
            Add Workout
          </button>
        )}
      </div>

      <div>
        {workouts &&
          workouts.map((workout) => (
            <div key={workout._id} className="mb-4">
              <WorkoutItem workout={workout} />
            </div>
          ))}
      </div>

      {showWorkoutForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Workout</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={toggleWorkoutForm}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <WorkoutForm />
          </div>
        </div>
      )}

      {loginRequired && (
        <div className="flex justify-center mt-4">
          <p className="text-red-500">
            Session expired. Please{" "}
            <span
              onClick={handleLoginAgain}
              className="underline cursor-pointer text-blue-500 hover:text-blue-700"
            >
              log in again
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
