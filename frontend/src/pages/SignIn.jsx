import React, {useState} from "react";  
import { InnerLoginDiv, MainContainer, StyledHeaderText, SubHeadTitle } from "../style/GlobalStylComponents";

export const SignIn = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    setEmail("");
    setPassword("");
}

    return (
        <MainContainer>
            <InnerLoginDiv>
                <StyledHeaderText>Welcome to Scream Room! </StyledHeaderText>
                <SubHeadTitle>Login and scream your heart out</SubHeadTitle>
               <form onSubmit={handleSubmit}>
                <input type="email"
                placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                required
                ></input>
                <input placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                ></input>
                <button type="submit">Sign In</button>
               </form>

            </InnerLoginDiv>
        </MainContainer>

    );
};