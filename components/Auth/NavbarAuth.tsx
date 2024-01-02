"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { SignIn, NavbarUser } from "@/components/Auth/";
export const NavbarAuth = () => {
  const { data: session } = useSession();

  if (!session) return <SignIn />;

  return <NavbarUser />;
};

export default NavbarAuth;
