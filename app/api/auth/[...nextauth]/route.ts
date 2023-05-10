import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";


const options : NextAuthOptions = {
  providers : [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET!,
}

const handler = (req : any, res : any) => NextAuth(req,res,options);

export { handler as GET, handler as POST };
// export default handler;