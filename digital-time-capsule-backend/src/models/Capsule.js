import mongoose from "mongoose";
const CapsuleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String },
    mediaUrl: { type: String },
    unlockDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    notified: { type: Boolean, default: false }, // Prevent multiple emails
  });
  
  export default mongoose.model("Capsule", CapsuleSchema);
  