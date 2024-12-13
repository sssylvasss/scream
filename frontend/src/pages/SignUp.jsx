import React, {useState} from "react";  
import { InnerLoginDiv, MainContainer, StyledBtn, StyledInput, StyledSignUpform, SubHeadTitle } from "../style/GlobalStylComponents";

export const SignUp = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password }),
    })
    setEmail("");
    setPassword("");
}

    return (
        <MainContainer>
            <InnerLoginDiv>
               
                <SubHeadTitle>Create an account at Scream Room</SubHeadTitle>
               <StyledSignUpform onSubmit={handleSubmit}>
                <StyledInput
                placeholder="Name" onChange={(e) => setName(e.target.value)}
                required margin="8px"
               />
                <StyledInput type="email"
                placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                required margin="8px"
                />
                <StyledInput placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                margin="8px 0px 8px 0px"
                />
                <StyledBtn type="submit" width="100%">Save</StyledBtn>
               </StyledSignUpform>

            </InnerLoginDiv>
        </MainContainer>

    );
};