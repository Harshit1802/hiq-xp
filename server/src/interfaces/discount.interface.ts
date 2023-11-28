import { Document } from 'mongoose'

export default interface IDiscount extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    discountName: string;
    percentage: Number;
    validityPeriod: Date;
    description: string;
    value: Number;
}