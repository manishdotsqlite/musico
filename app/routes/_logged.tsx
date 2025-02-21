import { Outlet, useLoaderData } from "@remix-run/react";
import { NavigationDock } from "../components/home-components/navigation";
import { LogOutButton } from "../components/home-components/user-icon";
import { logout, requireUserSession } from "../lib/session.server";

export async function action({ request }: { request: Request }) {
  return await logout(request);
}

export async function loader({ request }: { request: Request }) {
  return requireUserSession(request);
}

export default function LoggedLayout() {
  const loaderData = useLoaderData<{ username: string }>();
  console.log("LOADER DATA: ", loaderData);

  return (
    <main className="min-h-screen h-full w-full">
      <Outlet />
      <div className="fixed bottom-0 left-0 w-full bg-transparent">
        <NavigationDock />
      </div>
      <div className="fixed top-0 right-0 bg-transparent m-8">
        <LogOutButton />
      </div>
    </main>
  );
}
