import { Module } from '@nestjs/common';
import { UploadService } from './uploads.service';
import { UploadController } from './uploads.controller';
import { PrismaService } from '../../databases/prisma.database';

@Module({
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
