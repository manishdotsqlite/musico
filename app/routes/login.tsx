import { json, redirect, useActionData } from "@remix-run/react";
import { GoBack } from "../components/auth-components/go-back";
import LoginCard from "../components/auth-components/login-card";
import { useEffect } from "react";
import { toast } from "sonner";
import prisma from "../lib/prismaClient";
import { createUserSession, getSession } from "../lib/session.server";

type ActionData = { success: string } | { error: string };

export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const username = String(formData.get("username"));

    const existingUser = await prisma.user.findUnique({
      where: { username: username.toString() },
    });

    if (!existingUser)
      return json(
        { error: "No user registered with this username." },
        { status: 302 }
      );

    return await createUserSession(existingUser.username, "/home");
  } catch (error) {
    return json(
      {
        error: "Error during login.",
      },
      { status: 500 }
    );
  }
}

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("username");

  if (username) return redirect("/home");
  return null;
}

const Login = () => {
  const actionData = useActionData<ActionData>();

  useEffect(() => {
    if (actionData && "error" in actionData) toast.error(actionData?.error);
    if (actionData && "success" in actionData)
      toast.success(actionData?.success);
  }, [actionData]);
  return (
    <main className=" h-screen w-full">
      <GoBack />
      <div className="flex h-full items-center justify-center">
        <LoginCard />
      </div>
    </main>
  );
};

export default Login;
