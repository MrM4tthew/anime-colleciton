import gql from "graphql-tag";

export default gql`
  query GetAnimeDetail($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        large
      }
    }
  }
`;
