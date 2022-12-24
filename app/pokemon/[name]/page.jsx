import Image from "next/image";
import Link from "next/link";
import { fetchPokemon, getPokemonUrl } from "./pokemon";
import styles from "./pokemon.module.css";

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
        <section className={styles.header}>
          <Image
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name} front`}
            width="96"
            height="96"
          />
          <div>
            <h1 className={styles.headerName}>
              {pokemon.name}
            </h1>

            <div className={styles.headerTypeContainer}>
              <h4>type:</h4>
              <ul style={{ padding: 0 }}>
                {pokemon.types.map(({ type }) => {
                  let typeSelector = `typeBadge--${type.name}`;

                  return (
                    <span
                      key={type.name}
                      className={`${styles.typeBadge} ${styles[typeSelector]}`}
                    >
                      {type.name}
                    </span>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
