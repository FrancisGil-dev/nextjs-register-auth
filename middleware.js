import { NextResponse } from "next/server";

export const middleware = (req) => {
    // verrify the cookie
    const verify = req.cookies.get("loggedIn");
    // request the url
    const url = req.url;

    if (!verify && url.includes("/dashboard")) {
        return NextResponse.redirect('https://nextjs-register-auth.vercel.app/')
    }
}