import User from "@/models/Schema";
import connectDb from "@/utils/db";
import bcrypt from 'bcryptjs';

import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { email, password } = await req.json();

  

    // connect to db
    await connectDb();
    const userExisted = User.findOne( { email } )
    if (userExisted) {
        return new NextResponse("Email already existed...", {status:400})
    }
     // hash the pass
     const hashPass = await bcrypt.hash(password, 10);
     const newUser = new User({
         email,
          password: hashPass,
     })

    
   

   
    try {
        await newUser.save();
        return new NextResponse("user is registered", {status: 200})
    } catch (err) {
        throw new NextResponse(err, {status: 500})
    }
}
