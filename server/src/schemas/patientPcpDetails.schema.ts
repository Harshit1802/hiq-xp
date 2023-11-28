import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientPcpDetails from '../interfaces/patientPcpDetails.interface';

const PatientPcpDetailsSchema = new mongoose.Schema(
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

    primaryCareProviderId: {
      type: String,
      required: true,
      unique: true,
    },

    pcpName: {
      type: String,
      required: true,
    },

    pcpNpi: {
      type: String,
      required: true,
    },

    associatedPhysicians: {
      type: String,
      required: true,
    },

    physicianLocationId: {
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

const PcpDetails = mongoose.model<IPatientPcpDetails>(
  Constant.PATIENTPCPDETAILS_MODEL,
  PatientPcpDetailsSchema,
)

export default PcpDetails;
