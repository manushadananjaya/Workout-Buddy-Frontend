import React, { useState } from 'react';
import styles from './WorkoutForm.module.css'; // Import CSS module
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setError('You must be logged in to add a workout');
            return;
        }

        const workout = { title, load, reps };

        const response = await fetch('/api/workouts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify(workout),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('Workout added successfully');
            dispatch({ type: 'CREATE_WORKOUT', payload: json.workout });
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label className={styles.label}>Workout Title:</label>
            <input
                type='text'
                required
                className={styles.inputField}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label className={styles.label}>Load (IN KG):</label>
            <input
                type='number'
                required
                className={styles.inputField}
                value={load}
                onChange={(e) => setLoad(e.target.value)}
            />
            <label className={styles.label}>Reps:</label>
            <input
                type='number'
                required
                className={styles.inputField}
                value={reps}
                onChange={(e) => setReps(e.target.value)}
            />
            <button type="submit" className={styles.submitButton}>Add Workout</button>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
    );
};

export default WorkoutForm;
