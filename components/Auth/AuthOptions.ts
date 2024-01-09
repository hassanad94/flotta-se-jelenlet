import axios from "axios";
import { AuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "",
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
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
