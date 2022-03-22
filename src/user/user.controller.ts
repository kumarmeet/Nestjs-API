import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGaurd } from 'src/auth/local-auth.gaurd';
import { UserService } from './user.service';

type signUpDto = {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
};

type loginDto = {
  email: string;
  password: string;
};

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  //signup
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Body() dto: signUpDto) {
    try {
      await this.userService.createSignup(dto);
    } catch (error) {
      return error.message;
    }

    return { message: 'Signed up successully' };
  }

  //login
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async logIn(@Body() dto: loginDto) {
    const isUserExist = await this.userService.findUserLogin(dto);

    return isUserExist;
  }

  @UseGuards(LocalAuthGaurd)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
