import { Card, Col, Row, Layout, Typography } from 'antd';
import { Pokemon } from '@/types/pokemons';

const { Content } = Layout;
const { Text } = Typography;

export const Pokemons = ({ data }: { data: Pokemon[] }) => {
  return (
    <Content style={{ padding: 16 }}>
      <Row gutter={[16, 16]}>
        {data.map(pokemon => {
          return (
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Text strong={true}>{pokemon.name}</Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Content>
  );
};
