import React from "react";
import { MenueDiv } from "../style/GlobalStylComponents";

export const FalafelMenu = ({ openModal }) => {
  return (
    <MenueDiv onClick={openModal}>
      <img src="/falafel.svg" alt="Menu" />
    </MenueDiv>
  );
};