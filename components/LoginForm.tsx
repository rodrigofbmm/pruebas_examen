import { FunctionComponent } from "preact";

const LoginForm: FunctionComponent = () => (
  <form className="login-form" action="/" method="GET">
    <input type="text" name="username" placeholder="Introduce tu nombre" />
    <input type="password" name="password" placeholder="Password" />
    <button type="submit">Log-in</button>
  </form>
);

export default LoginForm;
