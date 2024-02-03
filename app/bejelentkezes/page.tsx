import {headers} from "next/headers"
import { authOptions } from "@/components/Auth/AuthOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const apiPort = process.env.API_PORT || 3001;

  const signInPath = "/api/auth/signin/";

  const domain = headers().get("host");
  const protocol = headers().get("x-forwarded-proto");

  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${domain}`


  let url = new URL(`${siteURL}${signInPath}`);

  let params = new URLSearchParams({
    calbackUrl: `${domain}/bejelentkezes`,
  });

  url.search = params.toString();

  console.log(`${siteURL}${signInPath}${url.search}`)


  if (!session) return redirect(`${siteURL}${signInPath}${url.search}`);
  
  //create a url with query params
  url = new URL(`${siteURL}`);
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

    return redirect(`${siteURL}`);
  }

  if (session) return redirect(`${siteURL}/${url.search}`);
};

export default Page;
