import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt"
import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/User";
type Reg_Body = {
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
        let body: Reg_Body = {};
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
        const emailSan = sanitize(body.email).toLowerCase();
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

        await connectToDatabase();

        //check if already used email
        const exist = await User.findOne({email: emailSan}).lean();
        if(exist){
            return(
                NextResponse.json(
                    {error: "Email Already Exist"},
                    {status: 400}
                )
            );
        }
        //hash password and create user in db
        const saltRounds = 10;
        const hashed_Password = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            email: emailSan, 
            password: hashed_Password
        });
        return(
            NextResponse.json(
                {
                    message: "User Registered Successfuly",
                    userId: newUser._id.toString()
                },
                {status: 201}
            )
        );
    }
    catch(err){
        console.error("Registration error:", err);
        return(
            NextResponse.json(
                {error: "Failed to Register"},
                {status: 400}
            )
        );
    }
}