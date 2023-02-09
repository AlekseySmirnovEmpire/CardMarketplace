import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private readonly logger = new Logger(PrismaService.name);
  client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('Connect to prisma SUCCESS');
    } catch (ex) {
      if (ex instanceof Error) {
        this.logger.error(
          `Prisma service connection FAILED, error: '${ex.message}'`,
        );
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    this.logger.log('Disconnected from prisma!');
  }
}
