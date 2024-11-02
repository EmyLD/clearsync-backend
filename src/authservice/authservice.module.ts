import { Module } from '@nestjs/common';
import { AuthService } from './authservice.service';
import { AuthController } from './authservice.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule, // Ajoutez ce module ici
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret', // Ajoutez votre clé secrète
      signOptions: { expiresIn: '1h' }, // Options de signature du JWT
    }),
    PrismaModule,
  ],
})
export class AuthserviceModule {}
