import { Handlers, PageProps } from "$fresh/server.ts";
import Pagination from "../../islands/Pagination.tsx";

type Character = {
  name: string;
  image: string;
  house: string;
};

export const handler: Handlers = {
  async GET(_req, ctx) {
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    const characters: Character[] = await res.json();
    return ctx.render({ characters });
  },
};

export default function CharactersPage({ data }: PageProps<{ characters: Character[] }>) {
  return (
    <div className="container">
      <h1>Personajes de Harry Potter</h1>
      <Pagination characters={data.characters} />
    </div>
  );
}
