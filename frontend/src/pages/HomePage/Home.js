import React, { useEffect } from "react";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import WorkoutItem from "../../components/WorkoutItem/WorkoutItem";
import styles from "./Home.module.css"; // Import CSS module for Home component styles
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);

  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json.workouts });
        
      }
    };

    fetchWorkouts();
  }, []);

  // console.log(dispatch);

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
