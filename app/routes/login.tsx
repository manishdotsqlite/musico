import { json, useActionData, useNavigate } from "@remix-run/react";
import { GoBack } from "../components/auth-components/go-back";
import LoginCard from "../components/auth-components/login-card";
import { useEffect } from "react";
import { toast } from "sonner";
import prisma from "../lib/prismaClient";

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

    return json(
      {
        success: "User logged in successfully.",
      },
      { status: 455 }
    );
  } catch (error) {
    return json(
      {
        error: "Error during login.",
      },
      { status: 500 }
    );
  }
}

const Login = () => {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && "error" in actionData) toast.error(actionData?.error);
    if (actionData && "success" in actionData) {
      toast.success(actionData?.success);
      navigate("/home");
    }
  }, [actionData, navigate]);
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
