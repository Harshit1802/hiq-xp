import Joi from 'joi'
import Regex from '../constants/regex.constant' 

class demoScheduleValidation {
    public demoSchedule = Joi.object({
        createdBy: Joi.string().max(30),
        updatedBy: Joi.string().max(30),
        demoGivenByUserId: Joi.string().max(30).required(),
        demoGivenByAlternativeId: Joi.string().max(30).required(),
        demoScheduleDate: Joi.date().iso().required(),
        demoScheduleTimeFrom: Joi.date().iso().required(),
        demoScheduleTimeTo: Joi.date().iso().required(),
        demoDuration: Joi.number().min(1),
        meeting: Joi.string().uri().required(),
        description: Joi.string().max(255).allow(null).optional(),
        demoRequestId: Joi.string().alphanum().max(30),
    })

    public validateCreatedBy(createdBy: string): boolean {
        return Regex.CREATEDBY.test(createdBy)
      }

    public validateUpdatedBy(updatedBy: string): boolean {
        return Regex.CREATEDBY.test(updatedBy)
      }

    public validateDemoGivenByUserId(demoGivenByUserId: string): boolean {
        return Regex.CREATEDBY.test(demoGivenByUserId)
      }

    public validateDemoGivenByAlternativeId(demoGivenByAlternativeId: string): boolean {
        return Regex.CREATEDBY.test(demoGivenByAlternativeId)
      }  

    public validateMeeting(meeting: string): boolean {
        return Regex.MEETINGURL.test(meeting)
      }

    public validateDemoRequestId(demoRequestId: string): boolean {
        return Regex.DEMOREQUESTID.test(demoRequestId)
      }
}

export default demoScheduleValidation