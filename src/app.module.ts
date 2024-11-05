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
import { NotificationService } from './notification/notification.service';
import { PrestationsService } from './prestation/prestation.service';
import { PrismaService } from './prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SupabaseModule,
    AuthserviceModule,
    PrismaModule,
    HostModule,
    PartnerModule,
    PrestationModule,
    NotificationModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrestationsService,
    PrismaService,
    NotificationService,
  ],
})
export class AppModule {}
