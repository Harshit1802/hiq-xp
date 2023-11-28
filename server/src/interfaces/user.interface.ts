import { Document } from 'mongoose'

export default interface IUser extends Document {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  gender: string;
  email: string;
  emailConfirmed: string;
  password: string;
  phone: string;
  phoneNumberConfirmed: string;
  lockOutTimeStamp: Date;
  IsLockout: boolean;
  accessFailedCount: number;
  address: string;
  lastPasswordResetDate: Date;
  agencyId: string;
  isHippaAcknowledged: boolean;
  roles: string;
  ssnNumber: string;
  faxNumber: string;
  designation: string;
  image: string;
  thumbnail: string;
  pinNumber: number;
  agencyBranchId: number[];
  signature: string;
  sequenceNo: string;
  homePhoneNumber: string;
  isAdmin: boolean;
  isEnabled: boolean;
  isDeleted: boolean;
  isSuperUser: boolean;
  isActive: boolean;

}

