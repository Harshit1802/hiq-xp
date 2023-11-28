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
import DemoRequestValidation from '../validations/demoRequest.validation';
import DemoRequestService from '../services/demoRequest.service';
import DocumentService from '../services/document.service';
import IDocument from '../interfaces/document.interface';


//Logger 
class DemoRequestController implements IController {
  public path: string
  public router: Router
  private authenticated: AuthenticatedMiddleware
  private validate: DemoRequestValidation
  private demoRequestService: DemoRequestService
  private documentService: DocumentService

  constructor() {
    this.path = Api.DEMOREQUEST;
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new DemoRequestValidation();
    this.demoRequestService = new DemoRequestService();
    this.documentService = new DocumentService();

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${Api.AGENCY_DEMOREQUEST}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.demoRequest),
      this.createDemoRequest,
    );
    this.router.get(
      `${this.path}${Api.AGENCY_DEMOREQUEST}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getDemoRequests,
    );
    this.router.put(
      `${this.path}${Api.AGENCY_DEMOREQUEST}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateDemoRequest,
    );
    this.router.delete(
      `${this.path}${Api.AGENCY_DEMOREQUEST}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteDemoRequest,
    );

    this.router.post(
      `${this.path}${Api.UPLOAD_NDA}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.uploadNda,
    );

    this.router.get(
      `${this.path}${Api.DOWNLOAD_NDA}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.downloadNda,
    );
    // this.router.post(
    //   `${this.path}${Api.DEMO_SCHEDULE}`,
    //   this.authenticated.verifyTokenAndAuthorization,
    //   // validationMiddleware(this.validate.demoRequest),
    //   this.scheduleDemoRequest,
    // );

  }

  private updateDemoRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const agencyId = req.query;
      const demoRequest = req.body;
      const agency = await this.demoRequestService.updateDemoRequest(demoRequest, agencyId.toString())
      if (!agency) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating demo request',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo request updated successfully',
        data:
          agency
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while updating demo request',
        data: null,
      })
    }
  }

  private getDemoRequests = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.params

      const demoRequestList = await this.demoRequestService.getDemoRequests()
      if (!demoRequestList) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching demo request',
          data: null,
        })
      }
      demoRequestList.forEach(element => {
  element.isNDAUploaded = element.demoRequestNdaDocument && element.demoRequestNdaDocument.length > 0 ? true : false;
});
      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo request fetched successfully',
        data: demoRequestList,
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while fetching demo request',
        data: null,
      })
    }
  }

  private uploadNda = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body
      let files: IDocument[] = [];
      obj.uploadedFiles.forEach(element => {
        files.push({

          moduleName: obj.moduleName,
          name: element.name,
          type: element.type,
          fileData: '',
          size: element.size,
          base64String: element.base64String,
          lastModifiedDate: element.lastModifiedDate

        } as IDocument);
      });
      const doc = await this.documentService.createDocument(files);
      if (doc && doc.length > 0) {

        const uploadNda = await this.demoRequestService.updateDemoRequestDocument(doc[0].id, obj.demoRequestId);
        if (!uploadNda) {
          res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: {
              code: HttpCode.INTERNAL_SERVER_ERROR,
              msg: HttpMessage.INTERNAL_SERVER_ERROR,
            },
            msg: 'Error occured while uploading NDA document',
            data: null,
          })
        }
        return res.status(HttpCode.OK).json({
          status: {
            code: HttpCode.OK,
            msg: HttpMessage.OK,
          },
          msg: 'NDA uploaded successfully',
          data:
            uploadNda
        })
      }
    }
    catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while uploading NDA document',
        data: null,
      })
    }
  }

  private downloadNda = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const demoRequestId = req.query;
      const documentId = await this.demoRequestService.getDocumentIdByDemoRequestId(demoRequestId._id.toString());
       const document = await this.documentService.getDocumentById(documentId.demoRequestNdaDocument.toString());

      if (!document) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while downloading NDA document',
          data: null,
        })
      }
        return res.status(HttpCode.OK).json({
          status: {
            code: HttpCode.OK,
            msg: HttpMessage.OK,
          },
          msg: 'Download successfully',
          data: document
        })
    }
      catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while downloading NDA document',
        data: null,
      })
    }
  }

  private createDemoRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body

      // const postalCodeValidated = this.validate.validatePostalCode(obj.postalCode)
      // if (!postalCodeValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.ADDRESS_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`address ${obj.postalCode} is valid`)

      // const emailValidated = this.validate.validateEmail(obj.email)
      // if (!emailValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.ADDRESS_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`address ${obj.email} is valid`)

      // const websiteValidated = this.validate.validateWebsite(obj.website)
      // if (!websiteValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.ADDRESS_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`address ${obj.website} is valid`)

      const params = obj;

      const response = await this.demoRequestService.createDemoRequest(params)
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving demo request',
          data: null,
        })
      }
      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Demo request Created successfully',
        data: response,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while saving demo request',
        data: null,
      })
    }
  }

  private deleteDemoRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const agencyId = req.query;

      // Assuming you have a service method called 'deleteUserById' in your userService
      const demoRequestDeleted = await this.demoRequestService.deleteDemoRequest(agencyId);

      if (!demoRequestDeleted) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting demo request',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo request deleted successfully',
        data: {
          demoRequestDeleted,
        },
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while deleting demo request',
        data: null,
      })
    }
  }
}

export default DemoRequestController