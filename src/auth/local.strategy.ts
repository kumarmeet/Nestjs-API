import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserLoginDto } from 'src/user/dto/userLogin.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(dto: UserLoginDto): Promise<any> {
    const user = await this.authService.loginValidation(dto);

    if (!user) {
      console.log('wrong');

      throw new UnauthorizedException();
    }

    return user;
  }
}
