// routes/_app.tsx o donde uses Layout
import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function Layout({ Component, state }: PageProps<{ name?: string }>) {
  const loggedIn = Boolean(state?.name);

  return (
    <div className="layout">
      {loggedIn && <Header />}
      <div className="content">
        <Component />
      </div>
    </div>
  );
}
