import styled from 'styled-components';


export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(to top left, #0099ff 0%, #003366 100%);
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const StyledP = styled.p`
    position: absolute;
    animation: moveAround 10s infinite alternate;

    @keyframes moveAround {
        0% {
            top: 0;
            left:${(props) => props.randomLeft1};
        }
      
        50% {
            top: 50%;
            left: ${(props) => props.randomLeft2};
        }

        100% {
            top: 0;
            left: ${(props) => props.randomLeft3};
        }
    }
    font-size: ${(props) => props.fontSize || '12px'};
    color: ${(props) => props.fontColor || 'black'};
    padding: 0;
    margin: 0;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
`;

export const StyledInput = styled.input`
    height: 40px;
    width: 200px;
    border: 2px solid black;
    border-radius: 8px;    
    @media (min-width: 768px) {
            height: 50px;
            font-size: 20px;
        }
        @media (min-width: 1400px) {
            height: 60px;
            font-size: 22px;
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
    border: 2px solid black;
    border-radius: 8px;
    font-size: 16px;
        @media (min-width: 768px) {
            height: 50px;
            padding: 0 30px;
            margin-left: 20px;
            font-size: 20px;
        }
        @media (min-width: 1400px) {
            height: 60px;
            font-size: 22px;
        }

`;