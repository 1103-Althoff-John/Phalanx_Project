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
    console.log("Step 1: Create Account Request Recived:");
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
        console.log("Step 2: JSON parsed correctly -", body);
        const emailSan = sanitize(body.email).toLowerCase();
        console.log("Step 3: Email Has been Sanitized");
        const password = body.password;
        if(!(emailSan.length > 0)){
            return(
                NextResponse.json(
                    {error: "Missing Email Field"},
                    {status: 400}
                )
            );
        }
        console.log("step 4: Verified Email Exist");
        if(!valEmail(emailSan)){
            return(
                NextResponse.json(
                    {error: "Invalid Credentals"},
                    {status: 400}
                )
            );
        }
        console.log("Step 5: Email has Been Validated as Real Email Structure");
        if(!(password.length > 0)){
            return(
                NextResponse.json(
                    {error: "Missing Password Field"},
                    {status: 400}
                )
            );
        }
        console.log("Step 6: Password has Been Varified to Exist");

        console.log("Step 7: Validation Fields Passed.... Attempting to Connect to Database....");
        await connectToDatabase();
        console.log("Step 8: Database Connection Succesful");
        //check if already used email
        console.log("Step 9: Checking if Account Already Exist...");
        const exist = await User.findOne({email: emailSan}).lean();
        if(exist){
            return(
                NextResponse.json(
                    {error: "Email Already Exist"},
                    {status: 400}
                )
            );
        }
        console.log("Step 10: No Other Occorance Of Account. Creating Account");
        //hash password and create user in db
        const saltRounds = 10;
        const hashed_Password = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            email: emailSan, 
            password: hashed_Password
        });
        console.log("Step 11: Account password Hashed and Stored. Valuse Returned-- ", emailSan, hashed_Password);
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