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
import DemoFeedbackValidation from '../validations/demoFeedback.validation';
import DemoFeedbackService from '../services/demoFeedback.service';

class DemoFeedbackController implements IController {
    public path: string
    public router: Router
    private authenticated: AuthenticatedMiddleware
    private validate: DemoFeedbackValidation
    private demoFeedbackService: DemoFeedbackService

    constructor() {
        this.path = Api.FEEDBACK;
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new DemoFeedbackValidation();
        this.demoFeedbackService = new DemoFeedbackService();

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${Api.DEMO_FEEDBACK}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.demoFeedback),
            this.createDemoFeedback,
        )
        this.router.get(
            `${this.path}${Api.DEMO_FEEDBACK}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getDemoFeedback,
        )
        this.router.put(
            `${this.path}${Api.DEMO_FEEDBACK}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateDemoFeedback,
        )
        this.router.delete(
            `${this.path}${Api.DEMO_FEEDBACK}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteDemoFeedback,
        )
    }

    private updateDemoFeedback = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const feedbackId = req.query;
            const demoFeedback = req.body;
            const feedback = await this.demoFeedbackService.updateDemoFeedback(demoFeedback, feedbackId)
            if (!feedback) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating demo feedback',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Demo feedback updated successfully',
                data:
                    feedback
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while updating demo feedback',
                data: null,
            })
        }
    }

    private getDemoFeedback = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.params

            const feedback = await this.demoFeedbackService.getDemoFeedback()
            if (!feedback) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching demo feedback',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Demo feedback fetched successfully',
                data: feedback,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while fetching demo feedback',
                data: null,
            })
        }
    }

    private createDemoFeedback = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body

            const demoScheduleIdValidated = this.validate.validateDemoScheduleId(obj.demoScheduleId)
            if (!demoScheduleIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${obj.demoScheduleId} is valid`)

            const params = obj;

            const response = await this.demoFeedbackService.createDemoFeedback(params)
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving demo feedback',
                    data: null,
                })
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Demo feedback Created successfully',
                data: response,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while saving demo feedback',
                data: null,
            })
        }
    }

    private deleteDemoFeedback = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const feedbackId = req.query;

            // Assuming you have a service method called 'deleteUserById' in your userService
            const demoFeedbackDeleted = await this.demoFeedbackService.deleteDemoFeedback(feedbackId);

            if (!demoFeedbackDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting demo feedback',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Demo feedback deleted successfully',
                data:
                    demoFeedbackDeleted,
            });
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while deleting demo feedback',
                data: null,
            })
        }
    }
}

export default DemoFeedbackController