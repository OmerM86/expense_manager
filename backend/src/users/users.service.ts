import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from './dto/user-response.dto';
import { UserJwtResponseDto } from './dto/jwt-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async isExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email: email });
    return !!user;
  }

  async findOne(uuid: number): Promise<Users> {
    return await this.userRepository.findOne({ where: { uuid: uuid } });
  }

  async register(userDto: UserDto): Promise<UserResponseDto> {
    if (await this.isExist(userDto.email)) {
      throw new BadRequestException({
        message: ['user already exists'],
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const user = this.userRepository.create({
      email: userDto.email,
      password: bcrypt.hashSync(userDto.password, bcrypt.genSaltSync(10)),
      username: userDto.email.split('@')[0],
    });

    try {
      const userinfo = await this.userRepository.save(user);
      const { password, ...response } = userinfo;
      return new UserResponseDto(response);
    } catch {
      throw new InternalServerErrorException({
        message: ['failed to save user'],
        error: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async login(userDto: UserDto): Promise<UserJwtResponseDto> {
    const user = await this.userRepository.findOneBy({ email: userDto.email });

    if (user && bcrypt.compareSync(userDto.password, user.password)) {
      const { password, ...payload } = user;
      const token = this.jwtService.sign(payload);
      const response = new UserResponseDto(payload);
      return new UserJwtResponseDto({ user: response, accessToken: token });
    } else {
      throw new BadRequestException({
        message: ["user doesn't exists"],
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
