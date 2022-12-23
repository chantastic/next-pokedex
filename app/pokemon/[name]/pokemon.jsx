export async function fetchPokemon({ id = "", params = {} }) {
  let searchParams = new URLSearchParams(params).toString();
  let endpoint = new URL(
    `https://pokeapi.co/api/v2/pokemon/${id}?${searchParams}`
  ).toString();

  let res = await fetch(endpoint);
  return await res.json();
}

export function getPokemonUrl(
  pokemonName = "bulbasaur",
  params = {}
) {
  let path = `/pokemon/${pokemonName}`;
  let listSearchParams = "";
  if (params.limit) {
    listSearchParams = new URLSearchParams([
      ["limit", params.limit],
    ]).toString();
  }

  return `${path}?${listSearchParams}`;
}
