import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

import { Model } from 'mongoose';
import { UserLoginDto } from './dto/userLogin.dto';

import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    @Inject(forwardRef(() => AuthService))
    private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  //signup service
  async createSignup(createDto: UserDto): Promise<User | any> {
    const user = await this.authService.signupValidation(createDto);

    try {
      if (user) {
        const createUser = await this.userModel.create(user);
        return createUser.save();
      }
    } catch (error) {
      return error.message;
    }
  }

  //login service
  async findUserLogin(login: UserLoginDto): Promise<User | undefined | {}> {
    const user = await this.authService.loginValidation(login);
    return user;
  }

  async findAnUser(email: string): Promise<any> {
    return await this.userModel
      .findOne({ email: email })
      .select('_id email password');
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
