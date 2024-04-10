import React, { useEffect, useState } from "react";
import WorkoutForm from "../components/WorkoutForm/WorkoutForm";
import WorkoutItem from "../components/WorkoutItem/WorkoutItem";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json.workouts);
      }
    };

    fetchWorkouts();
  }, []);
  
  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutItem key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
