import { Col, Row, Layout } from 'antd';
import { Pokemon } from '@/types/pokemons';
import { PokemonCard } from '@/components/pokemonCard';

const { Content } = Layout;

export const Pokemons = ({ data }: { data: Pokemon[] }) => {
  return (
    <Content style={{ padding: 16 }}>
      <Row gutter={[16, 16]}>
        {data.map((pokemon, id) => {
          return (
            <Col xs={24} sm={12} md={8} lg={4} key={id}>
              <PokemonCard pokemon={pokemon} />
            </Col>
          );
        })}
      </Row>
    </Content>
  );
};
