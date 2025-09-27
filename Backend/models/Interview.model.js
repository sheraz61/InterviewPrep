import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    technology: String,
    difficulty: String,
    currentQuestionIndex: { type: Number, default: 0 },
    questions: [{
        question: String,
        answer: String,
    }],
    status: { type: String, default: 'active' }, // active, completed
    overallScore: Number,
    feedback:String,
}, { timestamps: true });
export default mongoose.model("Interview", interviewSchema);