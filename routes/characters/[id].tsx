import { Handlers, PageProps } from "$fresh/server.ts";
import FavoriteButton from "../../islands/FavoriteButton.tsx";

export type Character = {
  id: string;
  name: string;
  image: string;
  house: string;
  species: string;
  alternate_names: string[];
  eyeColour: string;
  hairColour: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
};

export const handler: Handlers<Character> = {
  async GET(_req, ctx) {
    const characterId = ctx.params.id;
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    const characters = await res.json();
    const match = characters.find((char: any) => char.id === characterId);

    if (!match) return new Response("Personaje no encontrado", { status: 404 });

    return ctx.render(match);
  },
};

export default function CharacterDetailPage({ data }: PageProps<Character>) {
  const { name, image, id, house, species, alternate_names, eyeColour, hairColour, wand } = data;

  return (
    <div className="container">
      {image ? <img src={image} alt={name} width={100} /> : <div>Sin imagen</div>}

      <h1>{name}</h1>
      <p><strong>ID:</strong> {id}</p>
      <a href={`/houses/${house.toLowerCase()}`}>{house}</a>
      <p><strong>Especie:</strong> {species}</p>

      {alternate_names.length > 0 && (
        <p><strong>Nombres alternativos:</strong> {alternate_names.join(", ")}</p>
      )}

      <p><strong>Ojos:</strong> {eyeColour}</p>
      <p><strong>Cabello:</strong> {hairColour}</p>

      {(wand.wood || wand.core || wand.length > 0) && (
        <>
          <h3>Varita</h3>
          <p><strong>Madera:</strong> {wand.wood || "Desconocida"}</p>
          <p><strong>Núcleo:</strong> {wand.core || "Desconocido"}</p>
          <p><strong>Longitud:</strong> {wand.length || "Desconocida"}</p>
        </>
      )}

      <FavoriteButton characterId={id} characterName={name} />
      <a href="/characters">← Volver a la lista</a>
    </div>
  );
}
