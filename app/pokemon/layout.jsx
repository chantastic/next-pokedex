export default async function PokemonLayout({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "10rem 1fr",
        padding: "2rem",
      }}
    >
      {children}
    </div>
  );
}
