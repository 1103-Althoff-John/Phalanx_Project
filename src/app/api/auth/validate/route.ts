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
    console.log("validate route hit");
    try{
        console.log("step1: starting json parse");
        let body: Login = {};
        try{
            body = await request.json();
            console.log("Step 2: JSON parsed:", body);
        }
        catch(e){
            console.log("JSON parse failed", e);
            return(
                NextResponse.json(
                    {error: "Invalid JSON"},
                    {status: 400}
                )
            );
        }
        console.log("step 3: starting validation");
        const emailSan = sanitize(body.email);
        const password = body.password || "";
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
        console.log("Step 4: connectiong to data base");
        await connectToDatabase();
        console.log("step 5: DB connected");
        console.log("step 6: finding user");
        const user_exist = await User.findOne({email: emailSan}).exec();
        console.log("query completed: result- ", user_exist);
        if(!user_exist){
            return(
                NextResponse.json(
                    {error: "Invalid Credentials"},
                    {status: 400}
                )
            );
        }
        //will grab stored password and compare 
        console.log("step 8: comparing passwords");
        const isCorrect = await bcrypt.compare(password, user_exist.password);
        console.log("step 9: compare result: ", isCorrect);
        if(!isCorrect){
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
    catch(err){
        console.error("Auth error",err);
        return(
            NextResponse.json(
                {error: "Failed to Authenticate"},
                {status: 400}
            )
        );
    }
}