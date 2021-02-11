export default class pokemonService {
  static async getPokemon() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
      if (!response.ok) {
        throw Error(response);
      }
      return response.json();
    } catch(error) {
      return error;
    }
  }
  static async pokemonStats(pokemon) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      if (!response.ok) {
        throw Error(response);
      }
      return response.json();
    } catch(error) {
      return error;
    }
  }
}


