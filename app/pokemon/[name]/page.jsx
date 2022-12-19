import Image from "next/image";

async function fetchPokemonByName(name) {
  let res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  return await res.json();
}

export default async function Home({ params }) {
  let pokemon = await fetchPokemonByName(params.name);

  return (
    <main>
      <h1>{pokemon.name}</h1>
      <Image
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name} front`}
        width="96"
        height="96"
      />
    </main>
  );
}
