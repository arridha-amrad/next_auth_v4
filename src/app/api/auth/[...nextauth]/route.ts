import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { verify } from "argon2";
import { eq } from "drizzle-orm";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
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

        if (dbUser.password) {
          const isMatch = await verify(dbUser.password, credentials.password);
          if (!isMatch) {
            throw new Error("Password not match");
          }
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
    async signIn({ account, user }) {
      if (account && account?.type === "credentials") {
        return true;
      }
      if (user && user.email && account?.type !== "credentials") {
        await db
          .insert(UsersTable)
          .values({
            name: user.name!,
            provider: account?.type!,
            email: user.email!,
            imgUrl: user.image!,
          })
          .onConflictDoNothing();
        console.log({ user });
        return true;
      } else {
        return false;
      }
    },
    async jwt({ trigger, token, session, user }) {
      if (trigger === "update") {
        console.log("trigger session : ", user);

        token = {
          ...token,
          name: session.name,
          email: session.email,
          picture: session.image,
        };
        return token;
      }

      if (user) {
        const [dbUser] = await db
          .select()
          .from(UsersTable)
          .where(eq(UsersTable.email, user.email!));
        token = {
          ...token,
          sub: dbUser.id.toString(),
          name: user.name,
          email: user.email,
          picture: user.image,
        };
      }
      console.log({ token });

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
