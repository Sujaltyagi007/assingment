"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const [toggleEye, setToggleEye] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Invalid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.ok) {
      toast.success("Login successful");
      redirect("/");
    }
    if (res.error) {
      toast.error(res.error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-1">
                <Button variant="outline" className="w-full">
                  <Image src={"/assets/google.svg"} alt="Google" width={20} height={20} />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Image src={"/assets/github.svg"} alt="Github" width={20} height={20} />
                  Github
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={toggleEye ? "text" : "password"}
                      required
                    />
                    <div className="absolute top-1/2 right-3  -translate-y-1/2 cursor-pointer " onClick={() => setToggleEye(!toggleEye)}>{toggleEye ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}</div>
                  </div>
                </div>
                <Button type="submit" onClick={handleSubmit} className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
