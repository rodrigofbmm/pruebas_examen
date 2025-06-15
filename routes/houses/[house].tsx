// routes/houses/[house].tsx
import { Handlers, PageProps } from "$fresh/server.ts";

export type Character = {
  id: string;
  name: string;
  image: string;
  house: string;
  species: string;
};

export const handler: Handlers<Character[]> = {
  async GET(_req, ctx) {
    const house = ctx.params.house.toLowerCase();
    const res = await fetch(`https://hp-api.onrender.com/api/characters/house/${house}`);
    const characters = await res.json();
    return ctx.render(characters);
  },
};

export default function HousePage({ data }: PageProps<Character[]>) {
  const houseName = data[0]?.house || "Casa";

  return (
    <div className="container">
      <h1>Personajes de {houseName}</h1>
      {data.map(({ id, name, image, house, species }) => (
        <div key={id}>
          <a href={`/characters/${id}`}>
            {image ? <img src={image} alt={name} width={100} /> : <div>Sin imagen</div>}
            <h3>{name}</h3>
          </a>
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Casa:</strong> {house}</p>
          <p><strong>Especie:</strong> {species}</p>
        </div>
      ))}
      <a href="/characters">← Volver</a>
    </div>
  );
}
