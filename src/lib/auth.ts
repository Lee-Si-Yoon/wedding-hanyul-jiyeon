import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { getAdminByUsername } from '@/db/queries';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await getAdminByUsername(credentials.username);
        if (!user) return null;

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        return { id: String(user.id), name: user.username };
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
};
