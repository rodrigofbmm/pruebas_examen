
/*
import { PageProps } from "$fresh/server.ts";
import CharacterListIsla from "../../islands/CharacterListIsla.tsx";

export default function CharactersPage(_props: PageProps) {
  return (
    <div className="container">
      <h1>Personajes de Harry Potter en la isla</h1>
      <CharacterListIsla />
    </div>
  );
}
*/

// routes/characters/index.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import SearchOnly from "../../islands/Search.tsx";

type Character = {
  id: string;
  name: string;
  image: string;
  house: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
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
      <SearchOnly characters={data.characters} />
    </div>
  );
}