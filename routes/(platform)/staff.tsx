// routes/staff/index.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import FilteredCharacterList from "../../islands/FilteredCharacterList.tsx";

export type Staff = {
  id: string;
  name: string;
  image: string;
  house: string;
  hogwartsStaff: boolean;
};

export const handler: Handlers = {
  async GET(_req, ctx) {
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    const characters: Staff[] = await res.json();
    const staff = characters.filter((c) => c.hogwartsStaff);
    return ctx.render({ staff });
  },
};

export default function StaffPage({ data }: PageProps<{ staff: Staff[] }>) {
  return (
    <div className="container">
      <h1>Personal de Hogwarts</h1>
      <FilteredCharacterList characters={data.staff} />
    </div>
  );
}
