// @ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PokemonResponse } from '@/types/pokemons';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

const fetchDetails = async pokemon => {
  const { url } = pokemon;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  endpoints: build => ({
    getPokemons: build.query<
      PokemonResponse,
      { offset: number; limit: number }
    >({
      async queryFn(
        { offset, limit }: { offset: number; limit: number },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const response = { data: {} };
        const pokemonList = await fetchWithBQ(
          `pokemon?offset=${offset}&limit=${limit}`
        );
        if (pokemonList.error)
          return { error: pokemonList.error as FetchBaseQueryError };
        response.data['count'] = pokemonList.data.count;
        const pokemonsDetails = await Promise.all(
          pokemonList.data.results.map(async pokemon => {
            const result = await fetchDetails(pokemon);

            return result;
          })
        );
        response.data['results'] = pokemonsDetails;
        return response;
      }
    })
  })
});

export const { useGetPokemonsQuery } = pokemonsApi;
