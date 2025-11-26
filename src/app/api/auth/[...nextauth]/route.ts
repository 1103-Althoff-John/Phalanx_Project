import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();

        const email = credentials.email.toLowerCase().trim();
        const user = await User.findOne({ email }).exec();
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // <-- now valid because authOptions is typed
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
   async session({ session, token }) {
    if (token?.id) {
        (session.user as any) = {
         id: token.id,
         email: session.user?.email ?? "",
        };
    }
    return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// App Router needs these:
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };