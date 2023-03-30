// @ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PokemonResponse } from '@/types/pokemons';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

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
        let result = [];
        for (let i = 0; i < pokemonList.data.results.length; i++) {
          const pokemon = await fetchWithBQ(
            `pokemon/${pokemonList.data.results[i].name}`
          );
          result.push(pokemon.data);
        }
        response.data['results'] = result;
        return response;
      }
    })
  })
});

export const { useGetPokemonsQuery } = pokemonsApi;
