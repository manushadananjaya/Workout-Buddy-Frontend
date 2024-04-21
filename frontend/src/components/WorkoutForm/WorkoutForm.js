import React, { useState } from 'react';
import Input from '../../components/Input';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import useTokenRefresh from '../../hooks/useTokenRefresh';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const { accessToken, error: tokenError, refreshAccessToken } = useTokenRefresh(user?.RefreshToken);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to add a workout');
            return;
        }

        if (!accessToken) {
            if (tokenError) {
                setError('Failed to refresh access token. Please log in again.');
            } else {
                setError('Access token expired. Refreshing...');
                await refreshAccessToken(); // Call refreshAccessToken function from useTokenRefresh hook
                return; // Wait for token refresh to complete before continuing
            }
        }

        if (!title.trim() || !load || load <= 0 || !reps || reps <= 0) {
            setError('Please fill out all fields correctly');
            return;
        }

        const workout = { title, load: Number(load), reps: Number(reps) };

        try {
            const response = await fetch('/api/workouts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(workout),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Failed to add workout. Please try again.');
            } else {
                setTitle('');
                setLoad('');
                setReps('');
                setError(null);
                console.log('Workout added successfully');
                dispatch({ type: 'CREATE_WORKOUT', payload: json.workout });
            }
        } catch (error) {
            setError('Failed to add workout. Please try again.');
        }
    };

    return (
        <form className="max-w-sm mx-auto mt-8 p-4 border border-gray-300 rounded-md shadow-md" onSubmit={handleSubmit}>
            <Input
                label="Workout Title:"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter workout title"
            />
            <Input
                label="Load (IN KG):"
                type="number"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                placeholder="Enter load in kilograms"
            />
            <Input
                label="Reps:"
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="Enter number of reps"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Add Workout
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
    );
};

export default WorkoutForm;
