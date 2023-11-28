import Constant from '../constants/constant';
import IDemoRequest from '../interfaces/demoRequest.interface';
import mongoose from 'mongoose';

const DemoRequestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    jobTitle: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    
    streetAddress: {
      type: 'string'
    },

    addressLine2: {
      type: 'string',
    },

    city: {
      type: 'string',
      required: true
    },

    state: {
      type: 'string',
      required: true
    },

    postalCode: {
      type: 'string',
      required: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      min: Constant.PHONE_MIN_LENGTH,
      max: Constant.PHONE_MAX_LENGTH,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    website: {
      type: String,
      required: true,
      unique: true
    },

    timeZone: {
      type: String,
      timeZone: String,
      startTime: Date,
      endTime: Date,
      createdAt: Date,
      updatedAt: Date,
    },

    timestamp: {
      type: Date,
      default: Date.now
    },

    demoSchedule:[{
      type: []
    }],

    demoRequestNdaDocument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      default: null
    }
    
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const DemoRequest = mongoose.model<IDemoRequest>(
  Constant.DEMOREQUEST_MODEL,
  DemoRequestSchema,
)

export default DemoRequest;
