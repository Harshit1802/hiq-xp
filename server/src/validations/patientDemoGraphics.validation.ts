import Joi from 'joi'
import Regex from '../constants/regex.constant'

class PatientDemoGraphicsValidation {
    public demoGraphics = Joi.object({
        mrnSequenceNo: Joi.number().integer(),
        createdBy: Joi.string().required(),
        updatedBy: Joi.string().required(),
        isDeleted: Joi.boolean(),
        mrn: Joi.string().required(),
        firstName: Joi.string().max(30).required(),
        lastName: Joi.string().max(30).required(),
        displayName: Joi.string(),
        sSN: Joi.string(),
        gender: Joi.string().valid('Male', 'Female', 'Other'),
        dob: Joi.date().iso(),
        age: Joi.string(),
        addressId: Joi.string(),
        primaryContactType: Joi.string(),
        primaryContactNumber: Joi.number().integer(),
        secondaryContactType: Joi.string().allow(''),
        secondaryContactNumber: Joi.number().integer(),
        email: Joi.string().email().required(),
        status: Joi.string(),
        isActive: Joi.boolean(),
        patientImageUrl: Joi.string().uri(),
        dateofDeath: Joi.date().iso(),
        placeOfDeath: Joi.string(),
        reasonOfDeath: Joi.string(),
        isParticipateInCaphsSurvey: Joi.boolean(),
        genderOther: Joi.string().allow(''),
        isVisitReminderNeeded: Joi.boolean(),
        isNoaSent: Joi.boolean(),
        ptAddressTypeId: Joi.string(),
        addressTypeOther: Joi.string().allow('')
    })

    public validatePrimaryContactNumber(primaryContactNumber: string): boolean {
        return Regex.PHONE.test(primaryContactNumber)
    }

    public validateSecondaryContactNumber(secondaryContactNumber: string): boolean {
        return Regex.PHONE.test(secondaryContactNumber)
    }

    public validateEmail(email: string): boolean {
        return Regex.EMAIL.test(email)
    }

    public validatePatientImageUrl(patientImageUrl: string): boolean {
        return Regex.IMAGEURL.test(patientImageUrl)
    }

}
export default PatientDemoGraphicsValidation