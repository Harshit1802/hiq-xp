import Joi from 'joi'
import Regex from '../constants/regex.constant'

class ServiceAgreementValidation {
    public serviceAgreement = Joi.object({
        createdBy: Joi.string().max(30).required(),
        updatedBy: Joi.string().max(30).required(),
        contractPeriodFrom: Joi.date().required(),
        contractPeriodTo: Joi.date().required(),
        contractPeriod: Joi.number().required(),
        contractEnvelopeId: Joi.string().required(),
        contractEnvelopeStatus: Joi.string().required(),
        contractEnvelopeSentDate: Joi.date().required(),
        contractEnvelopeSignedDate: Joi.date().required(),
        demoRequestId: Joi.string().required(),
        contractSubscriptionPlanId: Joi.string().required(),
        contractDiscountId: Joi.string().required(),
        fileName: Joi.string().required(),
        uri: Joi.string().required(),
    })

    public validateContractEnvelopeId(contractEnvelopeId: string): boolean {
        return Regex.ENVELOPEID.test(contractEnvelopeId)
    }

    public validateUri(uri: string): boolean {
        return Regex.WEBSITE.test(uri)
    }
}

export default ServiceAgreementValidation