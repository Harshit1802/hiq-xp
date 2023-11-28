import PatientOtherDetailsRepository from "../repositories/patientOtherDetails.repository";

class PatientOtherDetailsService {
    private patientOtherDetailsRepository: PatientOtherDetailsRepository

    constructor() {
        this.patientOtherDetailsRepository = new PatientOtherDetailsRepository()
    }

    public async getOtherDetails() {
        const getOtherDetails = await this.patientOtherDetailsRepository.getOtherDetails();
        return getOtherDetails;
    }

    public async createOtherDetails(otherDetails: any): Promise<any> {
        const createOtherDetails = {
            createdBy: otherDetails.createdBy,
            updatedBy: otherDetails.updatedBy,
            languageId: otherDetails.languageId,
            communicationNeedId: otherDetails.communicationNeedId,
            precautionId: otherDetails.precautionId,
            precautionAssignedReason: otherDetails.precautionAssignedReason,
            triageCodeId: otherDetails.triageCodeId,
            triageCodeReason: otherDetails.triageCodeReason,
            hospitalRiskProfileId: otherDetails.hospitalRiskProfileId,
            specialInstructions: otherDetails.specialInstructions,
            acuityLevelId: otherDetails.acuityLevelId,
            patientDemographicId: otherDetails.patientDemographicId,
            communicationNeedOthers: otherDetails.communicationNeedOthers,
            otherLanguage: otherDetails.otherLanguage,
        }
        const savedOtherDetails = await this.patientOtherDetailsRepository.createOtherDetails(createOtherDetails);
        return savedOtherDetails
    }

    public async updateOtherDetails(otherDetails: any, otherDetailsId: any): Promise<any> {
        const updateOtherDetails = await this.patientOtherDetailsRepository.updateOtherDetails(otherDetails, otherDetailsId)
        return updateOtherDetails
    }

    public async deleteOtherDetails(otherDetailsId: any): Promise<any> {
        const deleteOtherDetails = await this.patientOtherDetailsRepository.deleteOtherDetails(otherDetailsId)
        return deleteOtherDetails
    }
}
export default PatientOtherDetailsService