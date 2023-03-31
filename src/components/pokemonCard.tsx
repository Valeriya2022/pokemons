import { Card, Tag, Space } from 'antd';
import { Pokemon } from '@/types/pokemons';
import { useState } from 'react';
import { PokemonModal } from '@/components/pokemonModal';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  return (
    <>
      <Card
        onClick={setDetailsVisible.bind(this, true)}
        cover={
          <img
            alt=""
            src={pokemon.sprites.front_default ?? '/icon_monster.png'}
          />
        }
        hoverable={true}
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
      <PokemonModal
        pokemon={pokemon}
        visible={detailsVisible}
        setVisible={setDetailsVisible}
      />
    </>
  );
};
