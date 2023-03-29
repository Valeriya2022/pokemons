type Type = {
  slot: number;
  type: {
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
};

export type PokemonResponse = {
  count: number;
  results: Pokemon[];
};
