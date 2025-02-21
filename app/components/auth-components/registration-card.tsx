import { Form, useNavigate } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ImagePlus } from "lucide-react";
import { Button } from "../ui/button";

export default function RegistrationCard() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigation = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
        </div>
        <CardTitle className="sm:text-center">Register</CardTitle>
        <CardDescription className="sm:text-center">
          Enter your credentials to register your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" className="space-y-6" encType="multipart/form-data">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <Label htmlFor="image-upload">Profile Picture</Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                name="profilePicture"
                className="sr-only"
                onChange={handleImageChange}
                required
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {imagePreview ? (
                  <div className="relative aspect-square w-32 mx-auto">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="rounded-lg object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <p className="text-white text-sm">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload image
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </Form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border my-2">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigation("/login")}
        >
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
