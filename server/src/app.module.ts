import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './users/users.repository';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, UsersService, UsersRepository],
})
export class AppModule {}
