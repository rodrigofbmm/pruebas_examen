import { useEffect, useState } from "preact/hooks";

type Favorite = {
  id: string;
  name: string;
};

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const cookie = document.cookie.match(/favorites=([^;]*)/);
    const favs = cookie ? JSON.parse(decodeURIComponent(cookie[1])) : [];
    setFavorites(favs);
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(fav => fav.id !== id);
    document.cookie = `favorites=${encodeURIComponent(JSON.stringify(updated))}; Path=/`;
    setFavorites(updated);
  };

  if (favorites.length === 0) {
    return <p>No hay favoritos.</p>;
  }

  return (
    <ul>
      {favorites.map(({ id, name }) => (
        <li key={id} className="flex items-center gap-2">
          <a href={`/characters/${id}`}>{name}</a>
          <button onClick={() => removeFavorite(id)} className="text-red-600">❌</button>
        </li>
      ))}
    </ul>
  );
}

