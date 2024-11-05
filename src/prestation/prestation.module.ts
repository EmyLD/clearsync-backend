import { Module } from '@nestjs/common';
import { PrestationsService } from './prestation.service';
import { PrestationsController } from './prestation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  controllers: [PrestationsController],
  imports: [PrismaModule, NotificationModule],
  providers: [PrestationsService, PrismaService],
})
export class PrestationModule {}
