import Joi from 'joi'

class RolesValidation {
    public roles = Joi.object({
        roleName: Joi.string().max(30).required(),
    })
}
export default RolesValidation