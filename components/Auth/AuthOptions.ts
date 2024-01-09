import axios from "axios";
import { AuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions: AuthOptions = {

  secret: process.env.NEXTAUTH_SECRET || "AflottaLeszazelso",
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "673328878328850",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "7b55b25cefad0b238e8b16d1ea3e1d08",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }

      return token;
    },
    async signIn({ user }) {
      const apiURL = process.env.NEXT_API_URL || "http://localhost:3000/api/";

      const response = await axios.post(`${apiURL}/user`, {
        ...user,
      });

      return response.data;
    },
  },
};
