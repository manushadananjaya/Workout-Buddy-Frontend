import { useState, useEffect, useCallback } from 'react';

const useTokenRefresh = (refreshToken) => {
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);

    const refreshAccessToken = useCallback(async () => {
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
    }, [refreshToken]); 

    useEffect(() => {
        const handleRefresh = async () => {
            if (refreshToken) {
                await refreshAccessToken();
            }
        };

        handleRefresh(); 

    }, [refreshToken, refreshAccessToken]); 

    const handleRefreshToken = useCallback(async () => {
        await refreshAccessToken(); 
    }, [refreshAccessToken]); 

    return { accessToken, error, refreshAccessToken: handleRefreshToken };
};

export default useTokenRefresh;
