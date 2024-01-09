import NextAuth from "next-auth";
import { authOptions } from "@/components/Auth/AuthOptions";

process.env.NEXTAUTH_SECRET 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
