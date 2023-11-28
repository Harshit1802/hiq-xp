import PatientContactDetailsRepository from "../repositories/patientRepContactDetails.repository";

class PatientContactDetailsService {
    private patientContactDetailsRepository: PatientContactDetailsRepository

    constructor() {
        this.patientContactDetailsRepository = new PatientContactDetailsRepository()
    }

    public async getContactDetails() {
        const getContactDetails = await this.patientContactDetailsRepository.getContactDetails();
        return getContactDetails;
    }

    public async createContactDetails(contactDetails: any): Promise<any> {
        const createContactDetails = {
            createdBy: contactDetails.createdBy,
            updatedBy: contactDetails.updatedBy,
            patientDemographicId: contactDetails.patientDemographicId,
            legalDocumentUrl: contactDetails.legalDocumentUrl,
            legalRepName: contactDetails.legalRepName,
            legalRepPrimaryContact: contactDetails.legalRepPrimaryContact,
            legalRepPrimaryContactTypeId: contactDetails.legalRepPrimaryContactTypeId,
            legalRepRelationShipName: contactDetails.legalRepRelationShipName,
            legalRepSecondaryContact: contactDetails.legalRepSecondaryContact,
            legalRepSecondaryContactTypeId: contactDetails.legalRepSecondaryContactTypeId,
        }
        const savedContactDetails = await this.patientContactDetailsRepository.createContactDetails(createContactDetails);
        return savedContactDetails
    }

    public async updateContactDetails(contactDetails: any, contactDetailsId: any): Promise<any> {
        const updateContactDetails = await this.patientContactDetailsRepository.updateContactDetails(contactDetails, contactDetailsId)
        return updateContactDetails
    }

    public async deleteContactDetails(contactDetailsId: any): Promise<any> {
        const deleteContactDetails = await this.patientContactDetailsRepository.deleteContactDetails(contactDetailsId)
        return deleteContactDetails
    }
}
export default PatientContactDetailsService