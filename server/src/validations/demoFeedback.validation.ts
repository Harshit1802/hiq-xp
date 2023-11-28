import Joi from 'joi'
import Regex from '../constants/regex.constant'

class DemoFeedbackValidation {
    public demoFeedback = Joi.object({
        createdBy: Joi.string().max(30).required(),
        updatedBy: Joi.string().max(30).required(),
        feedback: Joi.string().max(500).required(),
        demoScheduleId: Joi.string().alphanum().max(30).required(),
    })

    public validateDemoScheduleId(demoScheduleId: string): boolean {
        return Regex.DEMOREQUESTID.test(demoScheduleId)
    }
}

export default DemoFeedbackValidation