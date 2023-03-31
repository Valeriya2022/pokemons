// @ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PokemonResponse } from '@/types/pokemons';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

const fetchDetails = async pokemon => {
  const { url } = pokemon;
  const response = await fetch(url);
  return await response.json();
};

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  endpoints: build => ({
    getAllPokemons: build.query<PokemonResponse, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const response = { data: {} };
        const pokemonList = await fetchWithBQ(`pokemon?limit=1281`);
        if (pokemonList.error)
          return { error: pokemonList.error as FetchBaseQueryError };
        response.data['count'] = pokemonList.data.count;
        response.data['results'] = await Promise.all(
          pokemonList.data.results.map(async pokemon => {
            return await fetchDetails(pokemon);
          })
        );
        return response;
      }
    })
  })
});

export const { useGetAllPokemonsQuery } = pokemonsApi;
