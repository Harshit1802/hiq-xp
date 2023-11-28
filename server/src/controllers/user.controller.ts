import { Router, Request, Response, NextFunction } from 'express'



//import Validate from '@/validations/user.validation'


import HttpException from '../utils/exceptions/http.exception'


// http constant
import IController from '../interfaces/controller.interface'
import logger from '../utils/logger.utils'
import Api from '../constants/api'
import HttpMessage from '../constants/http-message'
import HttpCode from '../constants/http-code'
import Message from '../constants/message'
import validationMiddleware from '../middlewares/validation.middleware'
import AuthenticatedMiddleware from '../middlewares/authenticated.middleware'
import UserService from '../services/user.service'
import UserValidation from '../validations/user.validation'

// logger

class UserController implements IController {
  public path: string
  public router: Router
  private userService: UserService
  private authenticated: AuthenticatedMiddleware
  private validate: UserValidation

  constructor() {
    this.path = Api.USERS
    this.router = Router()
    this.userService = new UserService()
    this.authenticated = new AuthenticatedMiddleware()
    this.validate = new UserValidation()

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${Api.USERS_CREATEUSERS}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.register),
      this.createUser,
    )

    this.router.put(
      `${this.path}${Api.USERS_CREATEUSERS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateUser,
    )

    this.router.get(
      `${this.path}${Api.USER_GET}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getUser,
    )

    this.router.get(
      `${this.path}${Api.USER_GET_ALL}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getAllUsers,
    )

    this.router.delete(
      `${this.path}${Api.USERS_CREATEUSERS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteUser,
    )
  }

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body

      // const userNameValidated = this.validate.validateUsername(obj.username)
      // if (!userNameValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.USERNAME_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`username ${obj.username} is valid`)

      // const emailValidated = this.validate.validateEmail(obj.email)
      // if (!emailValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.NAME_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`name ${obj.email} is valid`)

      // const passwordValidated = this.validate.validatePassword(obj.password)
      // if (!passwordValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.EMAIL_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`email ${obj.password} is valid`)

      // const phoneValidated = this.validate.validatePhone(obj.phone)
      // if (!phoneValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.PHONE_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`phone ${obj.phone} is valid`)

      // const pinNumberValidated = this.validate.validatePinNumber(obj.pinNumber)
      // if (!pinNumberValidated) {
      //   return next(
      //     new HttpException(
      //       HttpCode.CONFLICT,
      //       HttpMessage.CONFLICT,
      //       Message.ADDRESS_NOT_VALID,
      //     ),
      //   )
      // }
      // logger.info(`address ${obj.pinNumber} is valid`)

      const params = obj;

      const response = await this.userService.createUser(params)
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving user',
          data: null,
        })
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: Message.USER_CREATE_SUCCESS,
        data: response,
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while saving user',
        data: null
      })
    }
  }

  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const users = req.body
      const userId = req.query

      const user = await this.userService.updateUser(users, userId)
      if (!user) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating user',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: Message.USER_FOUND,
        data:
          user
      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while updating user',
        data: null,
      })
    }
  }

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { userId } = req.query

      const user = await this.userService.findById(userId)
      if (!user) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching user',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: Message.USER_FOUND,
        data:
          user,

      })
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while fetching user',
        data: null,
      })
    }
  }

  private getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const users = await this.userService.findAll()
      if (!users) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching user',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: Message.USER_FOUND,
        data: users,
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while fetching user',
        data: null,
      })
    }
  }

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const userId = req.query;

      // Assuming you have a service method called 'deleteUserById' in your userService
      const deletedUser = await this.userService.deleteUser(userId);

      if (!deletedUser) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting user',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: Message.USER_FOUND,
        data: {
          user: deletedUser,
        },
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while deleting user',
        data: null,
      })
    }
  }
}

export default UserController
