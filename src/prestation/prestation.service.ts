import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class PrestationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService, // Proper injection of NotificationService
  ) {}

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
        // Send notification if the prestation is created successfully
        await this.notificationService.sendNotificationToAllPartners(
          'Nouvelle prestation',
          'Une nouvelle prestation est disponible',
        );
        console.log('Notification envoyée');
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

  async findPrestationsByUserId(userId: number) {
    // Recherche du PartnerInfo associé à cet userId
    const partnerInfo = await this.prisma.partnerInfo.findFirst({
      where: { userId: userId },
    });

    // Si aucun PartnerInfo n'est trouvé, retourner une erreur
    if (!partnerInfo) {
      throw new NotFoundException(
        `Aucun partenaire associé trouvé pour cet utilisateur`,
      );
    }

    // Récupération des prestations associées au PartnerInfo trouvé
    const prestations = await this.prisma.prestation.findMany({
      where: { partnerId: partnerInfo.id },
      include: {
        airbnb: true, // inclure les informations AirbnbInfo associées
      },
    });

    return prestations;
  }
}
