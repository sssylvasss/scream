import React from "react";
import { LoaderWrapper, ScreamLoader } from "../style/GlobalStylComponents";


export const Loader = () => {
  return (
    <LoaderWrapper>
      <ScreamLoader>
        <img src="/public/screamLoader.svg" alt="Loading..." />
      </ScreamLoader>
    </LoaderWrapper>
  );
};
