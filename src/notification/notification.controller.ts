import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('register-token')
  async registerTokenForAll(@Body() body: { token: string }) {
    // Enregistrez le token de notification
    await this.notificationService.addPushTokenToAllPartners(body.token);

    // Envoyez une notification après l'enregistrement du token
    await this.notificationService.sendNotificationToAllPartners(
      'Enregistrement réussi',
      'Votre token de notification a été enregistré avec succès.',
    );

    return { message: 'Token registered for all partners successfully' };
  }
}
