import { auth } from "@/auth";
import SignupCard from "@/features/auth/components/signupCard";
import { redirect } from "next/navigation";

import React from "react";

const SignupPage = async () => {
  const session = await auth();
  if (session) redirect("/");
  return <SignupCard />;
};

export default SignupPage;
