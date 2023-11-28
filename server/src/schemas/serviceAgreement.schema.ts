import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IServiceAgreement from '../interfaces/serviceAgreement.interface';

const ServiceAgreementSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: String,
      required: true,
    },

    contractPeriodFrom: {
      type: Date,
      required: true,
    },

    contractPeriodTo: {
      type: Date,
      required: true,
    },

    contractPeriod: {
      type: Number,
      required: true,
    },

    contractEnvelopeId: {
      type: String, 
      required: true,
    },

    contractEnvelopeStatus: { 
      type: String,
      required: true,
    },

    contractEnvelopeSentDate: { 
      type: Date, 
      required: true 
    },

    contractEnvelopeSignedDate: { 
      type: Date, 
      required: true 
    },

    demoRequestId: { 
      type: String, 
      required: true 
    },

    contractSubscriptionPlanId: {
      type: String,
      required: true,
      unique: true,
    },

    contractDiscountId: {
      type: String,
      required: true,
      unique: true,
    },

    fileName: {
      type: String,         
      required: true,           
    },

    uri: {
      type: String,
      required: true
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

const ServiceAgreement = mongoose.model<IServiceAgreement>(
    Constant.SERVICE_AGREEMENT_MODEL,
    ServiceAgreementSchema,
  )

export default ServiceAgreement;
