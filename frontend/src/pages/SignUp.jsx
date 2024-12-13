import React, {useState} from "react";  
import { InnerLoginDiv, MainContainer, StyledA, StyledBtn, StyledInputSignUp, StyledSignUpform, SubHeadTitle } from "../style/GlobalStylComponents";

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
            <StyledInputSignUp
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <StyledInputSignUp
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <StyledInputSignUp
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
            <StyledBtn type="submit" width="100%">Save</StyledBtn>
            <SubHeadTitle>
              <StyledA href="/signin">Already have an account?</StyledA>
            </SubHeadTitle>
          </StyledSignUpform>
        </InnerLoginDiv>
      </MainContainer>
    );
};