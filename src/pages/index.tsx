import { useGetAllPokemonsQuery } from '@/redux/features/pokemonsSlice';
import { Spin, Layout, Input } from 'antd';
import { Pokemons } from '@/components/pokemons';
import { useAppSelector } from '@/redux/hooks';
import { getCurrentPage } from '@/redux/slices/pageSlice';
import { useEffect, useMemo, useState } from 'react';
import { Pokemon } from '@/types/pokemons';
import PokemonPagination from '@/components/pokemonPagination';

export default function Home() {
  const currentPage = useAppSelector(getCurrentPage);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const { isLoading, isError, data: allPokemons } = useGetAllPokemonsQuery();

  const searchResults = useMemo(
    () =>
      searchString
        ? allPokemons.results.filter(pokemon =>
            pokemon.name.includes(searchString.toLowerCase())
          )
        : allPokemons?.results,
    [searchString, allPokemons]
  );

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setPokemonList(
        searchResults.slice(
          currentPage.offset,
          currentPage.limit + currentPage.offset
        )
      );
    }
  }, [searchResults, currentPage]);

  if (isLoading || isError || pokemonList.length === 0) {
    return (
      <div className={'container-center'}>
        <Spin size="large" />{' '}
      </div>
    );
  }

  return (
    <Layout>
      <Input
        style={{
          maxWidth: '90vw',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          marginTop: '20px'
        }}
        placeholder="Search..."
        onChange={e => setSearchString(e.target.value)}
      />
      <Pokemons data={pokemonList} />
      <PokemonPagination
        setPokemonList={setPokemonList}
        allPokemons={searchResults}
        totalItems={searchResults.length}
      />
    </Layout>
  );
}
