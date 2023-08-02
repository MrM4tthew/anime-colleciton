import React from "react";
import { StyledHeader, StyledHeaderContainer } from "./style";
import Link from "next/link";

const Header = () => {
  return (
    <StyledHeaderContainer>
      <StyledHeader className="set-width">
        <Link href="/">Anime Goto</Link>
        <Link href="/collections">Collections</Link>
      </StyledHeader>
    </StyledHeaderContainer>
  );
};

export default Header;
