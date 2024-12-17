import React, { useState } from "react";
import { StyledBtn, StyledForm, StyledInput } from "../style/GlobalStylComponents";

export const Input = ({ onScreamPosted }) => {
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
      .then(() => {
        setScream(""); 
				onScreamPosted();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
		
				<StyledForm onSubmit={handleSubmit}>
					<StyledInput
						type="text"
						maxLength={140}
						placeholder="Enter your scream"
						value={scream}
						onChange={(e) => setScream(e.target.value)}
						required
					/>
		
					<StyledBtn type="submit" margin="0 0 0 8px">Scream</StyledBtn>
				</StyledForm>
		
  );
};
