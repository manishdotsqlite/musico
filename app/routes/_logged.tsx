import { Outlet } from "@remix-run/react";
import { NavigationDock } from "../components/home-components/navigation";
import { LogOutButton } from "../components/home-components/user-icon";
import { logout } from "../lib/session.server";
import AudioPlayer from "~/components/player-components/music-player";
import { MusicQueueProvider } from "~/components/player-components/music-queue-provider";

export async function action({ request }: { request: Request }) {
  return await logout(request);
}

export default function LoggedLayout() {
  return (
    <MusicQueueProvider>
      <main className="min-h-screen h-full w-full grid grid-cols-[60px_1fr]">
        <div className="sticky top-0 h-screen w-[70px] sm:w-[80px] bg-transparent flex items-center justify-center ">
          <NavigationDock />
        </div>

        <div className="w-full">
          <Outlet />

          <div className="fixed top-0 right-0 bg-transparent m-8">
            <LogOutButton />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-transparent flex items-center justify-center">
          <AudioPlayer />
        </div>
      </main>
    </MusicQueueProvider>
  );
}
