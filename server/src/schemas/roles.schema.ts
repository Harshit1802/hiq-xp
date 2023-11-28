import Constant from '../constants/constant';
import mongoose, { Schema } from 'mongoose';
import IRoles from '../interfaces/roles.interface';
import Permissions from './permissions.schema';

const rolesSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            required: true,
        },

        timestamp: {
            type: Date,
            default: Date.now
        },

        permissions: [{ 
            type: [], 
        }],
    },

    {
        versionKey: false,
        timestamps: true,
    },
)

const Roles = mongoose.model<IRoles>(
    Constant.ROLES_MODEL,
    rolesSchema,
)

export default Roles;