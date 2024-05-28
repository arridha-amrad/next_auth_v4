import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { verify } from "argon2";
import { eq } from "drizzle-orm";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("All field is required");
        }
        const [dbUser] = await db
          .select()
          .from(UsersTable)
          .where(eq(UsersTable.email, credentials?.email));

        if (!dbUser) {
          throw new Error("User not found");
        }

        const isMatch = await verify(dbUser.password, credentials.password);

        if (!isMatch) {
          throw new Error("Password not match");
        }

        const user: User = {
          id: dbUser.id.toString(),
          email: dbUser.email,
          name: dbUser.name,
          image: dbUser.imgUrl,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ trigger, token, session }) {
      if (trigger === "update") {
        token = {
          ...token,
          name: session.name,
          email: session.email,
          picture: session.image,
        };
      }

      return token;
    },
    session({ session, token, trigger }) {
      session.user = {
        email: token.email,
        image: token.picture,
        name: token.name,
        id: token.sub as string,
      };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
