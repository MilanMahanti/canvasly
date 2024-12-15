"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSignup } from "../hooks/useSignup";
import { TriangleAlert } from "lucide-react";
import ButtonLoader from "@/components/buttonLoader";

const SignupCard = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useSignup();
  const onCredentialSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          signIn("credentials", { email, password, redirectTo: "/" });
        },
      }
    );
  };
  const onProviderSignup = (provider: "github" | "google") => {
    signIn(provider, { redirectTo: "/" });
  };
  return (
    <Card className="w-full h-full p-8 ">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {mutation.isError && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>Something went wrong</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialSignup} className="space-y-2.5">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            type="text"
            disabled={mutation.isPending}
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            type="email"
            disabled={mutation.isPending}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            type="password"
            minLength={4}
            maxLength={20}
            disabled={mutation.isPending}
          />

          <Button
            type="submit"
            className="w-full bg-[#445ce9] hover:bg-[#445ce9]/80"
            size="lg"
            disabled={mutation.isPending}
          >
            <ButtonLoader label="Continue" isLoading={mutation.isPending} />
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => onProviderSignup("github")}
            disabled={mutation.isPending}
          >
            <FaGithub className="size-5" />
            Continue with Github
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => onProviderSignup("google")}
            disabled={mutation.isPending}
          >
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?
          <Link href="/sign-in">
            <span className="text-sky-700 hover:underline"> Signin</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignupCard;
