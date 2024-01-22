import { AuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "AflottaLeszazelso",
  providers: [
    FacebookProvider({
      clientId: "673328878328850",
      clientSecret: "7b55b25cefad0b238e8b16d1ea3e1d08",
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const apiURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

      let userId;

      try {
        let response = await fetch(`${apiURL}/user/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(token),
          next: { revalidate: 100 },
        });

        response = await response.json();

        userId = response;
      } catch (error) {
        console.error(error);
      }

      return { ...token, userID: `${userId}` };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.userID,
          name: token.name,
          email: token.email,
          image: token.image as string,
        };
      }

      return session;
    },
  },
};
