import React from "react";
import { StyledP } from "../style/GlobalStylComponents";


export const Text = ({ text, index, randomNumber }) => {
  const fontSize = 40 - (index * 2);

  let fontColors = ["red", "blue", "green", "yellow", "orange", "purple", "pink"];
  const randomColor = fontColors[Math.floor(Math.random() * fontColors.length)];



  return (
    <StyledP fontSize={`${fontSize}px`} fontColor={randomColor} >
      {text} {index}
    </StyledP>
  );
};