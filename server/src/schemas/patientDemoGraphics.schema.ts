import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IDemoGraphics from '../interfaces/patientDemoGraphics.interface';
import { boolean, date, number } from 'joi';

const PatientDemoGraphicsSchema = new mongoose.Schema(
  {
    mrnSequenceNo: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: String,
      required: true,
    },

    mrn: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
      min: Constant.USERNAME_MIN_LENGTH,
      max: Constant.USERNAME_MAX_LENGTH,
    },

    middleInitial: {
      type: String,
    },

    lastName: {
      type: String,
      required: true,
      min: Constant.NAME_MIN_LENGTH,
      max: Constant.NAME_MAX_LENGTH,
    },

    displayName: {
      type: String,
      required: true,
    },

    sSN: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    age: {
      type: String,
      required: true,
    },

    addressId: {
      type: String,
      required: true
    },

    primaryContactType: {
      type: String,
      required: true
    },

    primaryContactNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    secondaryContactType: {
      type: String,
      required: true,
    },

    secondaryContactNumber: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    status: {
      type: String,
      required: true,
    },

    patientImageUrl: {
      type: String,
      required: true,
    },

    dateofDeath: {
      type: Date,
      required: true,
    },

    placeOfDeath: {
      type: String,
      required: true,
    },

    reasonOfDeath: {
      type: String,
      required: true,
    },

    genderOther: {
      type: String,
      required: true,
    },

    ptAddressTypeId: {
      type: String,
      required: true,
    },

    addressTypeOther: {
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

const DemoGraphics = mongoose.model<IDemoGraphics>(
  Constant.PATIENTDEMOGRAPHICS_MODEL,
  PatientDemoGraphicsSchema,
)

export default DemoGraphics;
