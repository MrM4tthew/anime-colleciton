import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../../../src/layout";
import { AnimeDetailData } from "./types";
import GET_ANIME_DETAIL from "./graphql/getAnimeDetail";
import { StyledAnimeTitleContainer } from "./style";
import { useContext, useEffect, useMemo, useState } from "react";
import { AnimeCollectionContext } from "@/context/AnimeCollectionContext";
import { Button } from "@mui/material";
import SaveToCollectionModal from "@/components/SaveToCollectionModal";

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
  const foundedData = currentList?.find((dt) => dt.id === data?.id);

  console.log({ currentList, foundedData });

  // const handleAdd = () => {
  //   if (foundedData) {
  //     removeAnime(data?.id)
  //   } else {
  //     addAnime({
  //       id: data?.id,
  //       name: data?.title.english,
  //       imageUrl: data?.coverImage.large,
  //       animeLink: `AnimeDetail/${data?.id}`,
  //     })
  //   }
  // }

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
