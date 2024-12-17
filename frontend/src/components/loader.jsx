import React from "react";
import { LoaderWrapper, ScreamLoader } from "../style/GlobalStylComponents";
import screamLoader from "../assets/scream-loader.svg";

export const Loader = () => {
  return (
    <LoaderWrapper>
      <ScreamLoader>
        <img src={screamLoader} alt="Loading.." />
      </ScreamLoader>
    </LoaderWrapper>
  );
};
