import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/lib/generated/prisma/client.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function fetchUserFromDB(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  console.log(isValid);
  if (!isValid) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await fetchUserFromDB(email, password);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
