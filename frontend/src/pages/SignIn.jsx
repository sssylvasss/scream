import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { InnerLoginDiv, MainContainer, StyledHeaderText, SubHeadTitle } from '../style/GlobalStylComponents';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      login(data); // Save user in context
      navigate('/'); // Redirect to home page
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <MainContainer>
      <InnerLoginDiv>
      <StyledHeaderText>Welcome to Scream Room! </StyledHeaderText>
      <SubHeadTitle>Login and scream your heart out</SubHeadTitle>    
      <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
    </InnerLoginDiv>
    </MainContainer>
  );
};
