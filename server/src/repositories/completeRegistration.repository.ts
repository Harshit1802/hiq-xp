import ICompleteRegistration from "../interfaces/completeRegistration.interface";
import CompleteRegistration from "../schemas/completeRegistration.schema";

class CompleteRegistrationRepository {

    public async getCompleteRegistration(): Promise<ICompleteRegistration[]> {
       const getCompleteRegistration = await CompleteRegistration.find().sort({ "timestamp": -1})
       return getCompleteRegistration;
    }

    public async createCompleteRegistration(completeRegistration: any): Promise<any> {
        const createCompleteRegistration =  new CompleteRegistration({
            createdBy: completeRegistration.createdBy,
            updatedBy: completeRegistration.updatedBy,
            legalName: completeRegistration.legalName,
            doingBusinessAs: completeRegistration.doingBusinessAs,
            taxId: completeRegistration.taxId,
            officePhone: completeRegistration.officePhone,
            fax: completeRegistration.fax,
            mailingAddressLine1: completeRegistration.mailingAddressLine1,
            mailingAddressLine2: completeRegistration.mailingAddressLine2,
            mailingAddressCity: completeRegistration.mailingAddressCity,
            mailingAddressStateCode: completeRegistration.mailingAddressStateCode,
            mailingAddressStateName: completeRegistration.mailingAddressStateName,
            mailingAddressCountry: completeRegistration.mailingAddressCountry,
            mailingAddressZipCode: completeRegistration.mailingAddressZipCode,
            contactFirstName: completeRegistration.contactFirstName,
            contactLastName: completeRegistration.contactLastName,
            contactEmail: completeRegistration.contactEmail,
            contactMobileNumber: completeRegistration.contactMobileNumber,
            contactOfficePhone: completeRegistration.contactOfficePhone,
            accreditation: completeRegistration.accreditation,
            agencyAdminEmail: completeRegistration.agencyAdminEmail,
            agencyAdminFirstName: completeRegistration.agencyAdminFirstName,
            agencyAdminLastName: completeRegistration.agencyAdminLastName,
            agencyAdminMobile: completeRegistration.agencyAdminMobile,
            agencyOperationalStatus: completeRegistration.agencyOperationalStatus,
            agencySubmissionStatus: completeRegistration.agencySubmissionStatus,
            billingAddressCity: completeRegistration.billingAddressCity,
            billingAddressLine1: completeRegistration.billingAddressLine1,
            billingAddressLine2: completeRegistration.billingAddressLine2,
            billingAddressStateName: completeRegistration.billingAddressStateName,
            billingAddressZipCode: completeRegistration.billingAddressZipCode,
            companyType: completeRegistration.companyType,
            email: completeRegistration.email,
            medicareProviderNo: completeRegistration.medicareProviderNo,
            npi: completeRegistration.npi,
            stateHhaLicenseNo: completeRegistration.stateHhaLicenseNo,
            submitterId: completeRegistration.submitterId,
            subscriptionPlanId: completeRegistration.subscriptionPlanId,
            agencyShortCode: completeRegistration.agencyShortCode,
            billingAddressAreaCode: completeRegistration.billingAddressAreaCode,
            hiqAdminComment: completeRegistration.hiqAdminComment,
            comments: completeRegistration.comments,
            baaEnvelopeId: completeRegistration.baaEnvelopeId,
            baaEnvelopeSentDate: completeRegistration.baaEnvelopeSentDate,
            baaEnvelopeStatus: completeRegistration.baaEnvelopeStatus,
            discountId: completeRegistration.discountId,
            websiteInfo: completeRegistration.websiteInfo,
            demoRequestId: completeRegistration.demoRequestId,
            contactPerson1Branch: completeRegistration.contactPerson1Branch,
            contactPerson1Email: completeRegistration.contactPerson1Email,
            contactPerson1Name: completeRegistration.contactPerson1Name,
            contactPerson1Phone: completeRegistration.contactPerson1Phone,
            contactPerson1Title: completeRegistration.contactPerson1Title,
            // contactPerson2Branch: completeRegistration.contactPerson2Branch,
            // contactPerson2Email: completeRegistration.contactPerson2Email,
            // contactPerson2Name: completeRegistration.contactPerson2Name,
            // contactPerson2Phone: completeRegistration.contactPerson2Phone,
            // contactPerson2Title: completeRegistration.contactPerson2Title,
            // contactPerson3Branch: completeRegistration.contactPerson3Branch,
            // contactPerson3Email: completeRegistration.contactPerson3Email,
            // contactPerson3Name: completeRegistration.contactPerson3Name,
            // contactPerson3Phone: completeRegistration.contactPerson3Phone,
            // contactPerson3Title: completeRegistration.contactPerson3Title,
            timestamp: new Date(),
        });
        const savedCompleteRegistration = await createCompleteRegistration.save()
        return savedCompleteRegistration; 
    }

    public async updateCompleteRegistration(completeRegistration: any, registrationId: any): Promise<any> {

        const updateCompleteRegistration = await CompleteRegistration.findByIdAndUpdate(
            registrationId,
          {$set: completeRegistration},
          { "upsert" : true } 
         
        ).select({ })
        return updateCompleteRegistration;
      }

      public async deleteCompleteRegistration(registrationId: any): Promise<ICompleteRegistration | null> {
        const deleteCompleteRegistration = await CompleteRegistration.findByIdAndDelete(registrationId).exec();
        return deleteCompleteRegistration
      }
}

export default CompleteRegistrationRepository