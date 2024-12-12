
import React from "react";
import styled, { keyframes } from "styled-components";


const floatAnimation = keyframes`
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(20px, -30px);
  }
  50% {
    transform: translate(-30px, 20px);
  }
  75% {
    transform: translate(30px, 30px);
  }
  100% {
    transform: translate(0, 0);
  }
`;


const FloatingText = styled.div`
  position: absolute;
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "white"};
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  animation: ${floatAnimation} ${(props) => props.duration}s infinite ease-in-out;
  top: ${(props) => props.startY}%;
  left: ${(props) => props.startX}%;
`;

export const Text = ({ text, index }) => {

  const fontSize = 60 - (index * 2);
// let fontColors = ["red", "blue", "green", "yellow", "orange", "purple", "pink"];
// const randomColor = fontColors[Math.floor(Math.random() * fontColors.length)];

  const randomStartX = Math.random() * 80; // Start position (left) between 0-80% of screen
  const randomStartY = Math.random() * 80; // Start position (top) between 0-80% of screen
  const randomDuration = 5 + Math.random() * 5; // Animation duration between 5-10 seconds

  return (
    <FloatingText
      // color={randomColor}
      fontSize={`${fontSize}px`}
      startX={randomStartX}
      startY={randomStartY}
      duration={randomDuration}
    >
      {text}
    </FloatingText>
  );
};
