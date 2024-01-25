import { authOptions } from "@/components/Auth/AuthOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const apiPort = process.env.API_PORT || 3001;

  const signInPath = "/api/auth/signin/";

  let url = new URL(`http://localhost:${apiPort}/api/auth/signin`);

  let params = new URLSearchParams({
    calbackUrl: `http://localhost:${apiPort}/bejelentkezes`,
  });

  url.search = params.toString();


  if (!session) return redirect(`${signInPath}${url.search}`);
  //create a url with query params
  url = new URL(`http://localhost:${apiPort}/`);
  params = new URLSearchParams({
    message: "sikeresen Bejelentkeztél Edzésre. ⚽⚽⚽",
    type: "success",
  });
  url.search = params.toString();


  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  try {
    const response = await fetch(`${apiURL}/jelenlet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: +session.user.id }),
    });

    const data = await response.json();
    console.log({ data });
  } catch (error) {
    console.error(error);

    return redirect("/");
  }

  if (session) return redirect(`/${url.search}`);
};

export default Page;
