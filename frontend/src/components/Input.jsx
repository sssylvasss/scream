import React, { useState } from "react";

export const Input = () => {
  const [scream, setScream] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/screams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: scream }), 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setScream(""); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={{ height: "100%", backgroundColor: "red" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your scream"
          value={scream}
          onChange={(e) => setScream(e.target.value)}
          required
        />
	
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
