import React, { useState } from 'react';
import styles from './WorkoutForm.module.css'; // Import CSS module

const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, load, reps };

        const response = await fetch('/api/workouts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
