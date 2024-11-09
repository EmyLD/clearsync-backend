import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { IsNotEmpty } from 'class-validator';

class RegisterTokenDto {
  @IsNotEmpty()
  token: string;
}

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('register-token')
  async registerTokenForAll(@Body() body: RegisterTokenDto) {
    try {
      // Enregistrez le token de notification
      await this.notificationService.addPushTokenToAllPartners(body.token);

      // Envoyez une notification après l'enregistrement du token
      await this.notificationService.sendNotificationToAllPartners(
        'Enregistrement réussi',
        'Votre token de notification a été enregistré avec succès.',
        
      );

      return { message: 'Token registered for all partners successfully' };
    } catch (error) {
      console.error('Error registering token:', error);
      throw new HttpException(
        'An error occurred while registering the token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
