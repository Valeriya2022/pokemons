import Head from 'next/head';
import { useGetPokemonsQuery } from '@/redux/features/pokemonsSlice';

export default function Home() {
  const { isLoading, data } = useGetPokemonsQuery({ offset: 0, limit: 20 });
  console.log(data);
  console.log(isLoading);
  return (
    <>
      <Head>
        <title>pokemons</title>
        <meta name="description" content="table of pokemons" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
