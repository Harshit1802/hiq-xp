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
import PatientReferralDetailsValidation from '../validations/patientReferralDetails.validation';
import PatientReferralDetailsService from '../services/patientReferralDetails.service';

//Logger 
class PatientReferralDetailsController implements IController {
    public path: string
    public router: Router
    private authenticated: AuthenticatedMiddleware
    private validate: PatientReferralDetailsValidation
    private patientReferralDetailsService: PatientReferralDetailsService

    constructor() {
        this.path = Api.PATIENT_REFERRALDETAILS;
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientReferralDetailsValidation();
        this.patientReferralDetailsService = new PatientReferralDetailsService();

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${Api.REFERRAL_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.referralDetails),
            this.createReferralDetails,
        )
        this.router.get(
            `${this.path}${Api.REFERRAL_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.getReferralDetails,
        )
        this.router.put(
            `${this.path}${Api.REFERRAL_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.updateReferralDetails,
        )
        this.router.delete(
            `${this.path}${Api.REFERRAL_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteReferralDetails,
        )
    }

    private updateReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const referralDetailsId = req.query;
            const referralDetails = req.body;
            const referralDetail = await this.patientReferralDetailsService.updateReferralDetails(referralDetails, referralDetailsId)
            if (!referralDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating patient referral details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient referral details updated successfully',
                data:
                    referralDetail
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while updating patient referral details',
                data: null,
            })
        }
    }

    private getReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.params

            const referralDetail = await this.patientReferralDetailsService.getReferralDetails()
            if (!referralDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching patient referral details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient referral details fetched successfully',
                data: referralDetail,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while fetching patient referral details',
                data: null,
            })
        }
    }

    private createReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body

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

            const referralSourceIdValidated = this.validate.validateReferralSourceId(obj.referralSourceId)
            if (!referralSourceIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.NAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`name ${obj.referralSourceId} is valid`)

            const referralIdValidated = this.validate.validateReferralId(obj.referralId)
            if (!referralIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.EMAIL_NOT_VALID,
                    ),
                )
            }
            logger.info(`email ${obj.referralId} is valid`)

            const medicarePhysicianPhoneValidated = this.validate.validateMedicarePhysicianPhone(obj.medicarePhysicianPhone)
            if (!medicarePhysicianPhoneValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.PASSWORD_NOT_VALID,
                    ),
                )
            }
            logger.info(`password ${obj.medicarePhysicianPhone} is valid`)

            const physcianReferralIdValidated = this.validate.validatePhyscianReferralId(obj.physcianReferralId)
            if (!physcianReferralIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.PASSWORD_NOT_VALID,
                    ),
                )
            }
            logger.info(`password ${obj.physcianReferralId} is valid`)

            const params = obj;

            const response = await this.patientReferralDetailsService.createReferralDetails(params)
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving patient referral details',
                    data: null,
                })
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Patient referral details created successfully',
                data: response,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while saving patient referral details',
                data: null,
            })
        }
    }

    private deleteReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const referralDetailsId = req.query;

            const referralDetailDeleted = await this.patientReferralDetailsService.deleteReferralDetails(referralDetailsId);

            if (!referralDetailDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting patient referral details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient referral details deleted successfully',
                data: {
                    referralDetailDeleted,
                },
            });
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while deleting patient referral details',
                data: null,
            })
        }
    }
}

export default PatientReferralDetailsController