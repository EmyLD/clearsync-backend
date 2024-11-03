import { Module } from '@nestjs/common';
import { PrestationsService } from './prestation.service';
import { PrestationsController } from './prestation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [PrestationsController],
  imports: [PrismaModule],
  providers: [PrestationsService, PrismaService, NotificationService],
})
export class PrestationModule {}
