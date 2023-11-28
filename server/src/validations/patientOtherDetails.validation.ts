import Joi from 'joi'
import Regex from '../constants/regex.constant'

class PatientOtherDetailsValidation {
    public otherDetails = Joi.object({
        createdBy: Joi.string().required(),
        updatedBy: Joi.string().required(),
        isDeleted: Joi.boolean().required(),
        languageId: Joi.string().required(),
        communicationNeedId: Joi.string().required(),
        precautionId: Joi.string().required(),
        precautionAssignedReason: Joi.string().required(),
        triageCodeId: Joi.string().required(),
        triageCodeReason: Joi.string().required(),
        hospitalRiskProfileId: Joi.string().required(),
        specialInstructions: Joi.string().required(),
        acuityLevelId: Joi.number().integer().required(),
        patientDemographicId: Joi.number().integer().required(),
        communicationNeedOthers: Joi.string(),
        otherLanguage: Joi.string()
    })

    public validateLanguageId(languageId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(languageId)
    }

    public validateCommunicationNeedId(communicationNeedId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(communicationNeedId)
    }

    public validateprecautionId(precautionId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(precautionId)
    }

    public validateTriageCodeId(triageCodeId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(triageCodeId)
    }

    public validateHospitalRiskProfileId(hospitalRiskProfileId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(hospitalRiskProfileId)
    }

    public validatePatientDemographicId(patientDemographicId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(patientDemographicId)
    }
}
export default PatientOtherDetailsValidation