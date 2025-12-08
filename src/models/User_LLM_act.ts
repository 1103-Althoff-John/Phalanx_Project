import mongoose, {Schema, models} from "mongoose";
import User_llm from "./User_LLM";

//simple set up for accounts strored LLMs for next semester 

const User_LLM_Acts_Schema = new Schema(
    {
        userID: {type: String, required: true},
        NumLLm: {type: String, required: true, defualt: "0"},
        LLM_array: [User_llm],
        paid_acct: {type: Boolean, required: true, defualt: false},
    }
);

const User_llm_act = models.User_llm_act || mongoose.model("User_llm_act", User_LLM_Acts_Schema);
export default User_llm_act;