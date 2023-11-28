import Constant from '../constants/constant';
import mongoose from 'mongoose';
import ISubscription from '../interfaces/subsciptionPlan.interface';

const subscriptionPlanSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: true,
    },

    planName: {
      type: String,
      required: true,
    },

    activePatientRangeFrom: {
      type: Date,
      required: true,
    },

    activePatientRangeTo: {
      type: Date,
      required: true
    },

    branchRangeFrom: {
      type: Date,
      required: true
    },

    branchRangeTo: {
      type: Date,
      required: true
    },

    monthlyCost: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    effectiveDate: {
      type: Date,
      required: true,
    },

    expirationDate: {
      type: Date,
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

const Subscription = mongoose.model<ISubscription>(
  Constant.SUBSCRIPTIONPLAN_MODEL,
  subscriptionPlanSchema,
)

export default Subscription;