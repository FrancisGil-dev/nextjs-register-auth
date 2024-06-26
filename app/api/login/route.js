import connectDb from "@/utils/db";
import User from "@/models/Schema";

import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";


export const POST = async(req) => {
    // covert incoming data to json;
    const {email, password} = await req.json();
   
    // connect to database
    await connectDb();

    // find the user in mongoDb
    const findUser = await User.findOne({email});

    // if the api find the email in database
    if (findUser) {
        // compare the hash pass to current data
        const passIsMatch = await bcrypt.compare(password, findUser.password); // Added await here

        // data
        const credentials = {
            username: findUser.username,
            email: findUser.email,
        }
        console.log(credentials.username);
        // if the current password and the hashed password in database is correct
        if (passIsMatch) {
            // send the username to the client
            // response it to client
            return new NextResponse( credentials.username, {status: 200});
        }
        
        else{
            return new NextResponse("Invalid Email and Password...", {status: 401});
        }
    }
    else{
        return new NextResponse("User not Found", {status: 404});
    }
}
