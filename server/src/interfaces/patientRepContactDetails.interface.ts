import { Document } from 'mongoose'

export default interface IPatientContactDetails extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    patientDemographicId: string;
    isLegalRepresentative: boolean;
    legalDocumentUrl: string;
    legalRepName: string;
    legalRepPrimaryContact: string;
    legalRepPrimaryContactTypeId: number;
    legalRepRelationShipName: string;
    legalRepSecondaryContact: string;
    legalRepSecondaryContactTypeId: number;
    isNoERContactProvided: boolean;

}
