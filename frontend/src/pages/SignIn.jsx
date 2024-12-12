import React from "react";  
import { InnerLoginDiv, MainContainer, StyledHeaderText, SubHeadTitle } from "../style/GlobalStylComponents";

export const SignIn = () => {

    
    return (
        <MainContainer>
            <InnerLoginDiv>
                <StyledHeaderText>Welcome to Scream Room! </StyledHeaderText>
                <SubHeadTitle>Login and scream your heart out</SubHeadTitle>
               <form>
                <input type="email"
                placeholder="Email"></input>
                <input placeholder="Password"></input>
                <button>Sign In</button>
               </form>

            </InnerLoginDiv>
        </MainContainer>

    );
};