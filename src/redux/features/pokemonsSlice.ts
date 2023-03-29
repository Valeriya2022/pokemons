import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PokemonResponse } from '@/types/pokemons';

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  endpoints: build => ({
    getPokemons: build.query<PokemonResponse, void>({
      query: ({ offset, limit }: { offset: number; limit: number }) => ({
        url: `pokemon?offset=${offset}&limit=${limit}`
      })
    })
  })
});

export const { useGetPokemonsQuery } = pokemonsApi;
