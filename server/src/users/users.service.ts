import { IUserService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserModel } from '@prisma/client';

@Injectable()
export class UsersService implements IUserService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly userRepository: UsersRepository) {}
  async createUser({
    email,
    firstName,
    lastName,
    nickName,
    password,
  }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new User(email, firstName, lastName, nickName);
    await newUser.setPassword(password);

    const expectedUser = await this.userRepository.find(email);
    if (expectedUser) {
      return null;
    }

    return this.userRepository.create(newUser);
  }

  async validateUser({ password, email }: UserLoginDto): Promise<User | null> {
    const existedUser = await this.userRepository.find(email);
    if (!existedUser) {
      return null;
    }
    const newUser = new User(
      existedUser.email,
      existedUser.firstName,
      existedUser.lastName,
      existedUser.nickName,
      existedUser.password,
    );

    return (await newUser.comparePassword(password)) ? newUser : null;
  }
}
