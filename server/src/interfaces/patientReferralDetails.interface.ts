import { Document } from 'mongoose'

export default interface IPatientReferralDetails extends Document {

    patientDemographicId: string;
    referralSourceId: string;
    referralId: string;
    referralDate: Date;
    referralFormUploadPath: string;
    medicarePhysicianPhone: number;
    medicarePhysicianFax: string;
    medicareFTFEncounterDate: Date;
    isReferralDiscussed: boolean;
    referralDiscussedWithName: string;
    referralDiscussedWithRelation: string;
    referralDiscussedDate: Date;
    referralDiscussedTime: string;
    isReferralDiscussionRefused: boolean;
    referralDiscussionRefusedReason: string;
    createdBy: string;
    isDeleted: boolean;
    updatedBy: string;
    npi: string;
    referralDiscussionRemark: string;
    physcianReferralId: string;
    physicianLicenceVerificationFileName: string;
    physicianLicenceVerificationUri: string;
    physicianIdWhenReferralSrcOtherThanPhysician: string;
    physicianLocationId: string;
    agencyUserId: string;
    dateofVerification: Date;
    verifiedBy: string;
}