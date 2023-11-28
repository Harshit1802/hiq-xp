import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientOtherDetails from '../interfaces/patientOtherDetails.interface';

const PatientOtherDetailsSchema = new mongoose.Schema(
    {
        createdBy: {
            type: String,
            required: true,
        },

        updatedBy: {
            type: String,
            required: true,
        },

        languageId: {
            type: String,
            required: true,
            unique: true,
        },

        communicationNeedId: {
            type: String,
            required: true,
        },

        precautionId: {
            type: String,
            required: true,
            unique: true,
        },

        precautionAssignedReason: {
            type: String,
            required: true,
        },

        triageCodeId: {
            type: String,
            required: true,
            unique: true,
        },

        hospitalRiskProfileId: {
            type: String,
            required: true,
            unique: true,
        },

        specialInstructions: {
            type: String,
            required: true,
        },

        acuityLevelId: {
            type: Number,
            required: true,
        },

        patientDemographicId: {
            type: Number,
            required: true,
        },

        communicationNeedOthers: {
            type: String,
            required: true,
        },

        otherLanguage: {
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

const OtherDetails = mongoose.model<IPatientOtherDetails>(
    Constant.PATIENTOTHERDETAILS_MODEL,
    PatientOtherDetailsSchema,
)

export default OtherDetails;
