import FavoritesList from "../../islands/FavoritesList.tsx";

export default function FavoritesPage() {
  return (
    <div className="container">
      <h1>Favoritos</h1>
      <FavoritesList />
      <a href="/characters">← Volver</a>
    </div>
  );
}
