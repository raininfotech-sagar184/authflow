import CredentialsProvider from "next-auth/providers/credentials";
import { recaptcha, setLoginHistory } from './backend';
import { sql_query } from './dbconnect';
import { dec, encryption_key, passDec } from './common';
export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {},
        password: {},
        otp: {},
        twoFaOpen: {},
        repchaToken: {}
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password || !(!credentials?.otp || credentials?.twoOpen !== 0) || !credentials?.repchaToken) {

          return null;
        }
        let checkRepcha = await recaptcha(credentials?.repchaToken);
        if (!checkRepcha) {

          return null
        }
        let user = await sql_query("select password,twoFaOpen,username, email,userId,twoFaCode from tbluser where email = ?", [credentials?.email])

        if (user && credentials.password === passDec(user.password, encryption_key("passwordKey"))) {
          let speakeasy = require("speakeasy")
          console.log({ credentials, user })
          let twofa = ""
          try {
            twofa = speakeasy.totp.verify({
              secret: dec(user.twoFaCode, encryption_key("twofaKey")),
              encoding: "base32",
              token: credentials.twoFaCode,
            })
          }catch(e){  }
       
          console.log("---------ok", credentials?.twoFaOpen == 0 || twofa)
          if (credentials?.twoFaOpen == 0 || twofa) {
            // await setLoginHistory(0, 0)

            return {
              id: user.adminId,
              email: user.email,
              name: user.username,
              twoOpen: user.twoOpen,
            }
          } else {
            return null
          }
        }
        else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        twoOpen: token.twoFaOpen,
        user: {
          ...session.user
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token, id: user.id, twoFaOpen: user.twoFaOpen, name: user.name,
        };
      }
      return token;
    },
  }
};