import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Title {
  romaji: string;
  english: string;
  native: string;
}
interface CoverImage {
  large: string | StaticImport;
}
interface Media {
  id: number;
  title: Title;
  coverImage: CoverImage;
}
interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}
interface Page {
  media: Media[];
  pageInfo: PageInfo;
}
export interface PopularAnimeData {
  Page: Page;
}
