import mongoose, {Schema, models} from "mongoose";

// Temp Schema for the the jail breaks fro the bata base

const jailbreak_Schema = new Schema(
    {
        Prompt: {type: String, required: true, defualt: "Empty"},
        jailbreakTag: {type: String, required: true},
        jailbreakType: {type: String, required: true},
    }

);
const jailbreak = models.jailbreak || mongoose.model("jailbreak", jailbreak_Schema);
export default jailbreak;