import {
  useGetAllPokemonsQuery,
  useGetPokemonsQuery
} from '@/redux/features/pokemonsSlice';
import { Spin, Layout } from 'antd';
import { Pokemons } from '@/components/pokemons';
import { useAppSelector } from '@/redux/hooks';
import { getCurrentPage } from '@/redux/slices/pageSlice';
import { useEffect, useState } from 'react';
import { Pokemon } from '@/types/pokemons';
import PokemonPagination from '@/components/pokemonPagination';

export default function Home() {
  const currentPage = useAppSelector(getCurrentPage);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const { isLoading, data, refetch, isFetching, isError } = useGetPokemonsQuery(
    {
      offset: currentPage.offset,
      limit: currentPage.limit
    }
  );
  const { isLoading: isAllPokemonsLoading, data: allPokemons } =
    useGetAllPokemonsQuery();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setPokemonList(data.results);
    }
  }, [data, isError, isLoading]);

  if (isLoading || pokemonList.length === 0 || isFetching || !data) {
    return (
      <div className={'container-center'}>
        <Spin size="large" />{' '}
      </div>
    );
  }

  return (
    <Layout>
      <Pokemons data={pokemonList} />
      <PokemonPagination
        setPokemonList={setPokemonList}
        allPokemons={allPokemons}
        isAllPokemonsLoading={isAllPokemonsLoading}
        totalItems={data?.count}
        refetch={refetch}
      />
    </Layout>
  );
}
