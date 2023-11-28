import PatientProviderDetailsRepository from "../repositories/patientCareProviderDetails.repository";

class PatientProviderDetailsService {
    private patientProviderDetailsRepository: PatientProviderDetailsRepository

    constructor() {
        this.patientProviderDetailsRepository = new PatientProviderDetailsRepository()
    }

    public async getProviderDetails() {
        const getProviderDetails = await this.patientProviderDetailsRepository.getProviderDetails();
        return getProviderDetails;
    }

    public async createProviderDetails(providerDetails: any): Promise<any> {
        const createProviderDetails = {
            createdBy: providerDetails.createdBy,
            updatedBy: providerDetails.updatedBy,
            patientDemographicId: providerDetails.patientDemographicId,
            primaryCareProviderId: providerDetails.primaryCareProviderId,
            primaryInsuranceId: providerDetails.primaryInsuranceId,
            eligibilityCheckDocumentUrl: providerDetails.eligibilityCheckDocumentUrl,
            insuranceNumber: providerDetails.insuranceNumber,
            groupNumber: providerDetails.groupNumber,
            policyNumber: providerDetails.policyNumber,
            insuredFirstName: providerDetails.insuredFirstName,
            insuredLastName: providerDetails.insuredLastName,
            employer: providerDetails.employer,
            employerNumber: providerDetails.employerNumber,
            languageId: providerDetails.languageId,
            communicationNeedId: providerDetails.communicationNeedId,
            precautionId: providerDetails.precautionId,
            precautionAssignedReason: providerDetails.precautionAssignedReason,
            triageCodeId: providerDetails.triageCodeId,
            triageCodeReason: providerDetails.triageCodeReason,
            hospitalRiskProfileId: providerDetails.hospitalRiskProfileId,
            specialInstructions: providerDetails.specialInstructions,
            secondaryInsEligibilityCheckDocumentUrl: providerDetails.secondaryInsEligibilityCheckDocumentUrl,
            secondaryInsGroupNumber: providerDetails.secondaryInsGroupNumber,
            secondaryInsInsuredFirstName: providerDetails.secondaryInsInsuredFirstName,
            secondaryInsInsuredLastName: providerDetails.secondaryInsInsuredLastName,
            secondaryInsPolicyNumber: providerDetails.secondaryInsPolicyNumber,
            // secondaryInsuranceId: providerDetails.secondaryInsuranceId,
            secondaryInsuranceNumber: providerDetails.secondaryInsuranceNumber,
            insuredRelationShipName: providerDetails.insuredRelationShipName,
            secondaryInsInsuredRelationShipName: providerDetails.secondaryInsInsuredRelationShipName,
            acuityLevelId: providerDetails.acuityLevelId,
            transferAgencyName: providerDetails.transferAgencyName,
            transferNpi: providerDetails.transferNpi,
            secondaryEmployer: providerDetails.secondaryEmployer,
            secondaryEmployerNumber: providerDetails.secondaryEmployerNumber,
        }
        const savedProviderDetails = await this.patientProviderDetailsRepository.createProviderDetails(createProviderDetails);
        return savedProviderDetails
    }

    public async updateProviderDetails(providerDetails: any, providerDetailsId: any): Promise<any> {
        const updateProviderDetails = await this.patientProviderDetailsRepository.updateProviderDetails(providerDetails, providerDetailsId)
        return updateProviderDetails
    }

    public async deleteProviderDetails(providerDetailsId: any): Promise<any> {
        const deleteProviderDetails = await this.patientProviderDetailsRepository.deleteProviderDetails(providerDetailsId)
        return deleteProviderDetails
    }
}
export default PatientProviderDetailsService