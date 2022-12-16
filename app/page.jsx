export default async function Home() {
  let res = await fetch("https://pokeapi.co/api/v2/pokemon");
  let data = await res.json();

  return (
    <main>
      <ul>
        {data.results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </main>
  );
}
