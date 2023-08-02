import React, { ReactNode } from "react";
import Header from "./Header";
import { StyledPageContainer } from "./style";

interface props {
  children?: ReactNode;
}

const index = ({ children }: props) => {
  return (
    <>
      <Header />
      <StyledPageContainer>
        <div className="set-width">{children}</div>
      </StyledPageContainer>
    </>
  );
};

export default index;
