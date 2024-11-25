import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("loading");

const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the login form (e.g., 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Static user definition
        const staticUser = {
          id: "1",
          name: "Static User",
          email: "static.user@example.com",
        };

        // Check if provided credentials match
        if (
          credentials?.username === "admin" &&
          credentials?.password === "password"
        ) {
          return staticUser; // Return user object
        }
        return null; // Return null if invalid credentials
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session tokens
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Optional custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET, // Set a secret for encrypting JWT tokens
};

export default NextAuth(authOptions);
