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
import RolesValidation from '../validations/roles.validation';
import RolesService from '../services/roles.service';

class RolesController implements IController {
  public path: string
  public router: Router
  private authenticated: AuthenticatedMiddleware
  private validate: RolesValidation
  private rolesService: RolesService

  constructor() {
    this.path = Api.ROLE;
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new RolesValidation();
    this.rolesService = new RolesService();

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${Api.ROLES_API}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.roles),
      this.createRoles,
    )
    this.router.get(
      `${this.path}${Api.ROLES_API}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getRoles,
    )
    this.router.put(
      `${this.path}${Api.ROLES_API}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateRoles,
    )
    this.router.delete(
      `${this.path}${Api.ROLES_API}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteRoles,
    )
  }

  private updateRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const roleId = req.query;
      const roles = req.body;
      const role = await this.rolesService.updateRoles(roles, roleId)
      if (!role) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating roles',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Roles updated successfully',
        data:
          role
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while updating roles',
        data: null,
      })
    }
  }

  private getRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.params

      const role = await this.rolesService.getRoles()
      if (!role) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching roles',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Roles fetched successfully',
        data: role,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while fetching roles',
        data: null,
      })
    }
  }

  private createRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body
      const params = obj;

      const response = await this.rolesService.createRoles(params)
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving roles',
          data: null,
        })
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Roles created successfully',
        data: response,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while saving roles',
        data: null,
      })
    }
  }

  private deleteRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const roleId = req.query;

      // Assuming you have a service method called 'deleteUserById' in your userService
      const deleteRoles = await this.rolesService.deleteRoles(roleId);

      if (!deleteRoles) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting roles',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Roles deleted successfully',
        data:
          deleteRoles,
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while deleting roles',
        data: null,
      })
    }
  }
}
export default RolesController
