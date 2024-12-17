import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { InnerLoginDiv, MainContainer, StyledBtn, StyledHeaderText, StyledInputSignUp, StyledLink, StyledSignUpform, SubHeadTitle } from '../style/GlobalStylComponents';
import { Loader } from '../components/loader';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  // const VITE_API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
      throw new Error('Invalid email or password');
      }
      const data = await response.json();
      login(data); 
      navigate('/');
      setEmail('');
      setPassword(''); 
    } catch (error) {
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
        <img src="/screamLoader.svg" alt="Scream Loader" />
        <StyledHeaderText>Scream Room</StyledHeaderText>
        <SubHeadTitle>Login and scream your heart out</SubHeadTitle>    
        <StyledSignUpform onSubmit={handleSubmit}>
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
          <StyledBtn type="submit" margin="8px 0 0 0" width="100%">Sign In</StyledBtn>
          <SubHeadTitle>
            <StyledLink to="/signup">Create account</StyledLink>
          </SubHeadTitle> 
          {errorMessage && <p>{errorMessage}</p>}
        </StyledSignUpform>
      </InnerLoginDiv>
      )}
    </MainContainer>
  );
};
