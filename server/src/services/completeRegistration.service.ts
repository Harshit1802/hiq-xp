import CompleteRegistrationRepository from "../repositories/completeRegistration.repository";

class CompleteRegistrationService {
    private completeRegistrationRepository: CompleteRegistrationRepository

    constructor() {
        this.completeRegistrationRepository = new CompleteRegistrationRepository()
    }

    public async getCompleteRegistration() {
        const getCompleteRegistration = await this.completeRegistrationRepository.getCompleteRegistration();
        return getCompleteRegistration;
    }

    public async createCompleteRegistration(completeRegistration: any): Promise<any> {
        const createCompleteRegistration = {
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
            // contactPerson2Branch: completeRegistration.createdBy,
            // contactPerson2Email: completeRegistration.createdBy,
            // contactPerson2Name: completeRegistration.createdBy,
            // contactPerson2Phone: completeRegistration.createdBy,
            // contactPerson2Title: completeRegistration.createdBy,
            // contactPerson3Branch: completeRegistration.createdBy,
            // contactPerson3Email: completeRegistration.createdBy,
            // contactPerson3Name: completeRegistration.createdBy,
            // contactPerson3Phone: completeRegistration.createdBy,
            // contactPerson3Title: completeRegistration.createdBy,
        }
        const savedCompleteRegistration = await this.completeRegistrationRepository.createCompleteRegistration(createCompleteRegistration);
        return savedCompleteRegistration
    }

    public async updateCompleteRegistration(completeRegistration: any, registrationId: any): Promise<any> {

        const updateCompleteRegistration = await this.completeRegistrationRepository.updateCompleteRegistration(completeRegistration, registrationId)
        return updateCompleteRegistration
    }

    public async deleteCompleteRegistration(registrationId: any): Promise<any> {
        const deleteCompleteRegistration = await this.completeRegistrationRepository.deleteCompleteRegistration(registrationId)
        return deleteCompleteRegistration
    }

}

export default CompleteRegistrationService