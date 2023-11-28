import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';
import IController from '../interfaces/controller.interface';
import logger from '../utils/logger.utils';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import Message from '../constants/message';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from "../middlewares/authenticated.middleware"
import completeRegistrationValidation from '../validations/completeRegistration.validation';
import CompleteRegistrationService from '../services/completeRegistration.service';

class CompleteRegistrationController implements IController {
  public path: string
  public router: Router
  private authenticated: AuthenticatedMiddleware
  private validate: completeRegistrationValidation
  private completeRegistrationService: CompleteRegistrationService

  constructor() {
    this.path = Api.COMPLETE_REGEISTRATION;
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new completeRegistrationValidation();
    this.completeRegistrationService = new CompleteRegistrationService();

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${Api.COMPLETE_REGISTRATION_DETAILS}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.completeRegistration),
      this.createCompleteRegistration,
    )

    this.router.get(
      `${this.path}${Api.COMPLETE_REGISTRATION_DETAILS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getCompleteRegistration,
    )

    this.router.put(
      `${this.path}${Api.COMPLETE_REGISTRATION_DETAILS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateCompleteRegistration,
    )

    this.router.delete(
      `${this.path}${Api.COMPLETE_REGISTRATION_DETAILS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteCompleteRegistration,
    )
  }

  private updateCompleteRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const registrationId = req.query;
      const completeRegistration = req.body;
      const registrationDetails = await this.completeRegistrationService.updateCompleteRegistration(completeRegistration, registrationId)
      if (!registrationDetails) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating complete registration',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'complete registration updated successfully',
        data:
          registrationDetails
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while updating complete registration',
        data: null,
      })
    }
  }

  private getCompleteRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.params

      const registrationDetails = await this.completeRegistrationService.getCompleteRegistration()
      if (!registrationDetails) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching complete registration',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Complete registration fetched successfully',
        data: registrationDetails,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while fetching complete registration',
        data: null,
      })
    }
  }

  private createCompleteRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body

      const createdByValidated = this.validate.validateCreatedBy(obj.createdBy)
      if (!createdByValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.USERNAME_NOT_VALID,
          ),
        )
      }
      logger.info(`username ${obj.createdBy} is valid`)

      const updatedByValidated = this.validate.validateUpdatedBy(obj.updatedBy)
      if (!updatedByValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.EMAIL_NOT_VALID,
          ),
        )
      }
      logger.info(`email ${obj.updatedBy} is valid`)

      const legalNameValidated = this.validate.validateLegalName(obj.legalName)
      if (!legalNameValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.PHONE_NOT_VALID,
          ),
        )
      }
      logger.info(`phone ${obj.legalName} is valid`)

      const taxIdValidated = this.validate.validateTaxId(obj.taxId)
      if (!taxIdValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.taxId} is valid`)

      const officePhoneValidated = this.validate.validateOfficePhone(obj.officePhone)
      if (!officePhoneValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.officePhone} is valid`)

      const faxValidated = this.validate.validateFax(obj.fax)
      if (!faxValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.fax} is valid`)

      const mailingAddressStateCodeValidated = this.validate.validateMailingAddressStateCode(obj.mailingAddressStateCode)
      if (!mailingAddressStateCodeValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.mailingAddressStateCode} is valid`)

      const mailingAddressStateNameValidated = this.validate.validateMailingAddressStateName(obj.mailingAddressStateName)
      if (!mailingAddressStateNameValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.mailingAddressStateName} is valid`)

      const mailingAddressZipCodeValidated = this.validate.validateMailingAddressZipCode(obj.mailingAddressZipCode)
      if (!mailingAddressZipCodeValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.mailingAddressZipCode} is valid`)

      const contactEmailValidated = this.validate.validateContactEmail(obj.contactEmail)
      if (!contactEmailValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.contactEmail} is valid`)

      const contactMobileNumberValidated = this.validate.validateContactMobileNumber(obj.contactMobileNumber)
      if (!contactMobileNumberValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.contactMobileNumber} is valid`)

      const agencyAdminEmailValidated = this.validate.validateAgencyAdminEmail(obj.agencyAdminEmail)
      if (!agencyAdminEmailValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.agencyAdminEmail} is valid`)


      const agencyAdminMobileValidated = this.validate.validateAgencyAdminMobile(obj.agencyAdminMobile)
      if (!agencyAdminMobileValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.agencyAdminMobile} is valid`)

      const billingAddressZipCodeValidated = this.validate.validateBillingAddressZipCode(obj.billingAddressZipCode)
      if (!billingAddressZipCodeValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.billingAddressZipCode} is valid`)

      const emailValidated = this.validate.validateEmail(obj.email)
      if (!emailValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.email} is valid`)

      const stateHhaLicenseNoValidated = this.validate.validateStateHhaLicenseNo(obj.stateHhaLicenseNo)
      if (!stateHhaLicenseNoValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.stateHhaLicenseNo} is valid`)

      const agencyShortCodeValidated = this.validate.validateAgencyShortCode(obj.agencyShortCode)
      if (!agencyShortCodeValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.agencyShortCode} is valid`)

      const billingAddressAreaCodeValidated = this.validate.validateBillingAddressAreaCode(obj.billingAddressAreaCode)
      if (!billingAddressAreaCodeValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.billingAddressAreaCode} is valid`)


      const baaEnvelopeIdValidated = this.validate.validateBaaEnvelopeId(obj.baaEnvelopeId)
      if (!baaEnvelopeIdValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.baaEnvelopeId} is valid`)


      const discountIdValidated = this.validate.validateDiscountId(obj.discountId)
      if (!discountIdValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.discountId} is valid`)

      const demoRequestIdValidated = this.validate.validateDemoRequestId(obj.demoRequestId)
      if (!demoRequestIdValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.demoRequestId} is valid`)

      const params = obj;

      const response = await this.completeRegistrationService.createCompleteRegistration(params)
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving complete registration',
          data: null,
        })
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Complete registration Created successfully',
        data: response,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while saving complete registration',
        data: null,
      })
    }
  }

  private deleteCompleteRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const registrationId = req.query;

      const completeRegistrationDeleted = await this.completeRegistrationService.deleteCompleteRegistration(registrationId);

      if (!completeRegistrationDeleted) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting complete registration',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Complete registration deleted successfully',
        data:
          completeRegistrationDeleted,
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while deleting complete registration',
        data: null,
      })
    }
  }
}

export default CompleteRegistrationController