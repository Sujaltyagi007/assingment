"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { EyeClosed, Eye } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [toggleEye, setToggleEye] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        router.push("/login");
      }
    } catch (error) {
      if (error?.error) {
        toast.error(error.error);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-dvh overflow-hidden">
      <motion.div
        animate={triggered ? { transform: "translateX(-50vw)" } : undefined}
        initial={{ transform: "translateX(15vw)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="min-w-[35%]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Register with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => router.push("/login")} // ✅ using router here too
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => {
                if (username.length < 3) {
                  toast.warning("Username must be at least 3 characters");
                  return;
                } else if (!email.includes("@") || !email.includes(".")) {
                  toast.warning("Invalid email");
                  return;
                } else {
                  setTriggered(true);
                }
              }}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        animate={triggered ? { transform: "translateX(-20vw)" } : undefined}
        initial={{ transform: "translateX(100vw)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="min-w-[35%]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Enter your password</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Input
              placeholder="**********"
              type={toggleEye ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-10 top-2 cursor-pointer"
              onClick={() => setToggleEye(!toggleEye)}
            >
              {toggleEye ? <EyeClosed /> : <Eye />}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              className={"cursor-pointer"}
              onClick={() => setTriggered(false)}
            >
              Back
            </Button>
            <Button className={"cursor-pointer"} onClick={handleSubmit}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
