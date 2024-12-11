import React, { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Text } from "../components/Text";



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
    <div style={{ height: "100%", backgroundColor: "red" }}>
      <h1>Welcome to scream your heart out</h1>
        {
          screamList.map((scream, index) => (
            <Text key={index} text={scream.text} index={index}/>
          ))
        }
        <Input onScreamPosted={fetchScreams} />
    
    </div>
  );
}