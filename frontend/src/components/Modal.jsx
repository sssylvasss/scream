import React from "react";
import { ContentDiv, ModalMainDiv } from "../style/GlobalStylComponents";


export const Modal = ({ children, onClose }) => {
  return (
    <ModalMainDiv>
      <ContentDiv>
        {children}
      </ContentDiv>
    </ModalMainDiv>
  );
};
