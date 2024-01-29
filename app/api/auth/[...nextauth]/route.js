import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    // Auth0 provider
    Auth0Provider({
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
      issuer: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const user = await axios.post(`${apiUrl}/api/auth/login`, credentials);

        if (user) {
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
});

export { handler as GET, handler as POST };
