import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
