import { NextResponse } from "next/server";

export const middleware = (req) => {
    // verrify the cookie
    const verify = req.cookies.get("loggedIn");
    // request the url
    const url = req.url;

    if (!verify && url.includes("/dashboard")) {
        const local = 'http://localhost:3000';
        const productionURL = 'https://nextjs-register-auth.vercel.app/';
        const domain = "https://nextjs-register-auth-h7la4uu1f-francisgildevs-projects.vercel.app/"

        if ( url.includes("/nextjs-register-auth.vercel.app")) {
            return NextResponse.redirect(productionURL);
        } 
        else if(url.includes("nextjs-register-auth-h7la4uu1f-francisgildevs-projects.vercel.app")){
            return NextResponse.redirect(domain)
        }
        else{
            return NextResponse.redirect(local)
        }
        
    }
}