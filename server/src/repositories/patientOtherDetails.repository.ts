import IPatientOtherDetails from "../interfaces/patientOtherDetails.interface"
import OtherDetails from "../schemas/patientOtherDetails.schema"

class PatientOtherDetailsRepository {

    public async getOtherDetails(): Promise<IPatientOtherDetails[]> {
        const otherDetails = await OtherDetails.find().sort({ "timestamp": -1 })
        return otherDetails
    }

    public async createOtherDetails(otherDetails: any): Promise<any> {
        const createOtherDetails = new OtherDetails({
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
            timestamp: new Date(),
        });
        const savedOtherDetails = await createOtherDetails.save()
        return savedOtherDetails;
    }

    public async updateOtherDetails(otherDetails: any, otherDetailsId: any): Promise<any> {
        const updateOtherDetails = await OtherDetails.findByIdAndUpdate(
            otherDetailsId,
            { $set: otherDetails },
            { "upsert": true }

        ).select({})
        return updateOtherDetails;
    }

    public async deleteOtherDetails(otherDetailsId: any): Promise<IPatientOtherDetails | null> {
        const deleteOtherDetails = await OtherDetails.findByIdAndDelete(otherDetailsId).exec();
        return deleteOtherDetails
    }
}
export default PatientOtherDetailsRepository