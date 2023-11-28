import mongoose, { Document } from 'mongoose'

export default interface IRoles extends Document {
    roleName: string;
}