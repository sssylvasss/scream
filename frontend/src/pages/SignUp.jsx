import React, { useState } from "react";  
import { 
  InnerLoginDiv, 
  MainContainer, 
  StyledBtn, 
  StyledHeaderText, 
  StyledInputSignUp, 
  StyledLink, 
  StyledSignUpform, 
  SubHeadTitle 
} from "../style/GlobalStylComponents";
import { Loader } from '../components/loader';

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  // const VITE_API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(() => {
      setEmail("");
      setPassword("");
      fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      .then(response => response.json())
      .then(data => {
        // Handle successful login, e.g., save token, redirect, etc.
        console.log('Login successful:', data);
      })
      .catch(error => {
        console.error('Login error:', error);
      });
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false)
    });
  }

  return (
    <MainContainer>
      {loading ? (
        <Loader />
      ) : (
        <InnerLoginDiv>
          <img src="/screamLoader.svg" alt="Scream Loader" />
          <StyledHeaderText>Scream Room</StyledHeaderText>
          <SubHeadTitle>Create an account</SubHeadTitle>
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
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={5}
              onInvalid={(e) => e.target.setCustomValidity('Password must be at least 5 characters long')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <StyledBtn type="submit" width="100%" margin="8px 0 0 0">Save</StyledBtn>
            <SubHeadTitle>
              <StyledLink to="/signin">Already have an account?</StyledLink>
            </SubHeadTitle>
          </StyledSignUpform>
        </InnerLoginDiv>
      )}
    </MainContainer>
  );
};