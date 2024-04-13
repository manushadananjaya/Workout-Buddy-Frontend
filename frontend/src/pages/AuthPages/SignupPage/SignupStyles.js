import styled from "styled-components";

export const SignupContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
`;

export const SignupTitle = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
`;

export const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const InputField = styled.input`
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

export const SubmitButton = styled.button`
    padding: 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;
