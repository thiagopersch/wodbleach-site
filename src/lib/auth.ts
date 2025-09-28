import { createHash } from 'crypto';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';

// SHA1 hash function for compatibility with Tibia servers
function sha1Hash(password: string): string {
  return createHash('sha1').update(password).digest('hex');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        accountname: { label: 'Account Name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.accountname || !credentials?.password) {
          return null;
        }

        // Validate account name length (max 15 characters)
        if (credentials.accountname.length > 15) {
          throw new Error('Account name cannot exceed 15 characters');
        }

        try {
          const account = await prisma.account.findUnique({
            where: { name: credentials.accountname },
          });

          if (!account) {
            return null;
          }

          // Check password using SHA1 hash
          const hashedPassword = sha1Hash(credentials.password);
          if (account.password !== hashedPassword) {
            return null;
          }

          return {
            id: account.id.toString(),
            name: account.name,
            email: account.email,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/account/login',
    signOut: '/account/create',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
