import { Document } from 'mongoose'

export default interface IDemoRequest extends Document {
  firstName: string
  lastName: string
  jobTitle: string
  companyName: string
  address: string
  streetAddress: string
  addressLine2: string
  city: string  
  state: string
  postalCode: string
  phone: string
  email: string
  website: string
  timeZone: string
  demoRequestNdaDocument: string;
  isNDAUploaded:boolean;
}

