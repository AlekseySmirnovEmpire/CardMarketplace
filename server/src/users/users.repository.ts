import { IUserRepository } from './user.repository.interface';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create({
    email,
    password,
    firstName,
    nickName,
    lastName,
  }: User): Promise<UserModel> {
    return this.prismaService.client.userModel.create({
      data: {
        firstName,
        lastName,
        nickName,
        email,
        password,
      },
    });
  }

  find(email: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
