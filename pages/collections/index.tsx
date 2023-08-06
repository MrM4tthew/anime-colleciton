import React, { useContext, useState } from "react";
import Layout from "@/layout";
import { AnimeCollectionContext } from "@/context/AnimeCollectionContext";
import {
  StyledAnimeItem,
  StyledAnimeListContainer,
  StyledImageContainer,
} from "@/style";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import NewCollectionModal from "@/components/NewCollectionModal";
import { Delete as DeleteIcon } from "@mui/icons-material";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Get item from localStorage
  const { currentList, removeCollection } = useContext(AnimeCollectionContext);
  return (
    <Layout>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        Create a New Collection
      </Button>
      <StyledAnimeListContainer>
        {currentList?.map((selectedList) => (
          <StyledAnimeItem>
            <Link href={`/collections/${selectedList.name}`}>
              <StyledImageContainer>
                <Image
                  src={
                    selectedList?.items.length === 0
                      ? "/images/blueBackground.jpg"
                      : selectedList?.items?.[0]?.imageUrl
                  }
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt="anime image"
                />
              </StyledImageContainer>
              <span>{selectedList.name}</span>
            </Link>
            <Button
              onClick={() => removeCollection(selectedList.name)}
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
        isOpen={isOpen}
        isEdit={false}
      />
    </Layout>
  );
};

export default index;
