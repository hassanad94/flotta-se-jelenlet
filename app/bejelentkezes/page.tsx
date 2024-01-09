"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = async () => {
  const { data: session } = useSession();
  const apiPort = process.env.API_PORT || 3001;

  let apiPath = "/api/auth/signin";

  let url = new URL(`http://localhost:${apiPort}/api/auth/signin`);

  let params = new URLSearchParams({
    calbackUrl: `http://localhost:${apiPort}/bejelentkezes`,
  });

  url.search = params.toString();

  apiPath = url.toString();

  if (!session) return redirect(apiPath);

  //create a url with query params
  url = new URL(`http://localhost:${apiPort}/`);
  params = new URLSearchParams({
    message: "Sikeresen Bejelentkeztél Edzésre. ⚽⚽⚽",
    type: "success",
  });
  url.search = params.toString();

  apiPath = url.toString();

  const post = await axios.post(`http://localhost:${apiPort}/api/jelenlet`, {
    email: session?.user?.email,
  });

  if (session) return redirect(apiPath);
};

export default Page;
