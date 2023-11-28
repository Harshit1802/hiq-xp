import { Document } from 'mongoose'

export default interface ISubscription extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    planName: string;
    activePatientRangeFrom: Date;
    activePatientRangeTo: Date;
    branchRangeFrom: Date;
    branchRangeTo: Date;
    monthlyCost: Number;
    description: string;
    effectiveDate: Date;
    expirationDate: Date;
}