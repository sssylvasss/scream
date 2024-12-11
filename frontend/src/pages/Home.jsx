import React, { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Text } from "../components/Text";
import { InnerContainer, MainContainer } from "../style/GlobalStylComponents";



export const Home = () => {
  const[screamList, setScreamList] = useState([])

  const fetchScreams =() => {
    fetch('http://localhost:8080/screams')
    .then((response) => response.json())
    .then((data) => {
      setScreamList(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  useEffect(() => {
    fetchScreams()
  
  }, [])

  return (
    <MainContainer>
      <InnerContainer>

        {
          screamList.map((scream, index) => (
            <Text key={index} text={scream.text} index={index} />
          ))
        }
        </InnerContainer>
        <Input onScreamPosted={fetchScreams} />
    
    </MainContainer>
  );
}