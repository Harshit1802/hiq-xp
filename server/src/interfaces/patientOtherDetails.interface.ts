import { Document } from 'mongoose'

export default interface IPatientOtherDetails extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    languageId: string;
    communicationNeedId: string;
    precautionId: string;
    precautionAssignedReason: string;
    triageCodeId: string;
    triageCodeReason: string;
    hospitalRiskProfileId: string;
    specialInstructions: string;
    acuityLevelId: number;
    patientDemographicId: number;
    communicationNeedOthers: string;
    otherLanguage: string
}