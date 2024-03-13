import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import User from "@/models/Schema";



export const POST = async(req) => {
    // convert loginData to json
    const {email, password} = req.json();

    // connect to db
    await connectDb();

    // authenticate the user
    const userAuth = await User.findOne({email,password});

    if (userAuth) {
        return new NextResponse("Data Find Successfully", {status : 200});
    }
    else{
        return new NextResponse("Data in databse not found...", {status: 404})
    }

}




