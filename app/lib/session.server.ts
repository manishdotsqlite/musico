import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = "musico-secret";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "musico-session",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      secrets: [sessionSecret],
    },
  });

export async function createUserSession(username: string, redirectTo: string) {
  const session = await getSession();
  session.set("username", username);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function requireUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("username");

  if (!username) {
    return redirect("/login");
  }

  return username;
}

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  console.log(session.data);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
