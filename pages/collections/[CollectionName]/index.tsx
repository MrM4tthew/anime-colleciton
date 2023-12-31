import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Layout from "@/layout";
import { AnimeCollectionContext } from "@/context/AnimeCollectionContext";
import NewCollectionModal from "@/components/NewCollectionModal";
import {
    StyledAnimeItem,
    StyledAnimeListContainer,
    StyledImageContainer,
    StyledCollectionTitle,
    StyledCollectionTitleContainer,
  } from "@/style";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentList, removeAnimeFromCollection } = useContext(
    AnimeCollectionContext
  );
  const router = useRouter();
  const { CollectionName } = router.query;

  const currentCollection = currentList.find(
    (item) => item.name === CollectionName
  );
  const collectionLength = currentCollection?.items.length;

  if (collectionLength === 0)
    return (
      <Layout>
        <StyledCollectionTitleContainer>
          <StyledCollectionTitle variant="h5">
            {CollectionName}
          </StyledCollectionTitle>
          <Button
            onClick={() => setIsOpen(true)}
            sx={{ height: 40 }}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </StyledCollectionTitleContainer>
        <span>No Anime please add anime</span>
        <NewCollectionModal
          handleClose={() => setIsOpen(false)}
          collectionName={CollectionName}
          isOpen={isOpen}
          isEdit={true}
        />
      </Layout>
    );

  return (
    <Layout>
      <StyledCollectionTitleContainer>
        <StyledCollectionTitle variant="h5">
          {CollectionName}
        </StyledCollectionTitle>
        <Button
          onClick={() => setIsOpen(true)}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      </StyledCollectionTitleContainer>
      <StyledAnimeListContainer>
        {currentCollection?.items.map((item) => (
          <StyledAnimeItem>
            <Link href={`/AnimeDetail/${item.id}`}>
              <StyledImageContainer>    
                <Image
                  src={item?.imageUrl}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt="anime image"
                />
              </StyledImageContainer>
              <span>{item.name}</span>
            </Link>
            <Button
              onClick={() => removeAnimeFromCollection(item.id, CollectionName)}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Remove
            </Button>
          </StyledAnimeItem>
        ))}
      </StyledAnimeListContainer>
      <NewCollectionModal
        handleClose={() => setIsOpen(false)}
        collectionName={CollectionName}
        isOpen={isOpen}
        isEdit={true}
      />
    </Layout>
  );
};

export default index;
