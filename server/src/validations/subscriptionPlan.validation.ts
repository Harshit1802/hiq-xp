import Joi from 'joi'
import Regex from '../constants/regex.constant'

class subscriptionPlanValidation {
    public subscriptionPlan = Joi.object({
        createdBy: Joi.string().max(30).required(),
        updatedBy: Joi.string().max(30).required(),
        planName: Joi.string().max(30).required(),
        activePatientRangeFrom: Joi.date().iso().required(),
        activePatientRangeTo: Joi.date().iso().required(),
        branchRangeFrom: Joi.date().iso().required(),
        branchRangeTo: Joi.date().iso().required(),
        monthlyCost: Joi.number().positive().required(),
        description: Joi.string().max(255).allow(null).optional(),
        effectiveDate: Joi.date().iso().required(),
        expirationDate: Joi.date().iso().required(),
    })

    public validateMonthlyCost(monthlyCost: string): boolean {
        return Regex.MONTHLY_COST.test(monthlyCost)
    }
}
export default subscriptionPlanValidation