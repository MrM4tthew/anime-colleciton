import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Media } from "../../pages/types";

export interface AnimeCollectionProps {
  children: ReactNode;
}

export interface Anime {
  id: Number | undefined;
  name: String | undefined;
  imageUrl: string | StaticImport;
  animeLink: String;
}

export interface AnimeCollection {
  name: String | undefined;
  items: Anime[];
}

export type AnimeCollectionContextType = {
  animeCollection: AnimeCollection[];
  setAnimeCollection: React.Dispatch<React.SetStateAction<AnimeCollection[]>>;
  currentList: AnimeCollection[];
  createCollection: (newCollection: AnimeCollection) => void;
  addAnimeToCollection: (newAnime: Anime, collectionName: String | undefined) => void;
  removeCollection: (collectionName: String | undefined) => void;
  removeAnimeFromCollection: (animeId: Number | undefined, collectionName: String | String[] | undefined) => void;
  editCollection: (newName: String | undefined, collectionName: String | String[] | undefined) => void;
};

export interface CollectionModal {
  handleClose: () => void;
  collectionName?: String | String[] | undefined;
  isOpen: boolean;
  isEdit: boolean;
}

export interface SaveCollectionModal {
  handleClose: () => void;
  isOpen: boolean;
  animeData: Media | undefined
}
