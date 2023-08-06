import Link from "next/link";
import { StyledHeader, StyledHeaderContainer } from "./style";

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
