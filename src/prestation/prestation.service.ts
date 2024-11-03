import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { NotificationService } from 'src/notification/notification.service';
import { title } from 'process';

@Injectable()
export class PrestationsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly notificationService: NotificationService; // Injection du service de notification

  async create(createPrestationDto: CreatePrestationDto) {
    try {
      const prestation = await this.prisma.prestation.create({
        data: {
          hostId: createPrestationDto.hostId,
          partnerId: createPrestationDto.partnerId,
          airbnbId: createPrestationDto.airbnbId,
          description: createPrestationDto.description,
          price: createPrestationDto.price,
        },
      });

      if (prestation) {
        // Envoi de la notification
        await this.notificationService.sendNotificationToAllPartners(
          'Nouvelle prestation',
          'Une nouvelle prestation est disponible'
        );
      } else {
        throw new Error(
          'Une erreur est survenue lors de la création de la prestation',
        );
      }
      return prestation;
    } catch (error) {
      console.error('Erreur lors de la création de la prestation:', error);
      throw new HttpException(
        'Une erreur est survenue lors de la création de la prestation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
