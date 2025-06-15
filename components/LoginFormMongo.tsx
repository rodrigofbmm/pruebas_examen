// components/AuthForms.tsx
import { FunctionComponent } from "preact";

const LoginFormMongo: FunctionComponent<{ error?: string }> = ({ error }) => (
  <div style={{ maxWidth: "400px", margin: "auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
    {error && <p style={{ color: "red" }}>{error}</p>}

    <form method="POST" action="/?type=login">
      <h2>Iniciar Sesión</h2>
      <input type="text" name="username" placeholder="Usuario" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>

    <form method="POST" action="/?type=register">
      <h2>Registrarse</h2>
      <input type="text" name="username" placeholder="Usuario" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit">Crear Cuenta</button>
    </form>
  </div>
);

export default LoginFormMongo;
