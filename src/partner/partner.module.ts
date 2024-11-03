import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PartnerController],
  providers: [PartnerService],
  imports: [PrismaModule],
})
export class PartnerModule {}
