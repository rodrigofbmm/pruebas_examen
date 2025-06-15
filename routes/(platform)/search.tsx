// routes/characters/isla.tsx
import { PageProps } from "$fresh/server.ts";
import Search from "../../islands/Search.tsx";

export default function CharactersPage(_props: PageProps) {
  return (
    <div className="container">
      <h1>Personajes de Harry Potter en la isla</h1>
      <Search />
    </div>
  );
}
