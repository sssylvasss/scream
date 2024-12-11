import React, { useEffect, useState } from "react";



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
            <li key={index}>{scream.text}</li>
          ))
        }
 
    </div>
  );
}