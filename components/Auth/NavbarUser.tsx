"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Image from "next/image";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavbarUser = () => {
  const { data: session } = useSession();

  const img = "/avatar.png";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center bold gap-5 ">
            <h2> {session?.user?.name}</h2>
            <Image priority alt="Avatar" src={img} width={50} height={50} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Kijelentkezés</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NavbarUser;
