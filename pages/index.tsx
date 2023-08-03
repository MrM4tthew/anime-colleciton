import React, { useState } from "react";
import Layout from "../src/layout";
import { StyledAnimeList } from "./style";
import { Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import GetAnime from "./graphql/animeList";
import Image from "next/image";
import { PopularAnimeData } from "./types";
import Link from "next/link";

const index = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery<PopularAnimeData>(GetAnime, {
    variables: { page, perPage: 10 },
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (error) return <p>Error</p>;

  return (
    <Layout>
      {/* <Typography variant='h5'>Anime List</Typography> */}
      {/* <StyledAnimeList>
        <Typography variant='h5'>Anime List</Typography>
      </StyledAnimeList> */}
      {loading ? (
        <CircularProgress />
      ) : (
        data?.Page.media.map(({ id, title, coverImage }) => (
          <div key={id}>
            <Link href={`/AnimeDetail/${id}`}>
              <Image src={coverImage?.medium} width={500} height={300} alt="anime image" />
              <h3>{title.english || title.romaji}</h3>
              <p>{title.native}</p>
            </Link>
          </div>
        ))
      )}

      <Pagination
        count={data?.Page.pageInfo?.lastPage || 1}
        page={page}
        onChange={handleChange}
      />
    </Layout>
  );
};

export default index;
