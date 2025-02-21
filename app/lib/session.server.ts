import { createCookieSessionStorage, redirect } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "musico_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  return sessionStorage.getSession(cookieHeader);
}

export async function createUserSession(username: string) {
  const session = await sessionStorage.getSession();
  session.set("username", username);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
