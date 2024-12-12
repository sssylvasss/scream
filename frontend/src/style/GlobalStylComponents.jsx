import styled from 'styled-components';

export const StyledHeaderText = styled.h1`
    font-size: 20px;
    font-family: "Courier New", Courier, monospace;

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
    @media (min-width: 768px) {
        padding-left: 5px;
        width: 300px;
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
    border: 2px solid white;
    border-radius: 8px;
    color: white;
    background: transparent;
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