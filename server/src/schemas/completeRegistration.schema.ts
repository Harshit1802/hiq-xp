import Constant from '../constants/constant';
import mongoose from 'mongoose';
import ICompleteRegistration from '../interfaces/completeRegistration.interface';

const completeRegistrationSchema = new mongoose.Schema(
    {
        createdBy: {
            type: String,
            required: true,
          },

          updatedBy: {
            type: String,
            required: true,
          },

          legalName: {
            type: String,
            required: true,
          },

          doingBusinessAs: {
            type: String, 
            required: true,
          },

          taxId: { 
            type: String,
            required: true,
          },

          officePhone: { 
            type: String, 
            unique: true,
            required: true 
          },

          fax: { 
            type: String, 
            required: true 
          },

          mailingAddressLine1: { 
            type: String, 
            required: true 
          },

          mailingAddressCity: { 
            type: String, 
            required: true 
          },

          mailingAddressStateCode: { 
            type: String, 
            required: true 
          },

          mailingAddressStateName: { 
            type: String, 
            required: true 
          },

          mailingAddressCountry: { 
            type: String, 
            required: true 
          },

          mailingAddressZipCode: { 
            type: Number, 
            required: true 
          },

          contactFirstName: { 
            type: String, 
            required: true 
          },

          contactLastName: { 
            type: String, 
            required: true 
          },

          contactEmail: { 
            type: String, 
            unique: true,
            required: true 
          },

          contactMobileNumber: { 
            type: Number, 
            required: true 
          },

          contactOfficePhone: { 
            type: Number, 
            unique: true,
            required: true 
          },

          accreditation: { 
            type: String, 
            required: true 
          },

          agencyAdminEmail: { 
            type: String, 
            unique: true,
            required: true 
          },

          agencyAdminFirstName: { 
            type: String, 
            required: true 
          },

          agencyAdminLastName: { 
            type: String, 
            required: true 
          },

          agencyAdminMobile: { 
            type: Number, 
            required: true 
          },

          agencyOperationalStatus: { 
            type: Number, 
            required: true 
          },

          agencySubmissionStatus: {
            type: Number,
            required: true,
          },

          billingAddressCity: {
            type: String,
            required: true,
          },

          billingAddressLine1: {
            type: String,
            required: true,
          },

          billingAddressLine2: {
            type: String,
            required: true,
          },

          billingAddressStateName: {
            type: String,
            required: true,
          },

          billingAddressZipCode: {
            type: Number,
            required: true,
          },

          companyType: {
            type: String,
            required: true,
          },

          email: {
            type: String,
            unique: true,
            required: true,
            max: Constant.EMAIL_MAX_LENGTH,
          },

          medicareProviderNo: {
            type: String,
            required: true,
          },

          npi: {
            type: String,
            required: true,
          },

          stateHhaLicenseNo: {
            type: String,
            unique: true,
            required: true,
          },

          submitterId: {
            type: String,
            required: true,
          },

          subscriptionPlanId: {
            type: String,
            required: true,
          },

          agencyShortCode: {
            type: String,
            required: true,
          },

          billingAddressAreaCode: {
            type: Number,
            required: true,
          },

          hiqAdminComment: {
            type: String,
            required: true,
          },

          comments: {
            type: String,
            required: true,
          },

          baaEnvelopeId: {
            type: String,
            required: true,
          },

          baaEnvelopeSentDate: {
            type: Date,
            required: true,
          },

          baaEnvelopeStatus: {
            type: String,
            required: true,
          },

          discountId: {
            type: String,
            required: true,
          },

          websiteInfo: {
            type: String,
            unique: true,
            required: true,
          },

          demoRequestId: {
            type: String,
            required: true,
          },

          contactPerson1Branch: {
            type: String,
            // required: true,
          },

          contactPerson1Email: {
            type: String,
            // required: true,
          },

          contactPerson1Name: {
            type: String,
            // required: true,
          },

          contactPerson1Phone: {
            type: String,
            // required: true,
          },

          contactPerson1Title: {
            type: String,
            // required: true,
          },

          contactPerson2Branch: {
            type: String,
            // required: true,
          },

          contactPerson2Email: {
            type: String,
            // required: true,
          },

          contactPerson2Name: {
            type: String,
            // required: true,
          },

          contactPerson2Phone: {
            type: String,
            // required: true,
          },

          contactPerson2Title: {
            type: String,
            // required: true,
          },

          contactPerson3Branch: {
            type: String,
            // required: true,
          },

          contactPerson3Email: {
            type: String,
            // required: true,
          },

          contactPerson3Name: {
            type: String,
            // required: true,
          },

          contactPerson3Phone: {
            type: String,
            // required: true,
          },

          contactPerson3Title: {
            type: String,
            // required: true,
          },

          isDeleted: {
            type: Boolean,
            default: true
          },

          isAproved: {
            type: Boolean,
            default: true
          },

          isForProfit: {
            type: Boolean,
            default: true
          },

          isActive: {
            type: Boolean,
            default: true
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

const CompleteRegistration = mongoose.model<ICompleteRegistration>(
    Constant.COMPLETE_REGISTRATION_MODEL,
    completeRegistrationSchema,
  )

export default CompleteRegistration;