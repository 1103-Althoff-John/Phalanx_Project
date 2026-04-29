import mongoose, {Schema, models, Model} from "mongoose";

export interface IReport {
    userId: mongoose.Types.ObjectId;
    atkSRate?: string;
    Latency?: string;
    False_pos?: string;
    GPU?: string;
  }

const Report_Schema = new Schema<IReport>(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true},
        atkSRate: {type: String},
        Latency: {type: String},
        False_pos: {type: String},
        GPU: {type: String}
    }
);


const Report: Model<IReport> = (models.Report as Model<IReport>) || mongoose.model<IReport>("Report", Report_Schema);

export default Report;