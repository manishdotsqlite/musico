import {
  Home,
  Search,
  Settings,
  DiscAlbum,
  Palette,
  ListMusic,
} from "lucide-react";
import { Dock } from "../ui/dock";
import { useLocation, useNavigate } from "@remix-run/react";

function NavigationDock() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const items = [
    {
      icon: Home,
      label: "Home",
      onClick: () => navigate("/home"),
      className: currentPath === "/home" ? "bg-gray-300" : "",
    },
    {
      icon: Search,
      label: "Search",
      onClick: () => navigate("/search"),
      className: currentPath === "/search" ? "bg-gray-300" : "",
    },
    {
      icon: DiscAlbum,
      label: "Albums",
      onClick: () => navigate("/albums"),
      className: currentPath === "/albums" ? "bg-gray-300" : "",
    },
    {
      icon: ListMusic,
      label: "Playlists",
      onClick: () => navigate("/playlists"),
      className: currentPath === "/playlists" ? "bg-gray-300" : "",
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => navigate("/settings"),
      className: currentPath === "/settings" ? "bg-gray-300" : "",
    },
  ];

  return <Dock items={items} className="z-100" />;
}

export { NavigationDock };
