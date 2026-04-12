import mongoose, {Schema, models} from "mongoose";

const Report_Schema = new Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true},
        atkSRate: {type: String},
        Latency: {type: String},
        False_pos: {type: String},
        GPU: {type: String}
    }
);

const Report = models.Report || mongoose.model("Report", Report_Schema);
export default Report;