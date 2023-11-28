import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientContactDetails from '../interfaces/patientRepContactDetails.interface';

const PatientContactDetailsSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: String,
      required: true,
    },

    patientDemographicId: {
      type: String,
      required: true,
      unique: true,
    },

    legalDocumentUrl: {
      type: String,
      required: true,
    },

    legalRepName: {
      type: String,
      required: true,
    },

    legalRepPrimaryContact: {
      type: String,
      required: true,
    },

    legalRepPrimaryContactTypeId: {
      type: Number,
      required: true,
    },

    legalRepRelationShipName: {
      type: String,
      required: true,
    },

    legalRepSecondaryContact: {
      type: String,
      required: true,
    },

    legalRepSecondaryContactTypeId: {
      type: Number,
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

const RepContactDetails = mongoose.model<IPatientContactDetails>(
  Constant.PATIENTREPCONTACTDETAILS_MODEL,
  PatientContactDetailsSchema,
)

export default RepContactDetails;
