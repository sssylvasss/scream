import React, {useState} from "react";  
import { InnerLoginDiv, MainContainer, StyledHeaderText, SubHeadTitle } from "../style/GlobalStylComponents";

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
               <form onSubmit={handleSubmit}>
                <input
                placeholder="Name" onChange={(e) => setName(e.target.value)}
                required
                ></input>
                <input type="email"
                placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                required
                ></input>
                <input placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                ></input>
                <button type="submit">Save</button>
               </form>

            </InnerLoginDiv>
        </MainContainer>

    );
};