import { json, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { GoBack } from "~/components/auth-components/go-back";
import RegisterCard from "~/components/auth-components/registration-card";
import { toast } from "sonner";
import prisma from "~/lib/prismaClient";
import { UploadToCloudinary } from "~/lib/upload-to-cloudinary.server";

type ActionData = { success: string } | { error: string };

export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const username = String(formData.get("username"));
    const profilePicture = formData.get("profilePicture") as File;

    if (username.length < 5) {
      return json(
        { error: "Username must be more than 4 characters long." },
        { status: 201 }
      );
    }

    if (!profilePicture) {
      return json({ error: "You must upload a file." }, { status: 200 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: username.toString() },
    });

    if (existingUser)
      return json({ error: "Username is already taken." }, { status: 409 });

    const url = await UploadToCloudinary(profilePicture);

    const user = await prisma.user.create({
      data: {
        username,
        profilePicture: url || "https://avatar.iran.liara.run/public/girl",
      },
    });

    console.log("USER: ", user);

    return json(
      {
        success: "User registered successfully.",
      },
      { status: 455 }
    );
  } catch (error) {
    return json(
      {
        error: "Error during registration.",
      },
      { status: 500 }
    );
  }
}

const Register = () => {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && "error" in actionData) toast.error(actionData?.error);
    if (actionData && "success" in actionData) {
      toast.success(actionData?.success);
      navigate("/login");
    }
  }, [actionData, navigate]);

  return (
    <main className=" h-screen w-full">
      <GoBack />
      <div className="flex h-full items-center justify-center">
        <RegisterCard />
      </div>
    </main>
  );
};

export default Register;
