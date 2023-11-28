import Joi from 'joi'
import Regex from '../constants/regex.constant'

class DemoRequestValidation {
public demoRequest = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    jobTitle: Joi.string().required(),
    companyName: Joi.string().required(),
    address: Joi.string().required(),
    streetAddress: Joi.string(),
    addressLine2: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email().required(),
    website: Joi.string().uri().required(),
    timeZone: Joi.string().valid().required(),
})

  public validatePostalCode(postalCode: string): boolean {
    return Regex.POSTALCODE.test(postalCode)
  }

  public validatePhone(phone: string): boolean {
    return Regex.PHONE.test(phone)
  }

  public validateEmail(email: string): boolean {
    return Regex.EMAIL.test(email)
  }

  public validateWebsite(website: string): boolean {
    return Regex.WEBSITE.test(website)
  }

  public validateTimeZone(timeZone: string): boolean {
    return Regex.TIMEZONE.test(timeZone)
  }

}
export default DemoRequestValidation