import { Form, useNavigate } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginCard = () => {
  const navigation = useNavigate();
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
        <CardTitle className="sm:text-center">Login</CardTitle>
        <CardDescription className="sm:text-center">
          Enter your credentials to login to your account.
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

          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border my-2">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigation("/register")}
        >
          Register
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
