
import UserRepository from '../repositories/user.repository'
import UserSecurity from '../security/user.security'

class UserService {
  private userRepository: UserRepository
  private userSecurity: UserSecurity

  constructor() {
    this.userRepository = new UserRepository()
    this.userSecurity = new UserSecurity()
  }

  public comparePassword(password: string, encryptedPassword: string): boolean {
    return this.userSecurity.comparePassword(password, encryptedPassword)
  }

  public async findAll(): Promise<any> {
    const users = await this.userRepository.findAll()
    return users
  }

  public async findById(id: any): Promise<any> {
    const user = await this.userRepository.findById(id)
    return user
  }

  public async createUser(user: any): Promise<any> {
    const users = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      gender: user.gender,
      email: user.email,
      password: user.password,
      phone: user.phone,
      lockOutTimeStamp: user.lockOutTimeStamp,
      accessFailedCount: user.accessFailedCount,
      address: user.address,
      lastPasswordResetDate: user.lastPasswordResetDate,
      agencyId: user.agencyId,
      roles: user.roles,
      ssnNumber: user.ssnNumber,
      faxNumber: user.faxNumber,
      designation: user.designation,
      image: user.image,
      thumbnail: user.thumbnail,
      pinNumber: user.pinNumber,
      agencyBranchId: user.agencyBranchId,
      signature: user.signature,
      sequenceNo: user.sequenceNo,
      homePhoneNumber: user.homePhoneNumber,
    }
    const savedUser =   await this.userRepository.createUser(users);
    return savedUser
  }

  public async updateUser(user: any, userId: any): Promise<any> {

    const updateUser = await this.userRepository.updateUser(user, userId)
    return updateUser
  }

  public async deleteUser(userId: any): Promise<any> {
    const user = await this.userRepository.deleteUser(userId)
    return user
  }
}

export default UserService
