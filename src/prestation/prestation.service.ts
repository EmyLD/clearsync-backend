import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { NotificationService } from 'src/notification/notification.service';
import { log } from 'console';

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
        const airbnbInfo = await this.prisma.airbnbInfo.findUnique({
          where: { id: createPrestationDto.airbnbId },
        });
        console.log('Prestation créée avec succès:', airbnbInfo);
        const notificationBody = `
        Une nouvelle prestation est disponible !
        Adresse :  ${airbnbInfo.city} ${airbnbInfo.postalCode}
        Surface : ${airbnbInfo.surface} m²
        Nombre de pièces : ${airbnbInfo.nbrOfRoom}
        Prix : ${prestation.price} €
        Voir l'annonce : ${airbnbInfo.link}
      `;
        // Send notification if the prestation is created successfully
        const sendNotif =
          await this.notificationService.sendNotificationToAllPartners(
            'Nouvelle prestation', // Properly formatted parameters
            notificationBody,
            { prestationId: prestation.id }, // Properly formatted parameters
          );
        return { message: sendNotif, prestationId: prestation.id };
      } else {
        throw new Error(
          'Une erreur est survenue lors de la création de la prestation',
        );
      }
    } catch (error) {
      console.error('Erreur lors de la création de la prestation:', error);
      throw new HttpException(
        'Une erreur est survenue lors de la création de la prestation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findPrestationsByUserId(userId: number) {
    // Fetch all prestations for the user
    const prestations = await this.prisma.prestation.findMany({
      where: { userId: userId },
      include: {
        airbnb: true, // Include related Airbnb information
      },
    });
  
    // Separate prestations into completed and ongoing
    const completedPrestations = prestations
      .filter((prestation) => prestation.hasBeenDone)
      .map((prestation) => ({
        prestationDetails: {
          id: prestation.id,
          price: prestation.price,
          hasBeenDone: prestation.hasBeenDone,
          updatedAt: prestation.updatedAt,
        },
        airbnbDetails: {
          city: prestation.airbnb.city,
          postalCode: prestation.airbnb.postalCode,
          surface: prestation.airbnb.surface,
          nbrOfRoom: prestation.airbnb.nbrOfRoom,
          link: prestation.airbnb.link,
        },
      }));
  
    const ongoingPrestations = prestations
      .filter((prestation) => !prestation.hasBeenDone)
      .map((prestation) => ({
        prestationDetails: {
          id: prestation.id,
          price: prestation.price,
          hasBeenDone: prestation.hasBeenDone,
          updatedAt: prestation.updatedAt,
        },
        airbnbDetails: {
          city: prestation.airbnb.city,
          postalCode: prestation.airbnb.postalCode,
          surface: prestation.airbnb.surface,
          nbrOfRoom: prestation.airbnb.nbrOfRoom,
          link: prestation.airbnb.link,
        },
      }));
  
    console.log('Prestations formatées :', {
      completedPrestations,
      ongoingPrestations,
    });
  
    return {
      status: 'success',
      fetchedAt: new Date().toISOString(),
      completedPrestationCount: completedPrestations.length,
      ongoingPrestationCount: ongoingPrestations.length,
      completedPrestations,
      ongoingPrestations,
    };
  }
  async updatePrestation(id, userId) {
    try {
      const prestation = await this.prisma.prestation.update({
        where: { id },
        data: { userId: userId, isAvailable: false },
      });

      console.log('Prestation mise à jour avec succès:', prestation);
      return prestation;
    } catch (error) {
      console.error('Err≠eur lors de la mise à jour de la prestation:', error);
      throw new Error(
        'Une erreur est survenue lors de la mise à jour de la prestation.',
      );
    }
  }
}
