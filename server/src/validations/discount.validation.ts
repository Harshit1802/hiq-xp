import Joi from 'joi'
import Regex from '../constants/regex.constant'

class discountValidation {
    public discount = Joi.object({
        createdBy: Joi.string().max(30).required(),
        updatedBy: Joi.string().max(30).required(),
        discountName: Joi.string().max(30).required(),
        percentage: Joi.number().integer().min(0).max(100).required(),
        validityPeriod: Joi.date().iso().required(),
        description: Joi.string().max(255).allow(null).optional(),
        value: Joi.number().integer().min(0).max(100).required()
    })
}

export default discountValidation