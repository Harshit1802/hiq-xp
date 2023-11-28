import { Document } from 'mongoose'

export default interface IServiceAgreement extends Document {
    createdBy: string
    updatedBy: string
    isDeleted: boolean
    contractPeriodFrom: Date
    contractPeriodTo: Date
    contractPeriod: number
    contractEnvelopeId: string
    contractEnvelopeStatus: string
    contractEnvelopeSentDate: Date
    contractEnvelopeSignedDate: Date
    demoRequestId: string
    contractSubscriptionPlanId: string
    contractDiscountId: string
    fileName: string
    uri: string
}   
