import React, { useState } from "react";
import Layout from "../src/layout";
import {
  StyledAnimeItem,
  StyledAnimeList,
  StyledAnimeListContainer,
  StyledImageContainer,
} from "./style";
import { useQuery } from "@apollo/client";
import { Pagination, Skeleton } from "@mui/material";
import GetAnime from "./graphql/animeList";
import Image from "next/image";
import { PopularAnimeData } from "./types";
import Link from "next/link";

const index = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery<PopularAnimeData>(GetAnime, {
    variables: { page, perPage: 8 },
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (error) return <p>Error</p>;

  return (
    <Layout>
      {loading ? (
        <Skeleton
          animation="pulse"
          variant="rectangular"
          width="100%"
          height={400}
        />
      ) : (
        <StyledAnimeListContainer>
          {data?.Page.media.map(({ id, title, coverImage }) => (
            <StyledAnimeItem key={id}>
              <Link href={`/AnimeDetail/${id}`}>
                <StyledImageContainer>
                  <Image
                    src={coverImage?.large}
                    layout="fill" 
                    objectFit="cover"
                    quality={100}
                    alt="anime image"
                  />
                </StyledImageContainer>
                <h3>{title.english || title.romaji}</h3>
                <p>{title.native}</p>
              </Link>
            </StyledAnimeItem>
          ))}
        </StyledAnimeListContainer>
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
