export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  count: number;
  results: Pokemon[];
};
