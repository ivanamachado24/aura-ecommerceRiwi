import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoose } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        await connectMongoose();
        const user = await User.findOne({ email: credentials?.email }).lean();
        if (!user || Array.isArray(user)) return null;
        const valid = await bcrypt.compare(credentials!.password, user.password as string);
        if (!valid) return null;
        return {
          id: (user._id as any).toString(),
          email: user.email as string,
          name: (user.name as string) || '',
          role: (user.role as string) || 'customer'
        };
      }
    })
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
