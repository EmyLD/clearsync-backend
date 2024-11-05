import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NotificationController],
  imports: [PrismaModule],
  exports: [NotificationService],
  providers: [NotificationService, PrismaService],
})
export class NotificationModule {}
