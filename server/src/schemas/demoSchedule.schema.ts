import Constant from '../constants/constant';

import mongoose from 'mongoose';
import IDemoSchedule from '../interfaces/demoSchedule.interface';

const demoScheduleSchema = new mongoose.Schema(
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

          demoGivenByUserId: {
            type: String, 
            required: true,
          },

          demoGivenByAlternativeId: { 
            type: String,
            required: true,
          },

          demoScheduleDate: { 
            type: Date, 
            required: true 
          },

          demoScheduleTimeFrom: { 
            type: Date, 
            required: true 
          },

          demoScheduleTimeTo: { 
            type: Date, 
            required: true 
          },

          demoDuration: {
            type: Number,
            // required: true,
          },

          meeting: {
            type: String,
            required: true,
          },

          description: {
            type: String,
            required: true,
          },

          demoRequestId: {
            type: String,
            // required: true,
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

const Schedule = mongoose.model<IDemoSchedule>(
    Constant.DEMOSCHEDULE_MODEL,
    demoScheduleSchema,
  )

export default Schedule;