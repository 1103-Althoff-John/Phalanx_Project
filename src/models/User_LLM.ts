import mongoose, {Schema, models} from "mongoose";
//tempary schema for next semester 

const User_llm_Schema = new Schema(
    {
        UserName: {type: String, reqiured: true},
        userId: {type: String, required: true},
        llmName: {type: String, defualt: "LLM Name Here"},
        apiKey: {type: String, required: true},
        weaknesses: {type: String, defualt: ""},
    }
);

const User_llm = models.User_llm || mongoose.model("User_llm", User_llm_Schema);
export default User_llm;