// islands/StaffListIsla.tsx
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

type Staff = {
  id: string;
  name: string;
  image: string;
  house: string;
  species: string;
};

const StaffListIsla: FunctionComponent = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  
  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then(res => res.json())
      .then(data => {
        setStaff(data.filter((char: any) => char.hogwartsStaff));
      });
  }, []);

  return (
    <div className="container">
      <h2>Lista del Staff</h2>
      {staff.map(({ id, name, image, house, species }) => (
        <div key={id}>
          <a href={`/characters/${id}`}>
            {image ? <img src={image} alt={name} width={100} /> : <div>Sin imagen</div>}
            <h3>{name}</h3>
          </a>
          <p>
            Casa: {house ? <a href={`/houses/${house.toLowerCase()}`}>{house}</a> : "Desconocida"}
          </p>
          <p>Especie: {species}</p>
        </div>
      ))}
      <a href="/">← Volver</a>
    </div>
  );
};

export default StaffListIsla;
