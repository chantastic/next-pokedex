import Link from "next/link";

export default async function PokemonLayout({ children }) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  let data = await res.json();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "10rem 1fr",
        padding: "2rem",
      }}
    >
      <aside>
        <ul>
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>
              <Link href={`/pokemon/${pokemon.name}`}>
                {pokemon.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {children}
    </div>
  );
}
