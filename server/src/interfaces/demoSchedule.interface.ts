import { Document } from 'mongoose'

export default interface IDemoSchedule extends Document {
    createdBy: string;
    // createdDate: Date;
    updatedBy: string;
    // updatedDate: Date;
    isDeleted: boolean;
    demoGivenByUserId: string;
    demoGivenByAlternativeId: string;
    demoScheduleDate: Date;
    demoScheduleTimeFrom: Date;
    demoScheduleTimeTo: Date;
    demoDuration: number;
    meeting: string;
    description: string;
    demoRequestId: string;

}