import React from 'react';
import styles from './WorkoutItem.module.css';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { formatDistanceToNow } from 'date-fns'; // Import formatDistanceToNow function

const WorkoutItem = ({ workout, onDelete }) => {
  const { dispatch } = useWorkoutsContext();

  const formattedCreatedAt = formatDistanceToNow(new Date(workout.createdAt), {
    addSuffix: true,
  });

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
