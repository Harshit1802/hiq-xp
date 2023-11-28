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
import PatientOtherDetailsValidation from '../validations/patientOtherDetails.validation';
import PatientOtherDetailsService from '../services/patientOtherDetails.service';

//Logger 
class PatientOtherDetailsController implements IController {
    public path: string
    public router: Router
    private authenticated: AuthenticatedMiddleware
    private validate: PatientOtherDetailsValidation
    private patientOtherDetailsService: PatientOtherDetailsService

    constructor() {
        this.path = Api.PATIENT_OTHERDETAILS;
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientOtherDetailsValidation();
        this.patientOtherDetailsService = new PatientOtherDetailsService();

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${Api.OTHER_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.otherDetails),
            this.createOtherDetails,
        )
        this.router.get(
            `${this.path}${Api.OTHER_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.getOtherDetails,
        )
        this.router.put(
            `${this.path}${Api.OTHER_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.updateOtherDetails,
        )
        this.router.delete(
            `${this.path}${Api.OTHER_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteOtherDetails,
        )
    }

    private updateOtherDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const otherDetailsId = req.query;
            const otherDetails = req.body;
            const otherDetail = await this.patientOtherDetailsService.updateOtherDetails(otherDetails, otherDetailsId)
            if (!otherDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating patient other details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient other details updated successfully',
                data:
                    otherDetail
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while updating patient other details',
                data: null,
            })
        }
    }

    private getOtherDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.params

            const otherDetail = await this.patientOtherDetailsService.getOtherDetails()
            if (!otherDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching patient other details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient other details fetched successfully',
                data: otherDetail,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while fetching patient other details',
                data: null,
            })
        }
    }

    private createOtherDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body

            const languageIdValidated = this.validate.validateLanguageId(obj.languageId)
            if (!languageIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${obj.languageId} is valid`)

            const communicationNeedIdValidated = this.validate.validateCommunicationNeedId(obj.communicationNeedId)
            if (!communicationNeedIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${obj.communicationNeedId} is valid`)

            const triageCodeIdValidated = this.validate.validateTriageCodeId(obj.triageCodeId)
            if (!triageCodeIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${obj.triageCodeId} is valid`)

            const precautionIdValidated = this.validate.validateprecautionId(obj.precautionId)
            if (!precautionIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${obj.precautionId} is valid`)

            const hospitalRiskProfileIdValidated = this.validate.validateHospitalRiskProfileId(obj.hospitalRiskProfileId)
            if (!hospitalRiskProfileIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${obj.hospitalRiskProfileId} is valid`)

            const patientDemographicIdValidated = this.validate.validatePatientDemographicId(obj.patientDemographicId)
            if (!patientDemographicIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${obj.patientDemographicId} is valid`)

            const params = obj;

            const response = await this.patientOtherDetailsService.createOtherDetails(params)
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving patient other details',
                    data: null,
                })
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Patient other details created successfully',
                data: response,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while saving patient other details',
                data: null,
            })
        }
    }

    private deleteOtherDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const otherDetailsId = req.query;

            const otherDetailsDeleted = await this.patientOtherDetailsService.deleteOtherDetails(otherDetailsId);

            if (!otherDetailsDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting patient other details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient other details deleted successfully',
                data: {
                    otherDetailsDeleted,
                },
            });
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while deleting patient other details',
                data: null,
            })
        }
    }
}
export default PatientOtherDetailsController