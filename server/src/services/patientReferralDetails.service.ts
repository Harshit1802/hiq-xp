import PatientReferralDetailsRepository from "../repositories/patientReferralDetails.repository";

class PatientReferralDetailsService {
    private patientReferralDetailsRepository: PatientReferralDetailsRepository

    constructor() {
        this.patientReferralDetailsRepository = new PatientReferralDetailsRepository()
    }

    public async getReferralDetails() {
        const getReferralDetails = await this.patientReferralDetailsRepository.getReferralDetails();
        return getReferralDetails;
    }

    public async createReferralDetails(referralDetails: any): Promise<any> {
        const createReferralDetails = {
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
        }
        const savedReferralDetails = await this.patientReferralDetailsRepository.createReferralDetails(createReferralDetails);
        return savedReferralDetails
    }

    public async updateReferralDetails(referralDetails: any, referralDetailsId: any): Promise<any> {
        const updateReferralDetails = await this.patientReferralDetailsRepository.updateReferralDetails(referralDetails, referralDetailsId)
        return updateReferralDetails
    }

    public async deleteReferralDetails(referralDetailsId: any): Promise<any> {
        const deleteReferralDetails = await this.patientReferralDetailsRepository.deleteReferralDetails(referralDetailsId)
        return deleteReferralDetails
    }
}
export default PatientReferralDetailsService