import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/schema/user.schema';
import { UserLoginDto } from 'src/user/dto/userLogin.dto';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signupValidation(createDto: UserDto): Promise<User | undefined | any> {
    const isUserExist = await this.userService.findAnUser(createDto.email);
    const message = {} as any;

    if (isUserExist) {
      throw new Error((message.name = 'User already exist'));
    } else if (createDto.email !== createDto.confirmEmail) {
      throw new Error('Emails are not matched');
    }

    //hash password
    const hashPassword = await bcrypt.hash(createDto.password, 12);
    createDto.password = hashPassword;

    return createDto;
  }

  async loginValidation(login: UserLoginDto): Promise<User | undefined | any> {
    const userFound = await this.userService.findAnUser(login.email);
    if (!userFound) {
      return;
    }

    //unhash password (compare password)
    const isPasswordCorrect = await bcrypt.compare(
      login.password,
      userFound.password,
    );

    if (!isPasswordCorrect) {
      return;
    }

    return userFound;
  }

  async login(dto: UserLoginDto) {
    const userFound = await this.userService.findAnUser(dto.email);

    const payload = { user: userFound.email, sub: userFound._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
