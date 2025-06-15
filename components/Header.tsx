// components/Header.tsx
import { FunctionComponent } from "preact";

const Header: FunctionComponent = () => {
  return (
    <header className="header">
      <h1>Mi App Harry Potter</h1>
      <nav>
        <ul>
          <li><a href="/characters">Personajes Comp</a></li>
          <li><a href="/characters2">Personajes Islas</a></li>
          <li><a href="/staff">Staff Comp</a></li>
          <li><a href="/staff2">Staff Islas</a></li>
          <li><a href="/search">buscador</a></li>
          <li><a href="/favorites">favoritos</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
