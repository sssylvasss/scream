import styled, { keyframes } from 'styled-components';

export const StyledHeaderText = styled.h1`
    font-size: 20px;
    font-family: "Courier New", Courier, monospace;
    color: white;
    @media (min-width: 768px) {
            font-size: 30px;
        }
        @media (min-width: 1400px) {
            font-size: 50px;
        }
`;
export const SubHeadTitle = styled.h2`
    font-size: 16px;
    font-family: "Courier New", Courier, monospace;
    color: white;
    @media (min-width: 768px) {
            font-size: 20px;
        }
        @media (min-width: 1400px) {
    
        }
`;

export const InnerLoginDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 100vh;
    flex-direction: column;
`;

export const MainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(to top left, #0099ff 0%, #003366 100%);
    overflow: hidden; 
`;

export const InnerContainer = styled.div`
    position: relative;
    flex-grow: 1;
    overflow: hidden;
`;


export const StyledInput = styled.input`
    height: 40px;
    width: 200px;
    border: 2px solid white;
    border-radius: 8px; 
    margin: ${(props) => props.margin || "0px"};   
    @media (min-width: 768px) {
        padding-left: 5px;
        width: 300px;
        height: 50px;
        font-size: 20px;
    }

`;

export const StyledInputSignUp = styled.input`
    height: 40px;
    border: 2px solid white;
    border-radius: 8px; 
    width: 100%;
    margin: 8px;
    min-width: 250px;
    @media (min-width: 768px) {
            height: 50px;
            font-size: 20px;
        }
`;
export const StyledForm = styled.form`
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 100px;
    align-items: center;
        @media (min-width: 768px) {
            padding: 30px;
            border: none;
            justify-content: right;
        }
        @media (min-width: 1400px) {
        }
`;

export const StyledBtn = styled.button`
    height: 40px;
    padding: 0 20px;
    border: 2px solid white;
    border-radius: 8px;
    color: white;
    background: transparent;
    font-size: 16px;
    width: ${(props) => props.width|| "auto"};  
    margin: ${(props) => props.margin || "0px"};
        @media (min-width: 768px) {
            height: 50px;
            padding: 0 30px;
            margin-left: ${(props) => props.margin || "0px"};
            font-size: 20px;
        }


`;

export const StyledSignUpform = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`;


export const StyledA = styled.a`
    color: white;
    text-decoration: none;
    font-size: 16px;
    &:hover {
        font-weight: 500;
    }
    @media (min-width: 768px) {
        font-size: 20px;
    }
    @media (min-width: 1400px) {
        font-size: 24px;
    }
`;

export const MenueDiv = styled.div`
z-index: 1000;
position: absolute;
top: 20px;
right: 20px;
`;

export const ModalMainDiv = styled.div`
     position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`; 

export const ContentDiv = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
`;

export const ModalText = styled.p`
font-size: 16px;
    font-family: "Courier New", Courier, monospace;
  font-weight: bold;
    @media (min-width: 768px) {
            font-size: 20px;
        }

`;

export const ModalBtn = styled.button`
  height: 40px;
  border: 2px solid black;
  border-radius: 8px;
  color: black;
  background: transparent;
  font-size: 16px;
  width: 100px;
  margin: 8px;
  @media (min-width: 768px) {
    height: 50px;
    font-size: 20px;
  }
`;


//loader
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const ScreamLoader = styled.div`
  animation: ${spin} 2s linear infinite;
`;


export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3); /* Adjust the opacity as needed */
`;