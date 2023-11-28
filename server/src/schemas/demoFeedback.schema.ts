import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IFeedback from '../interfaces/demoFeedback.interface';

const demoFeedbackSchema = new mongoose.Schema(
    {
        createdBy: {
            type: String,
            required: true,
        },

        updatedBy: {
            type: String,
            required: true,
        },

        isDeleted: {
            type: Boolean,
            default: true,
        },

        feedback: {
            type: String,
            required: true,
        },

        demoScheduleId: {
            type: String,
            required: true,
        },

        timestamp: {
            type: Date,
            default: Date.now
        },
    },

    {
        versionKey: false,
        timestamps: true,
    },
)

const Feedback = mongoose.model<IFeedback>(
    Constant.DEMOFEEDBACK_MODEL,
    demoFeedbackSchema,
)

export default Feedback;