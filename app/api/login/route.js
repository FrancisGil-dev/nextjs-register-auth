import connectDb from "@/utils/db";
import User from "@/models/Schema";
import jwt from "jsonwebtoken";
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

        // if the current password and the hashed password in database is correct
        if (passIsMatch) {
            // create a token
            const token = jwt.sign({email: findUser.email},process.env.JWT_SECRET || 'r32bsVKnvjFV');
            
             
            // response it to client
            return new NextResponse(token, {status: 200});
        }
        else{
            return new NextResponse("Invalid Email and Password...", {status: 401});
        }
    }
    else{
        return new NextResponse("User not Found", {status: 404});
    }
}
