import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import User_llm from "@/models/User_LLM";
import User from "@/models/User";
import { encryptAES} from "@/lib/crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


type User_llm_body = {
    apiKey?: string;
};

// this sanitation is different from the login and register becasue it invlolves API keys in the schema and cant just sanatize it also
// needs to not allow any invalid inputs and have the user fix them not the server and will prevent the database being accessed 
// when there is a potential threat
export async function POST(request: NextRequest){
    try{
        let body: User_llm_body = {};
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
        const cur_session = await getServerSession(authOptions);
        if(!cur_session?.user?.email){
            return(
                NextResponse.json(
                    {error: "Unauthorized Session"},
                    {status: 401}
                )
            );
        }
        const user_email = cur_session.user?.email;
        const unencryptedAPIKey = body.apiKey;
        if(!body.apiKey){
            return(
                NextResponse.json(
                    {error: "Missing API Key"},
                    {status: 400}
                )
            );
        }
        //after all checks pass then the API will connect to the database
        console.log("Attempting to connect to database.......");
        await connectToDatabase();
        console.log("Connected to Database");
        console.log("Attempting to Find account.........");
        const userD = await User.findOne({email: user_email});
        if(!userD){
            return(
                NextResponse.json(
                    {error: "Unable to find Account"},
                    {status: 401}
                )
            )
        }
        console.log("Account Found. ...... Uploading Encryped API key");
        const encryptedAPI = encryptAES(unencryptedAPIKey);
        const api_set = await User_llm.findOneAndUpdate(
            {userId: userD._id},
            {$set: { apiKey: encryptedAPI} },
            { new: true, upsert: true}
        );
        console.log("Uploaded Data: ", api_set);
    
        // needs to find grab the email from the session and then it needs to find user from databas eand then  use that id to fins the llm 

        return(
            NextResponse.json(
                {
                    message: "New LLM has been registered Successfully",
                    Account: {UID: api_set.userId.toString(), KEY: api_set.apiKey},
                    status: 200
                }       
            )
        );
    }
    catch(err){
        console.error("Failed to Register LLM");
        return(
            NextResponse.json(
                {error: "Failed to Register LLM"},
                {status: 400}
            )
        );
    }
}