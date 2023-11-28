import Constant from '../constants/constant';

import mongoose from 'mongoose';
import IDiscount from '../interfaces/discount.interface';

const discountSchema = new mongoose.Schema(
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

    discountName: {
      type: String,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    validityPeriod: {
      type: Date,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    value: {
      type: Number,
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

const Discount = mongoose.model<IDiscount>(
  Constant.DISCOUNT_MODEL,
  discountSchema,
)

export default Discount;