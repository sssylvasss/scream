import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { InnerLoginDiv, MainContainer, StyledA, StyledBtn, StyledHeaderText, StyledInputSignUp, StyledSignUpform, SubHeadTitle } from '../style/GlobalStylComponents';
import { Loader } from '../components/loader';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/signin', {
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
        <StyledHeaderText>Welcome to Scream Room! </StyledHeaderText>
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
          <StyledBtn type="submit" width="100%">Sign In</StyledBtn>
          <SubHeadTitle>
            <StyledA href="/signup">Create account</StyledA>
          </SubHeadTitle> 
          {errorMessage && <p>{errorMessage}</p>}
        </StyledSignUpform>
      </InnerLoginDiv>
      )}
    </MainContainer>
  );
};
