import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';
import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  public async login(@Body() loginDto: UserLoginDto): Promise<User> {
    const result = await this.usersService.validateUser(loginDto);
    if (!result) {
      this.logger.error(`Cannot login user, data: ${loginDto}`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('register')
  public async register(
    @Body() registerDto: UserRegisterDto,
  ): Promise<UserModel> {
    const result = await this.usersService.createUser(registerDto);
    if (!result) {
      this.logger.error(`Cannot register user, data: ${registerDto}`);
      throw new HttpException(
        'UnprocessableEntity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return result;
  }
}
