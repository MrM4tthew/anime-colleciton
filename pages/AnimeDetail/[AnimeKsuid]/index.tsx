import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { AnimeDetailData } from './types';
import GET_ANIME_DETAIL from './graphql/getAnimeDetail'

const index = () => {
    const router = useRouter();
    const { id } = router.query;
  
    const { loading, error, data } = useQuery<AnimeDetailData>(GET_ANIME_DETAIL, {
      variables: { id: Number(id) },
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
      <div>
        <h2>{data?.Media.title.english || data?.Media.title.romaji}</h2>
        <img src={data?.Media.coverImage.large} alt={data?.Media.title.english || data?.Media.title.romaji} />
        <p>{data?.Media.description}</p>
      </div>
    );
}

export default index