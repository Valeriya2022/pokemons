import { useGetPokemonsQuery } from '@/redux/features/pokemonsSlice';
import { Spin, Layout } from 'antd';
import { Pokemons } from '@/components/pokemons';
import { PokemonResponse } from '@/types/pokemons';

export default function Home() {
  const { isLoading, data }: { isLoading: boolean; data: PokemonResponse } =
    useGetPokemonsQuery({
      offset: 0,
      limit: 20
    });

  if (isLoading) {
    return (
      <div className={'container-center'}>
        <Spin size="large" />{' '}
      </div>
    );
  }

  return (
    <Layout>
      <Pokemons data={data.results} />
    </Layout>
  );
}
