import { Card, Tag, Space } from 'antd';
import { Pokemon } from '@/types/pokemons';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Card
      cover={
        <img
          alt=""
          src={pokemon.sprites.front_default ?? '/icon_monster.png'}
        />
      }
    >
      <Card.Meta
        title={pokemon.name}
        style={{ paddingBottom: 10 }}
        description={`base experience: ${pokemon.base_experience ?? 0}`}
      />
      <Space wrap={true}>
        {pokemon.types.map((type, key) => (
          <Tag key={key} color={'volcano-inverse'}>
            {type.type.name}
          </Tag>
        ))}
      </Space>
    </Card>
  );
};
