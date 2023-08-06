import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AnimeDetailData } from "./types";
import Layout from "../../../src/layout";
import GET_ANIME_DETAIL from "../../../src/graphql/getAnimeDetail";
import { AnimeCollectionContext } from "@/context/AnimeCollectionContext";
import SaveToCollectionModal from "@/components/SaveToCollectionModal";
import { StyledAnimeTitleContainer } from "@/style";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentList } = useContext(AnimeCollectionContext);
  const router = useRouter();
  const { AnimeKsuid } = router.query;

  const {
    loading,
    error,
    data: dataRaw,
  } = useQuery<AnimeDetailData>(GET_ANIME_DETAIL, {
    variables: { id: Number(AnimeKsuid) },
  });

  const data = dataRaw?.Media;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Layout>
      <div>
        <StyledAnimeTitleContainer>
          <h2>{data?.title.english || data?.title.romaji}</h2>
          <Button
            variant="contained"
            // color={foundedData ? "secondary" : "primary"}
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            {/* {foundedData ? "Added" : "Add to collection"} */}
            Add to collection
          </Button>
        </StyledAnimeTitleContainer>
        <img
          src={data?.coverImage.large}
          alt={data?.title.english || data?.title.romaji}
        />
        <p>{data?.description}</p>
      </div>
      <SaveToCollectionModal
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen}
        animeData={data}
      />
    </Layout>
  );
};

export default index;
