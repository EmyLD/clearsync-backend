import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthserviceModule } from './authservice/authservice.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { HostModule } from './host/host.module';
import { PartnerModule } from './partner/partner.module';
import { PrestationModule } from './prestation/prestation.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [SupabaseModule, AuthserviceModule, PrismaModule, HostModule, PartnerModule, PrestationModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
