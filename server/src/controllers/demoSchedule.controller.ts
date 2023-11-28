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
import DemoScheduleService from "../services/demoSchedule.service"
import demoScheduleValidation from "../validations/demoSchedule.validation"


class DemoScheduleController implements IController {
  public path: string
  public router: Router
  private authenticated: AuthenticatedMiddleware
  private validate: demoScheduleValidation
  private demoScheduleService: DemoScheduleService

  constructor() {
    this.path = Api.SCHEDULE;
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new demoScheduleValidation();
    this.demoScheduleService = new DemoScheduleService();

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${Api.DEMO_SCHEDULE}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.demoSchedule),
      this.createDemoSchedule,
    )
    this.router.get(
      `${this.path}${Api.DEMO_SCHEDULE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getDemoSchedule,
    )
    this.router.put(
      `${this.path}${Api.DEMO_SCHEDULE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateDemoSchedule,
    )
    this.router.delete(
      `${this.path}${Api.DEMO_SCHEDULE}`,
      this.authenticated.verifyTokenAndAuthorization,
      //validationMiddleware(this.validate.demoRequest),
      this.deleteDemoSchedule,
    )
  }

  private updateDemoSchedule = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const scheduleId = req.query;
      const demoSchedule = req.body;
      const schedule = await this.demoScheduleService.updateDemoSchedule(demoSchedule, scheduleId)
      if (!schedule) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating demo schedule',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo schedule updated successfully',
        data:
          schedule
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while updating demo schedule',
        data: null,
      })
    }
  }

  private getDemoSchedule = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.params

      const schedule = await this.demoScheduleService.getDemoSchedule()
      if (!schedule) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching demo schedule',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo schedule fetched successfully',
        data: schedule,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while fetching demo schedule',
        data: null,
      })
    }
  }

  private createDemoSchedule = async (
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

      const demoGivenByUserIdValidated = this.validate.validateDemoGivenByUserId(obj.demoGivenByUserId)
      if (!demoGivenByUserIdValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.PHONE_NOT_VALID,
          ),
        )
      }
      logger.info(`phone ${obj.demoGivenByUserId} is valid`)

      const demoGivenByAlternativeIdValidated = this.validate.validateDemoGivenByAlternativeId(obj.demoGivenByAlternativeId)
      if (!demoGivenByAlternativeIdValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.ADDRESS_NOT_VALID,
          ),
        )
      }
      logger.info(`address ${obj.demoGivenByAlternativeId} is valid`)

      // const demoScheduleDateValidated = this.validate.validateDemoScheduleDate(obj.demoScheduleDate)
      // if (!demoScheduleDateValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.ADDRESS_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`address ${obj.demoScheduleDate} is valid`)

      // const demoScheduleTimeFromValidated = this.validate.validateDemoScheduleTimeFrom(obj.demoScheduleTimeFrom)
      // if (!demoScheduleTimeFromValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.ADDRESS_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`address ${obj.demoScheduleTimeFrom} is valid`)

      // const demoScheduleTimeToValidated = this.validate.validateDemoScheduleTimeTo(obj.demoScheduleTimeTo)
      // if (!demoScheduleTimeToValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.ADDRESS_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`address ${obj.demoScheduleTimeTo} is valid`)

      // const meetingValidated = this.validate.validateMeeting(obj.meeting)
      // if (!meetingValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.ADDRESS_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`address ${obj.meeting} is valid`)

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

      const response = await this.demoScheduleService.createDemoSchedule(params)
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving demo schedule',
          data: null,
        })
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Demo schedule created successfully',
        data: response,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while saving demo schedule',
        data: null,
      })
    }
  }

  private deleteDemoSchedule = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const scheduleId = req.query;

      // Assuming you have a service method called 'deleteUserById' in your userService
      const demoScheduleDeleted = await this.demoScheduleService.deleteDemoSchedule(scheduleId);

      if (!demoScheduleDeleted) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting demo schedule',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo schedule deleted successfully',
        data:
          demoScheduleDeleted,
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while deleting demo schedule',
        data: null,
      })
    }
  }
}

export default DemoScheduleController