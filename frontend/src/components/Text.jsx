import React from "react";
import { StyledP } from "./GlobalStylComponents";


export const Text = ({ text, index }) => {
  const fontSize = 40 - (index * 2);

  return (
    <StyledP fontSize={`${fontSize}px`} fontColor="blue">
      {text} {index}
    </StyledP>
  );
};