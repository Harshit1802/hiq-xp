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
import PatientPcpDetailsValidation from '../validations/patientPcpDetails.validation';
import PatientPcpDetailsService from '../services/patientPcpDetails.service';

//Logger 
class PatientPcpDetailsController implements IController {
    public path: string
    public router: Router
    private authenticated: AuthenticatedMiddleware
    private validate: PatientPcpDetailsValidation
    private patientPcpDetailsService: PatientPcpDetailsService

    constructor() {
        this.path = Api.PATIENT_PCPDETAILS;
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientPcpDetailsValidation();
        this.patientPcpDetailsService = new PatientPcpDetailsService();

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${Api.PCP_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.pcpDetails),
            this.createPcpDetails,
        )
        this.router.get(
            `${this.path}${Api.PCP_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.getPcpDetails,
        )
        this.router.put(
            `${this.path}${Api.PCP_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.updatePcpDetails,
        )
        this.router.delete(
            `${this.path}${Api.PCP_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deletePcpDetails,
        )
    }

    private updatePcpDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const pcpDetailsId = req.query;
            const pcpDetails = req.body;
            const pcpDetail = await this.patientPcpDetailsService.updatePcpDetails(pcpDetails, pcpDetailsId)
            if (!pcpDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating pcp details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Pcp details updated successfully',
                data:
                    pcpDetail
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while updating pcp details',
                data: null,
            })
        }
    }

    private getPcpDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.params

            const pcpDetail = await this.patientPcpDetailsService.getPcpDetails()
            if (!pcpDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching pcp details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Pcp details fetched successfully',
                data: pcpDetail,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while fetching pcp details',
                data: null,
            })
        }
    }

    private createPcpDetails = async (
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

            const primaryCareProviderIdValidated = this.validate.validatePrimaryCareProviderId(obj.primaryCareProviderId)
            if (!primaryCareProviderIdValidated) {
                return next(
                    new HttpException(
                        HttpCode.CONFLICT,
                        HttpMessage.CONFLICT,
                        Message.NAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`name ${obj.primaryCareProviderId} is valid`)

            const params = obj;

            const response = await this.patientPcpDetailsService.createPcpDetails(params)
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving pcp details',
                    data: null,
                })
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Pcp details created successfully',
                data: response,
            })
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while saving pcp details',
                data: null,
            })
        }
    }

    private deletePcpDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const pcpDetailsId = req.query;

            const pcpDetailsDeleted = await this.patientPcpDetailsService.deletePcpDetails(pcpDetailsId);

            if (!pcpDetailsDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting pcp details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Pcp details deleted successfully',
                data: {
                    pcpDetailsDeleted,
                },
            });
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while deleting pcp details',
                data: null,
            })
        }
    }
}
export default PatientPcpDetailsController