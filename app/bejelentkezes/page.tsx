import {headers} from "next/headers"
import { authOptions } from "@/components/Auth/AuthOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const apiPort = process.env.API_PORT || 3001;

  const signInPath = "/api/auth/signin/";

  const domain = headers().get("host");

  let url = new URL(`${domain}${signInPath}`);

  let params = new URLSearchParams({
    calbackUrl: `${domain}/bejelentkezes`,
  });

  url.search = params.toString();

  console.log(`${signInPath}${url.search}`)


  if (!session) return redirect(`${signInPath}${url.search}`);
  
  //create a url with query params
  url = new URL(`http://localhost:${apiPort}/`);
  params = new URLSearchParams({
    message: "sikeresen Bejelentkeztél Edzésre. ⚽⚽⚽",
    type: "success",
  });
  url.search = params.toString();


  const apiURL = process.env.NEXT_PUBLIC_API_URL;


  try {
    const response = await fetch(`${apiURL}/jelenlet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: +session.user.id }),
    });

    const data = await response.json();
  
  } catch (error) {
    console.error(error);

    return redirect("/");
  }

  if (session) return redirect(`/${url.search}`);
};

export default Page;
