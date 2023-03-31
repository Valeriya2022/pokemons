import { Modal, Button, Avatar } from 'antd';
import { Pokemon } from '@/types/pokemons';

type PokemonModalType = {
  pokemon: Pokemon;
  visible: boolean;
  setVisible: (arg1: boolean) => void;
};

export const PokemonModal = ({
  pokemon,
  visible,
  setVisible
}: PokemonModalType) => {
  return (
    <Modal
      title={pokemon.name}
      open={visible}
      onCancel={setVisible.bind(this, false)}
      footer={[
        <Button
          key="back"
          type="primary"
          onClick={setVisible.bind(this, false)}
        >
          Ok
        </Button>
      ]}
    >
      <Avatar
        alt=""
        src={pokemon.sprites.front_default ?? '/icon_monster.png'}
        size={{ xs: 150, sm: 200, md: 200, lg: 200, xl: 200, xxl: 200 }}
      />
      <p>Height: {pokemon.height}</p>
      <p>Species: {pokemon.species.name}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>
        Abilities:{' '}
        {pokemon.abilities.map(ability => ability.ability.name + ' ')}
      </p>
    </Modal>
  );
};
