
import Joi from 'joi'
import Regex from '../constants/regex.constant'

class UserValidation {
  public register = Joi.object({
    username: Joi.string().max(30),
    firstName: Joi.string().max(30).required(),
    middleName: Joi.string().max(30),
    lastName: Joi.string().max(30).required(),
    dob: Joi.date().iso(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    email: Joi.string().email().required(),
    // emailConfirmed: Joi.string().email().required(),
    password: Joi.string(),
    phone: Joi.string(),
    // phoneNumberConfirmed: Joi.string().min(10).max(15).required(),
    // twoFactorEnabled: Joi.boolean().required(),
    lockOutTimeStamp: Joi.date().iso().allow(null), //.greater(Joi.ref('now')).allow(null),
    accessFailedCount: Joi.number().integer(),
    // address: Joi.string().max(100).required(),
    lastPasswordResetDate: Joi.date().iso().allow(null),
    agencyId: Joi.string().alphanum(),
    roles: Joi.string(),
    ssnNumber: Joi.string(),
    faxNumber: Joi.string(),
    designation: Joi.string(),
    image: Joi.string().uri(),
    thumbnail: Joi.string().uri(),
    pinNumber: Joi.number(),
    agencyBranchId: Joi.array().items(Joi.number()),
    signature: Joi.string().uri(),
    sequenceNo: Joi.number(),
    homePhoneNumber: Joi.string(),
  })

  public login = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(30).required(),
  })

  public deleteUser = Joi.object({
    password: Joi.string().min(6).max(30).required(),
  })

  public validateUsername(username: string): boolean {
    return Regex.USERNAME.test(username)
  }

  public validateEmail(email: string): boolean {
    return Regex.EMAIL.test(email)
  }

  public validatePassword(password: string): boolean {
    return Regex.PASSWORD.test(password)
  }

  public validatePhone(phone: string): boolean {
    return Regex.PHONE.test(phone)
  }

  public validateImage(image: string): boolean {
    return Regex.IMAGEURL.test(image)
  }

  public validatePinNumber(pinNumber: string): boolean {
    return Regex.PIN.test(pinNumber)
  }

  public validateHomePhoneNumber(phone: string): boolean {
    return Regex.PHONE.test(phone)
  }
}

export default UserValidation
