import React from 'react';
import styles from './WorkoutItem.module.css'; // Import CSS module
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';


const WorkoutItem = ({ workout, onDelete }) => {
  const { dispatch } = useWorkoutsContext();
  const createdAtDate = new Date(workout.createdAt); // Convert createdAt to a Date object

  // Format date and time string (e.g., "2022-04-15T10:30:00.000Z" => "15-Apr-2022 10:30 AM")
  const formattedCreatedAt = `${createdAtDate.getDate()}-${createdAtDate.toLocaleString('default', { month: 'short' })}-${createdAtDate.getFullYear()} ${createdAtDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

  const handleDelete = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
    }
  };

  return (
    <div className={styles['workout-item']}>
      <div className={styles['workout-content']}>
        <h3 className={styles['workout-title']}>{workout.title}</h3>
        <p className={styles['workout-detail']}><strong>Load:</strong> {workout.load} KG</p>
        <p className={styles['workout-detail']}><strong>Reps:</strong> {workout.reps}</p>
        <p className={styles['workout-detail']}><strong>Created:</strong> {formattedCreatedAt}</p>
      </div>
      <button className={styles['delete-button']} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default WorkoutItem;
