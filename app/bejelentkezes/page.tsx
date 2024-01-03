"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();

  let apiPath = "/api/auth/signin";

  let url = new URL(`${window?.location?.origin}/api/auth/signin` || "");

  let params = new URLSearchParams({
    calbackUrl: `${window?.location?.origin}/bejelentkezes`,
  });

  url.search = params.toString();

  apiPath = url.toString();

  if (!session) return redirect(apiPath);

  //create a url with query params
  url = new URL(window?.location?.origin || "");
  params = new URLSearchParams({
    message: "Sikeresen Bejelentkeztél Edzésre. ⚽⚽⚽",
    type: "success",
  });
  url.search = params.toString();

  apiPath = url.toString();

  if (session) return redirect(apiPath);
};

export default Page;
