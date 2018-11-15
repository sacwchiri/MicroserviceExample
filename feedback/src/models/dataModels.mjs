// here we could import all the database models from other services packed in an npm model that was previously stored.
// but it is more likely that each microservice will handle its own access and this is more of an agregate used in specific cases
// this has the advantage of allowing quick view of all models but the disadvange of complexity and can be easy to break
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, index: true },
    feedback: { type: Number, min: 1, max: 5 },
    sessionId: String,
    timestamp: { type: Date, default: Date.now, index: true }
});

export default mongoose.model('Feedback', FeedbackSchema);
