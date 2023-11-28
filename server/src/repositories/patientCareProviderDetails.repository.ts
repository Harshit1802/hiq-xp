import IPatientProviderDetails from "../interfaces/patientCareProviderDetails.interface"
import ProviderDeatils from "../schemas/patientCareProviderDetails.schema"

class PatientProviderDetailsRepository {

    public async getProviderDetails(): Promise<IPatientProviderDetails[]> {
        const providerDetails = await ProviderDeatils.find().sort({ "timestamp": -1 })
        return providerDetails
    }

    public async createProviderDetails(providerDetails: any): Promise<any> {
        const createProviderDetails = new ProviderDeatils({
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
            timestamp: new Date(),
        });
        const savedProviderDetails = await createProviderDetails.save()
        return savedProviderDetails;
    }

    public async updateProviderDetails(providerDetails: any, providerDetailsId: any): Promise<any> {
        const updateProviderDetails = await ProviderDeatils.findByIdAndUpdate(
            providerDetailsId,
            { $set: providerDetails },
            { "upsert": true }

        ).select({})
        return updateProviderDetails;
    }

    public async deleteProviderDetails(providerDetailsId: any): Promise<IPatientProviderDetails | null> {
        const deleteProviderDetails = await ProviderDeatils.findByIdAndDelete(providerDetailsId).exec();
        return deleteProviderDetails
    }
}
export default PatientProviderDetailsRepository