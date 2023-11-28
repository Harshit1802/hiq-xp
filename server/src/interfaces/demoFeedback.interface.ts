import { Document } from 'mongoose'

export default interface IFeedback extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    feedback: string;
    demoScheduleId: string;
}