import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider"; 
import { StyledBtn, StyledForm, StyledInput } from "../style/GlobalStylComponents";
import { bannedWords } from "../utils/bannedWords";

const API_URL = import.meta.env.VITE_API_URL;

export const Input = ({ onScreamPosted }) => {
  const [scream, setScream] = useState("");
  const { user } = useAuth(); 

  const containsBannedWords = (text) => {
    const lowerText = text.toLowerCase();
    return bannedWords.some((word) => lowerText.includes(word));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.accessToken) {
      alert("You need to log in to post a scream.");
      return;
    }

    if (containsBannedWords(scream)) {
      alert("Your message contains inappropriate language.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/screams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
        body: JSON.stringify({ text: scream }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post scream.");
      }

      const data = await response.json();
      console.log("Scream posted successfully:", data);
      setScream("");
      onScreamPosted(); 
    } catch (error) {
      console.error("Error posting scream:", error.message);
      alert(error.message);
    }
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
      <StyledBtn type="submit" margin="0 0 0 8px">
        Scream
      </StyledBtn>
    </StyledForm>
  );
};
