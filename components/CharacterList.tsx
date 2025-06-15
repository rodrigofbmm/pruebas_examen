export type Character = {
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

type Props = {
  characters: Character[];
};

export default function CharacterList({ characters }: Props) {
  return (
    <div className="container">
      <h2>Personajes</h2>
      {characters.map(({ id, name, image, house, wand }) => (
        <div key={id}>
          <a href={`/characters/${id}`}>
            {image ? <img src={image} alt={name} width={100} /> : <div>Sin imagen</div>}
            <h3>{name}</h3>
          </a>
          <p>
            Casa: {house ? <a href={`/houses/${house.toLowerCase()}`}>{house}</a> : "Desconocida"}
          </p>

          {(wand?.wood || wand?.core || wand?.length > 0) && (
            <>
              <h4>Varita</h4>
              <p><strong>Madera:</strong> {wand.wood || "Desconocida"}</p>
              <p><strong>Núcleo:</strong> {wand.core || "Desconocido"}</p>
              <p><strong>Longitud:</strong> {wand.length || "Desconocida"}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
