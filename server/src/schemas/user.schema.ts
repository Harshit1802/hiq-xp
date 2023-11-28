import { boolean, string } from 'joi';
import Constant from '../constants/constant';
import IUser from '../interfaces/user.interface';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: Constant.USERNAME_MIN_LENGTH,
      max: Constant.USERNAME_MAX_LENGTH,
    },
    firstName: {
      type: String,
      required: true,
      min: Constant.NAME_MIN_LENGTH,
      max: Constant.NAME_MAX_LENGTH,
    },
    middleName: {
      type: String,
      min: Constant.NAME_MIN_LENGTH,
      max: Constant.NAME_MAX_LENGTH,
    },
    lastName: {
      type: String,
      required: true,
      min: Constant.NAME_MIN_LENGTH,
      max: Constant.NAME_MAX_LENGTH,
    },
    dob: {
      type: Date,
      require: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: Constant.EMAIL_MAX_LENGTH,
    },
    // emailConfirmed: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   default: false,
    //   max: Constant.EMAIL_MAX_LENGTH,
    // },
    password: {
      type: String,
      required: false,
      min: Constant.PASSWORD_MIN_LENGTH,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      min: Constant.PHONE_MIN_LENGTH,
      max: Constant.PHONE_MAX_LENGTH,
    },
    // phoneNumberConfirmed: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   min: Constant.PHONE_MIN_LENGTH,
    //   max: Constant.PHONE_MAX_LENGTH,
    // },
    lockOutTimeStamp: { 
      type: Date, 
      default: null 
    },
    IsLockout: { 
      type: Boolean, 
      default: true 
    },
    accessFailedCount: { 
      type: Number, 
      default: 0 
    },
    // address: {
    //   type: String,
    //   required: true,
    //   min: Constant.ADDRESS_MIN_LENGTH,
    //   max: Constant.ADDRESS_MAX_LENGTH,
    // },
    lastPasswordResetDate: { 
      type: Date, 
      default: null 
    },
    agencyId: { 
      type: String, 
      required: true 
    },
    isHippaAcknowledged: { 
      type: Boolean,
      default: true,
    },
    roles: {
      type: String,
      required: true
    },
    ssnNumber: {
      type: String,
      required: true
    },
    faxNumber: {
      type: String,
      required: false
    },
    designation: {
      type: String,
      required: false
    },
    image: {
      type: String,         
      required: false,             
    },
    thumbnail: {
      type: String,         
      required: false,              
    },
    pinNumber: {
      type: Number,
      required: false
    },
    agencyBranchId: {
      type: [Number],
      required: false
    },
    signature: {
      type: String,         
      required: false,            
    },
    sequenceNo: {
      type: String,
      required: false
    },
    homePhoneNumber: {
      type: String,
      required: false,
      min: Constant.PHONE_MIN_LENGTH,
      max: Constant.PHONE_MAX_LENGTH,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
    isSuperUser: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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

const User = mongoose.model<IUser>(
    Constant.USER_MODEL,
    UserSchema,
  )

export default User;
