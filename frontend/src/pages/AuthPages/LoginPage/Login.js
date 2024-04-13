import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin";
import {
    LoginContainer,
    LoginTitle,
    LoginForm,
    InputField,
    SubmitButton,
} from "./LoginStyles"; // Import styled components from separate file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    };

    return (
        <LoginContainer>
            <LoginTitle>Login</LoginTitle>
            <LoginForm onSubmit={handleSubmit}>
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
                <SubmitButton type="submit" disabled={isLoading}>Login</SubmitButton>
                {error && <div>{error}</div>}
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;
