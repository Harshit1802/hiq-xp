//import User from '@/models/user.model'
import IUser from '../interfaces/user.interface'
import User from '../schemas/user.schema'

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    const users = await User.find({}).sort({ "timestamp": -1 }).select('-password')
    return users
  }

  public async findById(id: any): Promise<IUser | null> {
    const user = await User.findById(id).select('-password')
    return user
  }

  public async findByUsername(username: string): Promise<IUser | null> {
    const user = await User.findOne({ username }).select('-password')
    return user
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email }).select('-password')
    return user
  }

  public async findByPhone(phone: string): Promise<IUser | null> {
    const user = await User.findOne({ phone }).select('-password')
    return user
  }

  public async findByIdWithPassword(id: string): Promise<IUser | null> {
    const user = await User.findById(id)
    return user
  }

  public async findByUsernameWithPassword(
    username: string,
  ): Promise<IUser | null> {
    const user = await User.findOne({ username })
    return user
  }

  public async findByEmailWithPassword(
    username: string,
  ): Promise<IUser | null> {
    //const user = await User.findOne({ email })
    const user = await User.findOne({
      $or: [
        { email: username },
        { username: username }
      ]
    });
    return user
  }

  public async findByPhoneWithPassword(
    phone: string,
  ): Promise<IUser | null> {
    const user = await User.findOne({ phone })
    return user
  }


  public async createUser(user: any): Promise<any> {
    const newUser = new User({
      username: user.username,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      dob: user.dob,
      gender: user.gender,
      email: user.email,
      emailConfirmed: user.emailConfirmed,
      password: user.password,
      phone: user.phone,
      phoneNumberConfirmed: user.phoneNumberConfirmed,
      lockOutTimeStamp: user.lockOutTimeStamp,
      IsLockout: user.IsLockout,
      accessFailedCount: user.accessFailedCount,
      address: user.address,
      lastPasswordResetDate: user.lastPasswordResetDate,
      agencyId: user.agencyId,
      isHippaAcknowledged: user.isHippaAcknowledged,
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
      isAdmin: user.isAdmin,
      isEnabled: user.isEnabled,
      isDeleted: user.isDeleted,
      isSuperUser: user.isSuperUser,
      isActive: user.isActive,
      timestamp: new Date(),
    })
    const savedUser = await newUser.save()
    return savedUser
  }
    // var savedUser;
    // try {
    //   savedUser =  newUser.save().then((res) => {
    //     console.log(res);
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // }
    // catch(ex: any) {
    //   var result = ex;
    // }
    // return savedUser

  public async updateUser(users: any, userId: any): Promise<any> {

    const updateUsers = await User.findByIdAndUpdate(
      userId,
      { $set: users },
      { "upsert": true }

    ).select({})
    return updateUsers;
  }

  public async deleteUser(userId: any): Promise<IUser | null> {
    const user = await User.findByIdAndDelete(userId).exec();
    return user
  }
}

export default UserRepository
