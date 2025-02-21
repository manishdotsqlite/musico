import { json } from "@remix-run/react";
import { requireUserSession } from "../lib/session.server";

export const loader = async ({ request }: { request: Request }) => {
  const username = await requireUserSession(request);
  return json({ username });
};

const Home = () => {
  return <div className="w-full h-full"></div>;
};

export default Home;
