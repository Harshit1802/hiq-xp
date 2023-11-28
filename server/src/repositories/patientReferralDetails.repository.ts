import IPatientReferralDetails from "../interfaces/patientReferralDetails.interface"
import ReferralDetails from "../schemas/patientReferralDetails.schema"

class PatientReferralDetailsRepository {

    public async getReferralDetails(): Promise<IPatientReferralDetails[]> {
        const referralDetails = await ReferralDetails.find().sort({ "timestamp": -1 })
        return referralDetails
    }

    public async createReferralDetails(referralDetails: any): Promise<any> {
        const createReferralDetails = new ReferralDetails({
            patientDemographicId: referralDetails.patientDemographicId,
            referralSourceId: referralDetails.referralSourceId,
            referralId: referralDetails.referralId,
            referralDate: referralDetails.referralDate,
            referralFormUploadPath: referralDetails.referralFormUploadPath,
            medicarePhysicianPhone: referralDetails.medicarePhysicianPhone,
            medicarePhysicianFax: referralDetails.medicarePhysicianFax,
            medicareFTFEncounterDate: referralDetails.medicareFTFEncounterDate,
            referralDiscussedWithName: referralDetails.referralDiscussedWithName,
            referralDiscussedWithRelation: referralDetails.referralDiscussedWithRelation,
            referralDiscussedDate: referralDetails.referralDiscussedDate,
            referralDiscussedTime: referralDetails.referralDiscussedTime,
            referralDiscussionRefusedReason: referralDetails.referralDiscussionRefusedReason,
            createdBy: referralDetails.createdBy,
            updatedBy: referralDetails.updatedBy,
            npi: referralDetails.npi,
            referralDiscussionRemark: referralDetails.referralDiscussionRemark,
            physcianReferralId: referralDetails.physcianReferralId,
            physicianLicenceVerificationFileName: referralDetails.physicianLicenceVerificationFileName,
            physicianLicenceVerificationUri: referralDetails.physicianLicenceVerificationUri,
            physicianIdWhenReferralSrcOtherThanPhysician: referralDetails.physicianIdWhenReferralSrcOtherThanPhysician,
            physicianLocationId: referralDetails.physicianLocationId,
            agencyUserId: referralDetails.agencyUserId,
            dateofVerification: referralDetails.dateofVerification,
            verifiedBy: referralDetails.verifiedBy,
            timestamp: new Date(),
        });
        const savedReferralDetails = await createReferralDetails.save()
        return savedReferralDetails;
    }

    public async updateReferralDetails(referralDetails: any, referralDetailsId: any): Promise<any> {
        const updateReferralDetails = await ReferralDetails.findByIdAndUpdate(
            referralDetailsId,
            { $set: referralDetails },
            { "upsert": true }

        ).select({})
        return updateReferralDetails;
    }

    public async deleteReferralDetails(referralDetailsId: any): Promise<IPatientReferralDetails | null> {
        const deleteReferralDetails = await ReferralDetails.findByIdAndDelete(referralDetailsId).exec();
        return deleteReferralDetails
    }
}
export default PatientReferralDetailsRepository