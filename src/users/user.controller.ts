import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

type dto = {
  name: string;
  age: number;
};

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async addUser(@Body() dto: dto) {
    await this.userService.create(dto);
  }

  @Get()
  async find() {
    const result = await this.userService.findAll();
    return result;
  }
}
