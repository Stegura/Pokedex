interface Type {
  name: String;
  url: String
}

interface Stat {
  name: String;
  url: String
}

interface Types {
  slot: Number;
  type: Type;
}

interface Stats {
  base_stat: Number;
  effort: Number;
  stat: Stat;
}

interface Sprites {
  back_default: String;
  back_female: String;
  back_shiny: String;
  back_shiny_female: String;
  front_default: String;
  front_female: String;
  front_shiny: String;
  front_shiny_female: String;
}

export interface Pokemon {
  id: Number;
  types: Array<Types>;
  stats: Array<Stats>;
  weight: Number;
  moves: Array<any>;
  sprites: Sprites;
  name: string;
 }
