import React, { useState } from "react";
import { StyledBtn, StyledForm, StyledInput } from "../style/GlobalStylComponents";
import { bannedWords } from "../utils/bannedWords";
const API_URL = import.meta.env.VITE_API_URL;

export const Input = ({ onScreamPosted }) => {
  const [scream, setScream] = useState("");

  const containsBannedWords = (text) => {
    const lowerText = text.toLowerCase();
    return bannedWords.some((word) => lowerText.includes(word));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (containsBannedWords(userInput)) {
      alert("Your message contains inappropriate language.");
      return;
    }
    fetch(`${API_URL}/screams`, {
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
