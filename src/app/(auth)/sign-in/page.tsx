import { auth } from "@/auth";
import SigninCard from "@/features/auth/components/signinCard";
import { redirect } from "next/navigation";
import React from "react";

const SigninPage = async () => {
  const session = await auth();
  if (session) redirect("/");
  return <SigninCard />;
};

export default SigninPage;
