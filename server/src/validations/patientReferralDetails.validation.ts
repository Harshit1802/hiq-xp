import Joi from 'joi'
import Regex from '../constants/regex.constant'

class PatientReferralDetailsValidation {
    public referralDetails = Joi.object({
        patientDemographicId: Joi.string().required(),
        referralSourceId: Joi.string().required(),
        referralId: Joi.string().required(),
        referralDate: Joi.date().iso().required(),
        referralFormUploadPath: Joi.string(),
        medicarePhysicianPhone: Joi.number().integer(),
        medicarePhysicianFax: Joi.string(),
        medicareFTFEncounterDate: Joi.date().iso(),
        isReferralDiscussed: Joi.boolean(),
        referralDiscussedWithName: Joi.string(),
        referralDiscussedWithRelation: Joi.string(),
        referralDiscussedDate: Joi.date().iso(),
        referralDiscussedTime: Joi.string(),
        isReferralDiscussionRefused: Joi.boolean(),
        referralDiscussionRefusedReason: Joi.string(),
        createdBy: Joi.string().required(),
        isDeleted: Joi.boolean(),
        updatedBy: Joi.string(),
        npi: Joi.string(),
        referralDiscussionRemark: Joi.string(),
        physcianReferralId: Joi.string(),
        physicianLicenceVerificationFileName: Joi.string(),
        physicianLicenceVerificationUri: Joi.string().uri(),
        physicianIdWhenReferralSrcOtherThanPhysician: Joi.string(),
        physicianLocationId: Joi.string(),
        agencyUserId: Joi.string(),
        dateofVerification: Joi.date().iso(),
        verifiedBy: Joi.string()
    })

    public validatePatientDemographicId(patientDemographicId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(patientDemographicId)
    }

    public validateReferralSourceId(referralSourceId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(referralSourceId)
    }

    public validateReferralId(referralId: string): boolean {
        return Regex.REFERRALID.test(referralId)
    }

    public validateMedicarePhysicianPhone(medicarePhysicianPhone: string): boolean {
        return Regex.PHONE.test(medicarePhysicianPhone)
    }

    public validatePhyscianReferralId(physcianReferralId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(physcianReferralId)
    }

}
export default PatientReferralDetailsValidation