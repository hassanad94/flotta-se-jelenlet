"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const SignIn = () => {
  return <Button onClick={() => signIn()}>Bejelentkezés</Button>;
};

export default SignIn;
