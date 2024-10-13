import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserJwtResponseDto } from './dto/jwt-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<UserResponseDto> {
    return this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<UserJwtResponseDto> {
    return this.userService.login(userDto);
  }
}
