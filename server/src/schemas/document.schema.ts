import Constant from '../constants/constant';

import mongoose from 'mongoose';
import IHiqDocument from '../interfaces/document.interface';

const hiqDocumentSchema = new mongoose.Schema(
    {
        moduleName: {
            type: String,
            required: true,
          },

          name: {
            type: String,
            required: true,
          },

          type: {
            type: String,
            required: true,
          },

          fileData: {
            type: String, 
            
          },

          size: {
            type: String,
            required: true,
          },

          base64String: {
            type: String,
            required: true,
          },

          lastModifiedDate: {
            type: Date,
            
          },

          timestamp: {
            type: Date,
            default: Date.now
          },
    })
    const HiqDocument = mongoose.model<IHiqDocument>(
        Constant.DOCUMENT_MODEL,
        hiqDocumentSchema,
      )
    
export default HiqDocument;