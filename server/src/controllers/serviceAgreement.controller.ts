import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';
// http constant
import IController from '../interfaces/controller.interface';
import logger from '../utils/logger.utils';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import Message from '../constants/message';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from '../middlewares/authenticated.middleware';
import ServiceAgreementValidation from '../validations/serviceAgreement.validation';
import ServiceAgreementService from '../services/serviceAgreement.service';


class ServiceAgreementController implements IController {
  public path: string
  public router: Router
  private authenticated: AuthenticatedMiddleware
  private validate: ServiceAgreementValidation
  private serviceAgreementService: ServiceAgreementService

  constructor() {
    this.path = Api.SERVICE_AGREEMENT;
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new ServiceAgreementValidation();
    this.serviceAgreementService = new ServiceAgreementService();

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${Api.SERVICE_AGREEMENT_DETAILS}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.serviceAgreement),
      this.createServiceAgreement,
    )
    this.router.get(
      `${this.path}${Api.SERVICE_AGREEMENT_DETAILS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getServiceAgreement,
    )
    this.router.put(
      `${this.path}${Api.SERVICE_AGREEMENT_DETAILS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateServiceAgreement,
    )
    this.router.delete(
      `${this.path}${Api.SERVICE_AGREEMENT_DETAILS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteServiceAgreement,
    )
  }

  private updateServiceAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const serviceId = req.query;
      const serviceAgreement = req.body;
      const service = await this.serviceAgreementService.updateServiceAgreement(serviceAgreement, serviceId)
      if (!service) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating service agreement',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Service agreement updated successfully',
        data:
          service
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while updating service agreement',
        data: null,
      })
    }
  }

  private getServiceAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.params

      const service = await this.serviceAgreementService.getServiceAgreement()
      if (!service) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching service agreement',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Service agreement fetched successfully',
        data: service,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while fetching service agreement',
        data: null,
      })
    }
  }

  private createServiceAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body

      const contractEnvelopeIdValidated = this.validate.validateContractEnvelopeId(obj.contractEnvelopeId)
      if (!contractEnvelopeIdValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.USERNAME_NOT_VALID,
          ),
        )
      }
      logger.info(`username ${obj.contractEnvelopeId} is valid`)

      const uriValidated = this.validate.validateUri(obj.uri)
      if (!uriValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.NAME_NOT_VALID,
          ),
        )
      }
      logger.info(`name ${obj.uri} is valid`)

      const params = obj;

      const response = await this.serviceAgreementService.createServiceAgreement(params)
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving service agreement',
          data: null,
        })
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Service agreement created successfully',
        data: response,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while saving service agreement',
        data: null,
      })
    }
  }

  private deleteServiceAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const serviceId = req.query;

      // Assuming you have a service method called 'deleteUserById' in your userService
      const serviceAgreementDeleted = await this.serviceAgreementService.deleteServiceAgreement(serviceId);

      if (!serviceAgreementDeleted) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting service agreement',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Service agreement deleted successfully',
        data: serviceAgreementDeleted,
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while deleting service agreement',
        data: null,
      })
    }
  }
}

export default ServiceAgreementController