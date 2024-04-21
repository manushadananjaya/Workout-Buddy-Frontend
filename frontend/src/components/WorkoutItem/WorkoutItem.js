import React, { useEffect } from 'react';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../../hooks/useAuthContext';
import useTokenRefresh from '../../hooks/useTokenRefresh';

const WorkoutItem = ({ workout, onDelete }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const { accessToken, error: tokenError, refreshAccessToken } = useTokenRefresh(user?.RefreshToken);

  const formattedCreatedAt = formatDistanceToNow(new Date(workout.createdAt), {
    addSuffix: true,
  });

  useEffect(() => {
    // Automatically refresh access token when component mounts
    refreshAccessToken();
  }, [refreshAccessToken]);

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    // Check if access token is expired and refresh it if needed
    if (!accessToken) {
      if (tokenError) {
        console.error('Token refresh failed. Please log in again.');
        return;
      } else {
        console.log('Access token expired. Refreshing...');
        await refreshAccessToken();
        return; // Wait for token refresh to complete before deleting workout
      }
    }

    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
      } else {
        console.error('Failed to delete workout.');
      }
    } catch (error) {
      console.error('Failed to delete workout.', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="md:flex-grow md:mr-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{workout.title}</h3>
        <p className="text-sm text-gray-600 mb-1"><strong>Load:</strong> {workout.load} KG</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Reps:</strong> {workout.reps}</p>
        <p className="text-sm text-gray-600"><strong>Created:</strong> {formattedCreatedAt}</p>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mt-2 md:mt-0 md:ml-4"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default WorkoutItem;
