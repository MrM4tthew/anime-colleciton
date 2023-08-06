import {
  AnimeCollectionContextType,
  AnimeCollectionProps,
  AnimeCollection,
  Anime,
} from "@/types";
import React, { createContext, useState, useEffect, ReactNode } from "react";

export const AnimeCollectionContext = createContext<AnimeCollectionContextType>(
  {
    animeCollection: [],
    setAnimeCollection: () => {},
    currentList: [],
    createCollection: () => {},
    addAnimeToCollection: () => {},
    removeCollection: () => {},
    removeAnimeFromCollection: () => {},
    editCollection: () => {}
  }
);

const AnimeCollectionProvider = ({ children }: AnimeCollectionProps) => {
  const [animeCollection, setAnimeCollection] = useState<AnimeCollection[]>([]);
  const [currentList, setCurrentList] = useState<AnimeCollection[]>([]);

  useEffect(() => {
    let currentData = null;
    const item = localStorage.getItem("animeCollection");

    if(item !== null) {
      currentData = JSON.parse(item);
    }
    setCurrentList(currentData);
  }, []);

  // Load the anime collection from localStorage when the component is mounted
  useEffect(() => {
    const savedAnimeCollection = localStorage.getItem("animeCollection");
    if (savedAnimeCollection) {
      setAnimeCollection(JSON.parse(savedAnimeCollection));
    }
  }, []);

  // Save the anime collection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("animeCollection", JSON.stringify(animeCollection));
    setCurrentList(animeCollection);
  }, [animeCollection]);

  const createCollection = (newCollection: AnimeCollection) => {
    setAnimeCollection([...animeCollection, newCollection]);
  };

  const addAnimeToCollection = (
    newAnime: Anime,
    collectionName: String | undefined
  ) => {
    const selectedCollection = animeCollection.find(
      (anime) => anime.name === collectionName
    );
    selectedCollection?.items.push(newAnime);
    setAnimeCollection([...animeCollection]);
  };

  const removeCollection = (collectionName: String | undefined) => {
    const selectedIndex =
      animeCollection?.findIndex((item) => item.name === collectionName) || 0;
    animeCollection.splice(selectedIndex, 1);

    setAnimeCollection([...animeCollection]);
  };

  const removeAnimeFromCollection = (
    animeId: Number | undefined,
    collectionName: String | String[] | undefined
  ) => {
    const selectedCollection = animeCollection.find(
      (anime) => anime.name === collectionName
    );
    const selectedIndex =
      selectedCollection?.items.findIndex((item) => item.id === animeId) || 0;
    selectedCollection?.items.splice(selectedIndex, 1);

    setAnimeCollection([...animeCollection]);
  };

  const editCollection = (newName: String | undefined, collectionName: String | String[] | undefined) => {
    const selectedCollection = animeCollection?.find(
      (item) => item.name === collectionName
    ) || {name: ""};
    selectedCollection.name = newName;

    console.log({ animeCollection, newName, selectedCollection }, "col oi");
    setAnimeCollection([...animeCollection]);
  };

  return (
    <AnimeCollectionContext.Provider
      value={{
        animeCollection,
        setAnimeCollection,
        currentList,
        createCollection,
        addAnimeToCollection,
        removeCollection,
        removeAnimeFromCollection,
        editCollection
      }}
    >
      {children}
    </AnimeCollectionContext.Provider>
  );
};

export default AnimeCollectionProvider;
