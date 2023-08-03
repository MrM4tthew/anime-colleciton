import styled from "@emotion/styled";

export const StyledHeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 98;
  height: 60px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
