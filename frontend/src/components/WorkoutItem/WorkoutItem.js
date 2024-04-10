import React from 'react';
import styles from './WorkoutItem.module.css'; // Import CSS module

const WorkoutItem = ({ workout }) => {
  const createdAtDate = new Date(workout.createdAt); // Convert createdAt to a Date object

  // Format date and time string (e.g., "2022-04-15T10:30:00.000Z" => "15-Apr-2022 10:30 AM")
  const formattedCreatedAt = `${createdAtDate.getDate()}-${createdAtDate.toLocaleString('default', { month: 'short' })}-${createdAtDate.getFullYear()} ${createdAtDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

  return (
    <div className={styles['workout-item']}>
      <h3 className={styles['workout-title']}>{workout.title}</h3>
      <p className={styles['workout-detail']}><strong>Load:</strong> {workout.load} KG</p>
      <p className={styles['workout-detail']}><strong>Reps:</strong> {workout.reps}</p>
      <p className={styles['workout-detail']}><strong>Created:</strong> {formattedCreatedAt}</p>
    </div>
  );
};

export default WorkoutItem;
