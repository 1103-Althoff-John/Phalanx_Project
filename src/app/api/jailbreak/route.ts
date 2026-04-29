import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import User_llm from "@/models/User_LLM";
import User from "@/models/User";
import Report from "@/models/Report";
import { decryptAES } from "@/lib/crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest){
    try{
        const cur_session = await getServerSession(authOptions);
        if(!cur_session?.user?.email){
            return(
                NextResponse.json(
                    {error: "Unauthorized Session"},
                    {status: 401}
                )
            );
        }
        const userE = cur_session.user?.email;
        console.log("Attempting to grab data from database");
        await connectToDatabase();
        console.log("Database Connected");
        const userD = await User.findOne({email: userE});
        if(!userD){
            return(
                NextResponse.json(
                    {error: "Unable to find Account"},
                    {status: 401}
                )
            );
        }
        console.log("User Found");
        const userAPI = await User_llm.findOne({userId: userD._id})
        if(!userAPI || (userAPI.apiKey) == ""){
            return(
                NextResponse.json(
                    {error: "Unable to find a registered API key"},
                    {status: 401}
                )
            );
        }
        const apiUn = decryptAES(userAPI.apiKey);
        console.log("Decrypting the API key");
        const jsonAPI = {
            LLM_API: apiUn
        };

        const flaskConnect = process.env.PYTHON_JAILBREAK_TEST_URL;

        const api_py_key = process.env.INTERNAL_API_KEY;



        console.log("Attempting to connect to the Testing Service");
        const flaskResponse = await fetch(`${flaskConnect}/Runjailbreak`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": api_py_key,
            },
            body: JSON.stringify(jsonAPI),
                cache: "no-store",
            }
        )
        console.log("Flask response status:", flaskResponse.status);

        const report = await flaskResponse.json();

        console.log("Flask report response:", report);
        
        const updatedReport = await Report.findOneAndUpdate(
            { userId: userD._id },
            {
              $set: {
                atkSRate: (report.report?.overall_attack_success_rate ?? "").toString(),
                Latency: (report.report?.total_runtime_seconds ?? "").toString(),
                False_pos: (report.report?.false_positive_rate ?? "").toString(),
                GPU: (report.report?.average_gpu_memory ?? "").toString(),
              },
            },
            {
              new: true,
              upsert: true,
              runValidators: true,
            }
          );
        if(!updatedReport){
            return(
                NextResponse.json(
                    {error: "Unable to update Report"},
                    {status: 401}
                )
            );
        }
        console.log("Report page updated and saved in DB");

        return NextResponse.json(report, { status: flaskResponse.status });
    }
    catch(err){
        console.error("Failed to Make Rport");
        return(
            NextResponse.json(
                {error: "Failed to make Report"},
                {status: 403}
            )
        );
    }
}