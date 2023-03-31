import { useGetAllPokemonsQuery } from '@/redux/features/pokemonsSlice';
import { Spin, Layout } from 'antd';
import { Pokemons } from '@/components/pokemons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCurrentPage, setCurrentPage } from '@/redux/slices/pageSlice';
import { useEffect, useMemo, useState } from 'react';
import { Pokemon } from '@/types/pokemons';
import PokemonPagination from '@/components/pokemonPagination';
import SearchAndFilter from '@/components/searchAndFilter';

export default function Home() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<Array<string>>([]);
  const { isLoading, isError, data: allPokemons } = useGetAllPokemonsQuery();

  const filteredPokemon = useMemo(
    () =>
      selectedTypes.length > 0 && allPokemons
        ? allPokemons.results.filter(pokemon => {
            const arr = pokemon.types;

            for (let i = 0; i < arr.length; i += 1) {
              if (selectedTypes.indexOf(arr[i].type.name) !== -1) return true;
            }
            return false;
          })
        : allPokemons?.results,

    [selectedTypes, allPokemons]
  );

  const searchResults = useMemo(
    () =>
      searchString && filteredPokemon
        ? filteredPokemon.filter(pokemon =>
            pokemon.name.includes(searchString.toLowerCase())
          )
        : filteredPokemon,
    [searchString, filteredPokemon]
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
      <SearchAndFilter
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        setSearchString={setSearchString}
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
