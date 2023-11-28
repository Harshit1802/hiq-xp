import Joi from 'joi'
import Regex from '../constants/regex.constant'

class PatientPcpDetailsValidation {
    public pcpDetails = Joi.object({
        createdBy: Joi.string().required(),
        updatedBy: Joi.string().required(),
        patientDemographicId: Joi.string().required(),
        primaryCareProviderId: Joi.string().required(),
        pcpName: Joi.string().required(),
        pcpNpi: Joi.string().required(),
        associatedPhysicians: Joi.string(),
        physicianLocationId: Joi.string(),
        fileName: Joi.string(),
        uri: Joi.string().uri()
    })

    public validatePatientDemographicId(patientDemographicId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(patientDemographicId)
    }

    public validatePrimaryCareProviderId(primaryCareProviderId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(primaryCareProviderId)
    }
}
export default PatientPcpDetailsValidation