import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectToDatabase } from "../../../../lib/mongo";
import bcrypt from "bcrypt"
import User from "../../../../models/User";
type Login = {
    email?: string;
    password?: string;
};
function sanitize(s:unknown): string{
        if (typeof s !== "string"){
            return("");
        }
        else{
            return (s.replace(/\0/g, "").replace(/<[^>]*>?/gm, "").trim());
        }
}
function valEmail(email: string): boolean{
    if(!email.includes('@')){
        return false;
    }
    else if((email.length < 11)){
        return false;
    }
    else{
        return true;
    }
}
export async function POST(request: NextRequest){
    try{
        let body: Login = {};
        try{
            body = await request.json();
        }
        catch(e){
            return(
                NextResponse.json(
                    {error: "Invalid JSON"},
                    {status: 400}
                )
            );
        }
        const emailSan = sanitize(body.email);
        const password = body.password;
        if(!(emailSan.length > 0)){
            return(
                NextResponse.json(
                    {error: "Missing Email Field"},
                    {status: 400}
                )
            );
        }
        if(!valEmail(emailSan)){
            return(
                NextResponse.json(
                    {error: "Invalid Credentals"},
                    {status: 400}
                )
            );
        }
        if(!(password.length > 0)){
            return(
                NextResponse.json(
                    {error: "Missing Password Field"},
                    {status: 400}
                )
            );
        }
        //after quick checks pass it will connect to db or use existing connection
        await connectToDatabase();
        const user_exist = await User.findOne({email: emailSan}).exec();
        if(!user_exist){
            return(
                NextResponse.json(
                    {error: "Invalid Credentials"},
                    {status: 400}
                )
            );
        }
        //will grab stored password and compare 
        const salt_rounds = 10;
        const hashed_entry = await bcrypt.hash(password, salt_rounds);
        const stored_hash = user_exist.password;
        if(!(hashed_entry === stored_hash)){
            return(
                NextResponse.json(
                    {error: "Invalid Credentials"},
                    {status: 400}
                )
            );
        }
        return(
            NextResponse.json(
                {message: "Validated",
                    user: {id: user_exist._id.toString(), email: user_exist.email}
                },
                {status: 200}
            )
        );
    }
    catch{
        console.error("Auth error");
        return(
            NextResponse.json(
                {error: "Failed to Authenticate"},
                {status: 400}
            )
        );
    }
}