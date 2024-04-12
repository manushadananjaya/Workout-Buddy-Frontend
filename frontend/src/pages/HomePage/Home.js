import React, { useEffect, useState } from "react";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import WorkoutItem from "../../components/WorkoutItem/WorkoutItem";
import styles from "./Home.module.css"; // Import CSS module for Home component styles

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
    <div className={styles.homeContainer}>
      <div className={styles.workoutsList}>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutItem key={workout._id} workout={workout} />
          ))}
      </div>
      <div className={styles.workoutForm}>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
