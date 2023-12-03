import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt, { genSalt } from "bcryptjs";

export type authActions = "signIn" | "signUp";
export interface authCredentials {
  email: string;
  password: string;
  action: authActions;
  redirect: boolean;
}

export const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENTID!,
      clientSecret: process.env.CLIENTSECRET!,
    }),

    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "email", type: "email", placeholder: "name" },
        password: { label: "Password", type: "password" },
      },

      async authorize<authCredentials>(credentials: any) {
        const hashedPassword: string = await bcrypt.hash(
          credentials?.password!,
          await genSalt()
        );

        const calculatedPassword =
          credentials.action === "signIn"
            ? credentials.password
            : hashedPassword;

        const response = await fetch(process.env.APIAUTH!, {
          method: "POST",
          body: JSON.stringify({
            ...credentials,
            password: calculatedPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          const user = {
            id: data.insertedId,
            email: credentials.email,
            password: hashedPassword,
          };

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    signIn(params) {
      if (params.profile) {
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
