import Constant from '../constants/constant';
import mongoose from 'mongoose';
import { boolean, date, number } from 'joi';
import IPatientReferralDetails from '../interfaces/patientReferralDetails.interface';

const PatientReferralDetailsSchema = new mongoose.Schema(
  {
    patientDemographicId: {
      type: String,
      required: true,
    },

    referralSourceId: {
      type: String,
      required: true,
    },

    referralId: {
      type: String,
      required: true,
    },

    referralDate: {
      type: Date,
      required: true,
    },

    referralFormUploadPath: {
      type: String,
      required: true,
    },

    medicarePhysicianPhone: {
      type: Number,
      required: true,
    },

    medicarePhysicianFax: {
      type: String,
      required: true,
    },

    medicareFTFEncounterDate: {
      type: Date,
      required: true,
    },

    referralDiscussedWithName: {
      type: String,
      required: true,
    },

    referralDiscussedWithRelation: {
      type: String,
      required: true,
    },

    referralDiscussedDate: {
      type: Date,
      required: true,
    },

    referralDiscussedTime: {
      type: String,
      required: true,
    },

    referralDiscussionRefusedReason: {
      type: String,
      required: true
    },

    createdBy: {
      type: String,
      required: true
    },

    updatedBy: {
      type: String,
      required: true,
    },

    npi: {
      type: String,
      required: true,
    },

    referralDiscussionRemark: {
      type: String,
      required: true,
    },

    physcianReferralId: {
      type: String,
      required: true,
      unique: true
    },

    physicianLicenceVerificationFileName: {
      type: String,
      required: true,
    },

    physicianLicenceVerificationUri: {
      type: String,
      required: true,
    },

    physicianIdWhenReferralSrcOtherThanPhysician: {
      type: String,
      required: true,
    },

    physicianLocationId: {
      type: String,
      required: true,
      unique: true,
    },

    agencyUserId: {
      type: String,
      required: true,
    },

    dateofVerification: {
      type: Date,
      required: true,
    },

    verifiedBy: {
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

const ReferralDetails = mongoose.model<IPatientReferralDetails>(
  Constant.PATIENTREFERRALDETAILS_MODEL,
  PatientReferralDetailsSchema,
)

export default ReferralDetails;
