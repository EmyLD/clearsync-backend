import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthserviceModule } from './authservice/authservice.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';

@Module({
  imports: [SupabaseModule, AuthserviceModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
