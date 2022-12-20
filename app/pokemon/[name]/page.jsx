import Image from "next/image";
import Link from "next/link";

async function fetchPokemon({ id = "", params = {} }) {
  let searchParams = new URLSearchParams(params).toString();
  let endpoint = new URL(
    `https://pokeapi.co/api/v2/pokemon/${id}?${searchParams}`
  ).toString();

  let res = await fetch(endpoint);
  return await res.json();
}

export default async function Home({ params, searchParams }) {
  let pokemon = await fetchPokemon({ id: params.name });
  let pokemonList = await fetchPokemon({
    params: searchParams,
  });

  return (
    <>
      <aside>
        <ul>
          {pokemonList.results.map((pokemon) => (
            <li key={pokemon.name}>
              <Link
                href={getPokemonUrl(pokemon.name, searchParams)}
              >
                {pokemon.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={getPokemonUrl(pokemon.name, {
            limit: Number(searchParams.limit || 20) + 20,
          })}
        >
          Load more
        </Link>
      </aside>

      <main>
        <div
          style={{
            position: "-webkit-sticky",
            position: "sticky",
            top: 0,
          }}
        >
          <h1>{pokemon.name}</h1>
          <Image
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name} front`}
            width="96"
            height="96"
          />
        </div>
      </main>
    </>
  );
}

function getPokemonUrl(pokemonName = "bulbasaur", params = {}) {
  let path = `/pokemon/${pokemonName}`;
  let listSearchParams = "";
  if (params.limit) {
    listSearchParams = new URLSearchParams([
      ["limit", params.limit],
    ]).toString();
  }

  return `${path}?${listSearchParams}`;
}
