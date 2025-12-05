import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import User_llm from "@/models/User_LLM";
import { encryptAES} from "@/lib/crypto";

type User_llm_body = {
    userId?: string;
    Username?: string;
    llmName?: string;
    apiKey?: string;
};

// this sanitation is different from the login and register becasue it invlolves API keys in the schema and cant just sanatize it also
// needs to not allow any invalid inputs and have the user fix them not the server and will prevent the database being accessed 
// when there is a potential threat
function sanitizeLLM(s:unknown): string{
    if(typeof s !== "string"){
        return(" ");
    }
    else if(s.includes('/') || s.includes('\\')) {
        return("BAD CHAR");
    }
    else if(s.includes('<') || s.includes('>')){
        return("BAD CHAR");
    }
    else if(s.includes('*') || s.includes('^') || s.includes('?')){
        return("BAD CHAR");
    }
    else if(s.includes('(') || s.includes(')')){
        return("BAD CHAR");
    }
    else{
        return(s);
    }
}

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
        const user_Id = body.userId;
        const user = sanitizeLLM(body.Username);
        const llmName = sanitizeLLM(body.llmName);
        const unencryptedAPIKey = body.apiKey;
        if(!body.userId){
            return(
                NextResponse.json(
                    {error: "Missing session ID"},
                    {status: 400}
                )
            );
        }
        if(!body.Username){
            return(
                NextResponse.json(
                    {error: "Missing Credentials"},
                    {status: 400}
                )
            );
        }
        else if(user === " "){
            return(
                NextResponse.json(
                    {error: "Invalid Credentials"},
                    {status: 400}
                )
            );
        }
        else if(user === "BAD CHAR"){
            return(
                NextResponse.json(
                    {error: "Bad characters detected"},
                    {status: 400}
                )
            );
        }
        if(!body.llmName){
            return(
                NextResponse.json(
                    {error: "Missing Credantials"},
                    {status: 400}
                )
            );
        }
        else if(llmName === " "){
            return(
                NextResponse.json(
                    {error: "Missing LLM Name"},
                    {status: 400}
                )
            );
        }
        else if(llmName === "BAD CHAR"){
            return(
                NextResponse.json(
                    {error: "Special Characters Not Allowed"},
                    {status: 400}
                )
            );
        }
        if(!body.apiKey){
            return(
                NextResponse.json(
                    {error: "Missing API Key"},
                    {status: 400}
                )
            );
        }
        //after all checks pass then the API will connect to the database
        await connectToDatabase();
        const encryptedAPI = encryptAES(unencryptedAPIKey, body.userId);
        const User_llm_created = await User_llm.create({
            userId: user_Id,
            UserName: user,
            llmName: llmName,
            apiKey: encryptedAPI
        });
        return(
            NextResponse.json(
                {
                    message: "New LLM has been regsitered Successfuly",
                    id: User_llm_created._id
                },       
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