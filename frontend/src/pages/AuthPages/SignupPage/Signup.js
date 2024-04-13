import { useState } from "react";
import { useSignup } from "../../../hooks/useSignup";
import {
    SignupContainer,
    SignupTitle,
    SignupForm,
    InputField,
    SubmitButton,
} from "./SignupStyles"; // Import styled components from separate file

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signup , error , isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    };

    return (
        <SignupContainer>
            <SignupTitle>Signup</SignupTitle>
            <SignupForm onSubmit={handleSubmit}>
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <SubmitButton type="submit" disabled={isLoading}>Signup</SubmitButton>
                {error && <div>{error}</div>}
            </SignupForm>
        </SignupContainer>
    );
};

export default Signup;
