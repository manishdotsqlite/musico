import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Musico" }, { name: "musico", content: "Musico" }];
};

export default function Index() {
  return <div>HELLO</div>;
}
