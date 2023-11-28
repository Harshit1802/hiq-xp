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
import DocumentValidation from '../validations/document.validation';
import DocumentService from '../services/document.service';


class DocumentController implements IController {
  public path: string
  public router: Router
  private authenticated: AuthenticatedMiddleware
  private validate: DocumentValidation
  private documentService: DocumentService

  constructor() {
    this.path = Api.DOCUMENT;
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new DocumentValidation();
    this.documentService = new DocumentService();

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${Api.NDA_DOCUMENT}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.document),
      this.createDocument,
    )
    this.router.get(
      `${this.path}${Api.NDA_DOCUMENT}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getDocument,
    )
    this.router.put(
      `${this.path}${Api.NDA_DOCUMENT}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateDocument,
    )
    this.router.delete(
      `${this.path}${Api.NDA_DOCUMENT}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteDocument,
    )
  }

  private updateDocument = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const documentId = req.query;
      const document = req.body;
      const documents = await this.documentService.updateDocument(document, documentId)
      if (!documents) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating document',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Document updated successfully',
        data:
          documents
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while updating document',
        data: null,
      })
    }
  }

  private getDocument = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.params

      const documents = await this.documentService.getDocument()
      if (!documents) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching document',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Document fetched successfully',
        data: documents,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while fetching document',
        data: null,
      })
    }
  }

  private createDocument = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body

      const moduleNameValidated = this.validate.validateModuleName(obj.moduleName)
      if (!moduleNameValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.USERNAME_NOT_VALID,
          ),
        )
      }
      logger.info(`username ${obj.moduleName} is valid`)

      const nameValidated = this.validate.validateName(obj.name)
      if (!nameValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.EMAIL_NOT_VALID,
          ),
        )
      }
      logger.info(`email ${obj.name} is valid`)

      const base64StringValidated = this.validate.validateBase64String(obj.base64String)
      if (!base64StringValidated) {
        return next(
          new HttpException(
            HttpCode.CONFLICT,
            HttpMessage.CONFLICT,
            Message.EMAIL_NOT_VALID,
          ),
        )
      }
      logger.info(`email ${obj.base64String} is valid`)

      const params = obj;
      const response = await this.documentService.createDocument(params)
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving document',
          data: null,
        })
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Document created successfully',
        data: response,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while saving document',
        data: null,
      })
    }
  }

  private deleteDocument = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const documentId = req.query;

      // Assuming you have a service method called 'deleteUserById' in your userService
      const documentDeleted = await this.documentService.deleteDocument(documentId);

      if (!documentDeleted) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting document',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Document deleted successfully',
        data:
          documentDeleted,
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while deleting document',
        data: null,
      })
    }
  }
}

export default DocumentController