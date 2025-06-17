/*import { FreshContext, Handlers } from "$fresh/server.ts";
import LoginForm from "../components/LoginForm.tsx";


export const handler: Handlers = {
  GET: (req:Request, ctx:FreshContext) => {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    console.log("username: ", username);
    console.log("password: ", password);
    if(!username || !password) return ctx.render();

    // verificar en DDBB el usuario y la contraseña
    console.log("password: ", password);
    if(password !== "1234") return ctx.render();

    const headers = new Headers();
    headers.append("Set-Cookie", `name=${username};path=/`);
    headers.set("location", "/characters");
    return new Response(null, {
      status: 302,
      headers,
    });
  }
}

export default function Home() {
  return (
    <LoginForm/>
  );
}
  

// routes/index.tsx
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import LoginFormMongo from "../components/LoginFormMongo.tsx";

interface Data {
  error?: string;
}

type User = {
  username: string;
  password: string;
};

function getUsersFromCookie(cookie: string | null): User[] {
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie)) as User[];
  } catch {
    return [];
  }
}

export const handler: Handlers<Data> = {
  async POST(req: Request, ctx: FreshContext<unknown, Data>) {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    const form = await req.formData();
    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();

    if (!username || !password) {
      return ctx.render({ error: "Faltan datos" });
    }

    const cookieHeader = req.headers.get("cookie");
    const users = getUsersFromCookie(cookieHeader?.match(/users=([^;]+)/)?.[1] || null);

    if (type === "login") {
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) {
        return ctx.render({ error: "Credenciales incorrectas" });
      }

      const headers = new Headers();
      headers.append("Set-Cookie", `name=${username}; Path=/`);
      headers.set("location", "/characters");

      return new Response(null, { status: 302, headers });
    }

    if (type === "register") {
      const exists = users.some(u => u.username === username);
      if (exists) {
        return ctx.render({ error: "El usuario ya existe" });
      }

      const updatedUsers = [...users, { username, password }];
      const headers = new Headers();
      headers.append("Set-Cookie", `users=${encodeURIComponent(JSON.stringify(updatedUsers))}; Path=/`);
      headers.append("Set-Cookie", `name=${username}; Path=/`);
      headers.set("location", "/characters");

      return new Response(null, { status: 302, headers });
    }

    return ctx.render({ error: "Operación no válida" });
  },

  GET(_req, ctx) {
    return ctx.render({});
  },
};

export default function Home(props: PageProps<Data>) {
  return (
    <div className="container">
      <h1>Autenticación</h1>
      <LoginFormMongo error={props.data.error} />
    </div>
  );
}

*/

// routes/index.tsx
// routes/index.tsx
// routes/index.tsx
// routes/index.tsx
// routes/index.tsx
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { UsersCollection } from "../db/Contacts.ts";
import LoginFormMongo from "../components/LoginFormMongo.tsx";

interface Data {
  error?: string;
}

export const handler: Handlers<Data> = {
  async POST(req: Request, ctx: FreshContext<unknown, Data>) {
    try {
      const url = new URL(req.url);
      const type = url.searchParams.get("type");
      const form = await req.formData();
      const username = form.get("username")?.toString();
      const password = form.get("password")?.toString();

      if (!username || !password) {
        return ctx.render({ error: "Faltan datos" });
      }

      const user = await UsersCollection.findOne({ username });

      if (type === "login") {
        if (!user || user.password !== password) {
          return ctx.render({ error: "Credenciales incorrectas" });
        }
        const headers = new Headers();
        headers.append("Set-Cookie", `name=${username}; Path=/`);
        headers.set("location", "/characters");
        return new Response(null, { status: 302, headers });
      }

      if (type === "register") {
        if (user) {
          return ctx.render({ error: "El usuario ya existe" });
        }
        await UsersCollection.insertOne({ username, password });
        const headers = new Headers();
        headers.append("Set-Cookie", `name=${username}; Path=/`);
        headers.set("location", "/characters");
        return new Response(null, { status: 302, headers });
      }

      return ctx.render({ error: "Operación no válida" });
    } catch (error) {
      console.error("Database error:", error);
      return ctx.render({ error: "Error de conexión a la base de datos" });
    }
  },

  GET(req, ctx) {
    const url = new URL(req.url);
    if (url.searchParams.get("logout")) {
      const headers = new Headers();
      headers.append("Set-Cookie", "token=; Path=/; Max-Age=0");
      headers.append("Set-Cookie", "name=; Path=/; Max-Age=0");
      headers.set("location", "/");
      return new Response(null, { status: 302, headers });
    }

    return ctx.render({});
  },
};

export default function Home(props: PageProps<Data>) {
  return (
    <div className="container">
      <h1>Autenticación</h1>
      <LoginFormMongo error={props.data.error} />
    </div>
  );
}
