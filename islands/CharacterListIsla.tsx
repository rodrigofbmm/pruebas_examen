import { useEffect, useState } from "preact/hooks";

type Character = {
  id: string;
  name: string;
  image: string;
  house: string;
  species: string;
};

export default function CharacterListIsla() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then(res => res.json())
      .then(setCharacters);
  }, []);

  const paginated = characters.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  const isFirst = page === 0;
  const isLast = (page + 1) * itemsPerPage >= characters.length;

  return (
    <div className="container">
      <h2>Lista de Personajes</h2>

      <button onClick={() => setPage(page - 1)} disabled={isFirst}>Anterior</button>
      <button onClick={() => setPage(page + 1)} disabled={isLast}>Siguiente</button>

      <div>
        {paginated.map(({ id, name, image, house, species }) => (
          <div key={id}>
            <a href={`/characters/${id}`}>
              <img src={image} alt={name} width={100} />
              <h3>{name}</h3>
            </a>
            <p><a href={`/houses/${house.toLowerCase()}`}>{house}</a></p>
            <p>Especie: {species}</p>
          </div>
        ))}
      </div>

      <a href="/">← Volver</a>
    </div>
  );
}
