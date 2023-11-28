import IPatientContactDetails from "../interfaces/patientRepContactDetails.interface"
import RepContactDetails from "../schemas/patientRepContactDetails.schema"

class PatientContactDetailsRepository {

    public async getContactDetails(): Promise<IPatientContactDetails[]> {
        const contactDetails = await RepContactDetails.find().sort({ "timestamp": -1 })
        return contactDetails
    }

    public async createContactDetails(contactDetails: any): Promise<any> {
        const createContactDetails = new RepContactDetails({
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
            timestamp: new Date(),
        });
        const savedContactDetails = await createContactDetails.save()
        return savedContactDetails;
    }

    public async updateContactDetails(contactDetails: any, contactDetailsId: any): Promise<any> {
        const updateContactDetails = await RepContactDetails.findByIdAndUpdate(
            contactDetailsId,
            { $set: contactDetails },
            { "upsert": true }

        ).select({})
        return updateContactDetails;
    }

    public async deleteContactDetails(contactDetailsId: any): Promise<IPatientContactDetails | null> {
        const deleteContactDetails = await RepContactDetails.findByIdAndDelete(contactDetailsId).exec();
        return deleteContactDetails
    }
}
export default PatientContactDetailsRepository