import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { breakpoints } from "./utilities/constants";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  margin-top: 10px;

  button:first-child {
    margin-right: 10px;
  }
`;

export const StyledAnimeTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

export const StyledCollectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledCollectionTitle = styled(Typography)`
  padding: 20px 0px;
  margin-right: 10px;
`;

export const StyledAnimeList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledAnimeListContainer = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 13px;
  row-gap: 13px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const StyledAnimeItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  a {
    max-width: 100%;
  }

  img {
    width: 100%;
  }

  h3 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    span {
      font-size: 12px;
    }

    button {
      font-size: 12px;
    }
  }
`;

export const StyledImageContainer = styled.div`
  height: 300px;
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    height: 250px;

    span {
      font-size: 12px;
    }
  }
`;