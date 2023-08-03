interface Title {
  romaji: string;
  english: string;
  native: string;
}

interface CoverImage {
  large: string;
}

interface Media {
  id: number;
  title: Title;
  description: string;
  coverImage: CoverImage;
}

export interface AnimeDetailData {
  Media: Media;
}
