type Type = {
  slot: number;
  type: {
    name: string;
  };
};

type Ability = {
  ability: {
    name: string;
  };
};

export type Pokemon = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: Type[];
  base_experience: number;
  species: {
    name: string;
  };
  height: number;
  weight: number;
  abilities: Ability[];
};

export type PokemonResponse = {
  count: number;
  results: Pokemon[];
};
