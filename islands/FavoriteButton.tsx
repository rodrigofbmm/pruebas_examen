import { useEffect, useState } from "preact/hooks";

type Props = {
  characterId: string;
  characterName: string;
};

export default function FavoriteButton({ characterId, characterName }: Props) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const cookie = document.cookie.match(/favorites=([^;]*)/);
    if (cookie) {
      const favs = JSON.parse(decodeURIComponent(cookie[1]));
      setIsFav(favs.some((f: { id: string }) => f.id === characterId));
    }
  }, [characterId]);

  const toggleFavorite = () => {
    const cookie = document.cookie.match(/favorites=([^;]*)/);
    let favs = cookie ? JSON.parse(decodeURIComponent(cookie[1])) : [];

    if (isFav) {
      favs = favs.filter((f: { id: string }) => f.id !== characterId);
    } else {
      favs.push({ id: characterId, name: characterName });
    }

    document.cookie = `favorites=${encodeURIComponent(JSON.stringify(favs))}; Path=/`;
    setIsFav(!isFav);
  };

  return (
    <button onClick={toggleFavorite}>
      {isFav ? "★ Quitar de favoritos" : "☆ Añadir a favoritos"}
    </button>
  );
}
