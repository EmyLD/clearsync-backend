import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [HostController],
  providers: [HostService],
  imports: [PrismaModule, HttpModule],
})
export class HostModule {}
