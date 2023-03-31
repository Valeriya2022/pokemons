import { useGetAllPokemonsQuery } from '@/redux/features/pokemonsSlice';
import { Spin, Layout, Input } from 'antd';
import { Pokemons } from '@/components/pokemons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCurrentPage, setCurrentPage } from '@/redux/slices/pageSlice';
import { useEffect, useMemo, useState } from 'react';
import { Pokemon } from '@/types/pokemons';
import PokemonPagination from '@/components/pokemonPagination';

export default function Home() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const { isLoading, isError, data: allPokemons } = useGetAllPokemonsQuery();

  const searchResults = useMemo(
    () =>
      searchString && allPokemons?.results
        ? allPokemons.results.filter(pokemon =>
            pokemon.name.includes(searchString.toLowerCase())
          )
        : allPokemons?.results,
    [searchString, allPokemons]
  );

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      if (searchResults.length <= currentPage.offset) {
        dispatch(
          setCurrentPage({
            currentPage: 1,
            limit: currentPage.limit,
            offset: 0
          })
        );
        setPokemonList(searchResults.slice(0, currentPage.limit));
      } else {
        setPokemonList(
          searchResults.slice(
            currentPage.offset,
            currentPage.limit + currentPage.offset
          )
        );
      }
    }
  }, [searchResults]);

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
      {searchResults && (
        <PokemonPagination
          setPokemonList={setPokemonList}
          allPokemons={searchResults}
        />
      )}
    </Layout>
  );
}
