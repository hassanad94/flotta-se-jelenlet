import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "",
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  callbacks:{
    async jwt({token, user}) {     
      if (user?.id) {
          token.id = user.id
      }
      return token
   },

  }

});


export { handler as GET, handler as POST };
