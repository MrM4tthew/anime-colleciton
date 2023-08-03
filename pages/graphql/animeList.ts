import gql from "graphql-tag";

export default gql`
  query GetAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          medium
        }
      }
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
    }
  }
`;
