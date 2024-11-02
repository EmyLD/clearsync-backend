import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule]
  
})
export class UserModule {}
