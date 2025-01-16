import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { ErrorP, InnerLoginDiv, MainContainer, StyledBtn, StyledHeaderText, StyledInputSignUp, StyledLink, StyledSignUpform, SubHeadTitle } from '../style/GlobalStylComponents';
import { Loader } from '../components/loader';

const API_URL = import.meta.env.VITE_API_URL;

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); 

  
    try {
      const signupResponse = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const signupData = await signupResponse.json();
  
      if (!signupResponse.ok) {
        throw new Error(signupData.message || "Signup failed");
      }
  
      console.log("Signup successful:", signupData);
  
      const loginResponse = await fetch(`${API_URL}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const loginData = await loginResponse.json();
  
      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Login failed");
      }
  
      console.log("Login successful:", loginData);
  
      login(loginData);
      navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message); 
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <MainContainer>
            {loading ?  
              ( <Loader />) : (
      <InnerLoginDiv>
        <StyledHeaderText>Sign Up</StyledHeaderText>
        {errorMessage && <ErrorP>{errorMessage}</ErrorP>}

        <StyledSignUpform onSubmit={handleSubmit}>
          <StyledInputSignUp
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <StyledInputSignUp
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledInputSignUp
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledBtn type="submit" disabled={loading}>
            Sign Up
          </StyledBtn>
        </StyledSignUpform>
        <SubHeadTitle>
          Already have an account? <StyledLink to="/signin">Sign In</StyledLink>
        </SubHeadTitle>
      </InnerLoginDiv>
              )}
    </MainContainer>
  );
};