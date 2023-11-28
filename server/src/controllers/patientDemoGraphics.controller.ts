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
import PatientDemoGraphicsValidation from '../validations/patientDemoGraphics.validation';
import PatientDemoGraphicsService from '../services/patientDemoGraphics.service';


//Logger 
class PatientDemoGraphicsController implements IController {
    public path: string
    public router: Router
    private authenticated: AuthenticatedMiddleware
    private validate: PatientDemoGraphicsValidation
    private patientDemoGraphicsService: PatientDemoGraphicsService

    constructor() {
        this.path = Api.PATIENT_DEMOGRAPHICS;
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientDemoGraphicsValidation();
        this.patientDemoGraphicsService = new PatientDemoGraphicsService();

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${Api.DEMO_GRAPHICS}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.demoGraphics),
            this.createDemoGraphics,
        )
        this.router.get(
            `${this.path}${Api.DEMO_GRAPHICS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.getDemoGraphics,
        )
        this.router.put(
            `${this.path}${Api.DEMO_GRAPHICS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.updateDemoGraphics,
        )
        this.router.delete(
            `${this.path}${Api.DEMO_GRAPHICS}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteDemoGraphics,
        )
    }

    private updateDemoGraphics = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const graphicsId = req.query;
            const demoGraphics = req.body;
            const graphics = await this.patientDemoGraphicsService.updateDemoGraphics(demoGraphics, graphicsId)
            if (!graphics) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating patient demo graphics',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient demo graphics updated successfully',
                data:
                    graphics
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while updating patient demo graphics',
                data: null,
            })
        }
    }

    private getDemoGraphics = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.params

            const graphics = await this.patientDemoGraphicsService.getDemoGraphics()
            if (!graphics) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching patient demo graphics',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient demo graphics fetched successfully',
                data: graphics,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while fetching patient demo graphics',
                data: null,
            })
        }
    }

    private createDemoGraphics = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body

            const primaryContactNumberValidated = this.validate.validatePrimaryContactNumber(obj.primaryContactNumber)
            if (!primaryContactNumberValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${obj.primaryContactNumber} is valid`)

            const secondaryContactNumberValidated = this.validate.validateSecondaryContactNumber(obj.secondaryContactNumber)
            if (!secondaryContactNumberValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.NAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`name ${obj.secondaryContactNumber} is valid`)

            const emailValidated = this.validate.validateEmail(obj.email)
            if (!emailValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.EMAIL_NOT_VALID,
                    ),
                )
            }
            logger.info(`email ${obj.email} is valid`)

            const patientImageUrlValidated = this.validate.validatePatientImageUrl(obj.patientImageUrl)
            if (!patientImageUrlValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.PASSWORD_NOT_VALID,
                    ),
                )
            }
            logger.info(`password ${obj.patientImageUrl} is valid`)

            const params = obj;

            const response = await this.patientDemoGraphicsService.createDemoGraphics(params)
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving patient demo graphics',
                    data: null,
                })
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Patient demo graphics created successfully',
                data: response,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while saving patient demo graphics',
                data: null,
            })
        }
    }

    private deleteDemoGraphics = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const graphicsId = req.query;

            const demoGraphicsDeleted = await this.patientDemoGraphicsService.deleteDemoGraphics(graphicsId);

            if (!demoGraphicsDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting patient demo graphics',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient demo graphics deleted successfully',
                data: {
                    demoGraphicsDeleted,
                },
            });
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while deleting patient demo graphics',
                data: null,
            })
        }
    }
}
export default PatientDemoGraphicsController