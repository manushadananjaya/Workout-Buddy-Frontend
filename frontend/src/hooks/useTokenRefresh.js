import { useEffect, useState } from 'react';

const useTokenRefresh = (refreshToken) => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const refreshResponse = await fetch("/api/user/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            RefreshToken: refreshToken,
          }),
        });

        const refreshJson = await refreshResponse.json();

        if (refreshResponse.ok) {
          setAccessToken(refreshJson.AccessToken);
          setError(null);
        } else {
          setError(refreshJson.error || 'Unknown error');
        }
      } catch (error) {
        setError('Token refresh request failed');
      }
    };

    if (refreshToken) {
      refreshAccessToken();
    }
  }, [refreshToken]);

  return { accessToken, error };
};

export default useTokenRefresh;
