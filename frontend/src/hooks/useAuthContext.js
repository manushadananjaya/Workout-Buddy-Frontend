import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useWorkoutsContext must be used within a WorkoutProvider"
        );
    }
    return context;
}