import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUserLLm extends Document {
  userId: Types.ObjectId;
  apiKey?: string;
}

const UserLLmSchema = new Schema<IUserLLm>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  apiKey: { type: String },
});

const User_llm: Model<IUserLLm> =
  mongoose.models.User_llm || mongoose.model<IUserLLm>("User_llm", UserLLmSchema);

export default User_llm;