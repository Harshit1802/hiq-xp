import Joi from 'joi'
import Regex from '../constants/regex.constant'

class PatientContactDetailsValidation {
    public RepContactDetails = Joi.object({
        createdBy: Joi.string().required(),
        updatedBy: Joi.string().required(),
        patientDemographicId: Joi.string().required(),
        legalDocumentUrl: Joi.string().uri(),
        legalRepName: Joi.string(),
        legalRepPrimaryContact: Joi.string(),
        legalRepPrimaryContactTypeId: Joi.number().integer(),
        legalRepRelationShipName: Joi.string(),
        legalRepSecondaryContact: Joi.string(),
        legalRepSecondaryContactTypeId: Joi.number().integer(),
    })

    public validatePatientDemographicId(patientDemographicId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(patientDemographicId)
    }
}
export default PatientContactDetailsValidation