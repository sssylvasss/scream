
import React from "react";
import { FloatingText } from "../style/GlobalStylComponents";


export const Text = ({ text, index }) => {

const fontSize = 70 - (index * 2); 
let fontColors = ["red", "blue", "green", "yellow", "orange", "purple", "pink"];
const randomColor = fontColors[Math.floor(Math.random() * fontColors.length)];

  const randomStartX = Math.random() * 80; // Start position (left) between 0-80% of screen
  const randomStartY = Math.random() * 80; // Start position (top) between 0-80% of screen
  const randomDuration = 5 + Math.random() * 5; // Animation duration between 5-10 seconds

  return (
    <FloatingText
      color={randomColor}
      fontSize={fontSize}
      startX={randomStartX}
      startY={randomStartY}
      duration={randomDuration}
    >
      {text}
    </FloatingText>
  );
};
