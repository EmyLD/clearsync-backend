// host/host.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CronExpression, Cron } from '@nestjs/schedule';

@Injectable()
export class HostService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(HostService.name);

  async addProperty(
    hostId: string,
    propertyData: Prisma.AirbnbInfoCreateInput,
  ) {
    const numericId = parseInt(hostId);
    return this.prisma.airbnbInfo.create({
      data: {
        user: {
          connect: { id: numericId }, // Utilisation de 'id' pour correspondre à la clé primaire du modèle User
        },
        ...propertyData,
      },
    });
  }

  async getPropertiesByHostId(hostId: number) {
    const properties = await this.prisma.airbnbInfo.findMany({
      where: {
        userId: hostId,
      },
    });

    if (!properties || properties.length === 0) {
      throw new NotFoundException('Aucun logement trouvé pour cet hôte.');
    }

    return properties;
  }

  async getCalendarLink(id: number): Promise<string> {
    const airbnbInfo = await this.prisma.airbnbInfo.findUnique({
      where: { id },
      select: { calendarlink: true },
    });

    if (!airbnbInfo) {
      this.logger.warn(`Aucune information trouvée pour l'Airbnb ID ${id}`);
      throw new Error('Aucune information trouvée pour cet ID.');
    }
    console.log(airbnbInfo.calendarlink);

    return airbnbInfo.calendarlink;
  }

  // Tâche planifiée pour mettre à jour régulièrement les liens de calendrier
  @Cron(CronExpression.EVERY_11_HOURS) // Exécute la tâche toutes les heures, ajustez selon vos besoins
  async updateCalendarLinks() {
    this.logger.log('Début de la mise à jour des liens de calendrier');

    // Récupération de tous les ID des propriétés Airbnb
    const airbnbProperties = await this.prisma.airbnbInfo.findMany({
      select: { id: true },
    });

    for (const property of airbnbProperties) {
      try {
        // Récupère et met à jour le lien du calendrier pour chaque propriété
        const calendarLink = await this.getCalendarLink(property.id);
        this.logger.log(
          `Lien de calendrier mis à jour pour l'Airbnb ID ${property.id}: ${calendarLink}`,
        );

        console.log(
          `Lien de calendrier mis à jour pour l'Airbnb ID ${property.id}: ${calendarLink}`,
        );
      } catch (error) {
        this.logger.error(
          `Erreur lors de la mise à jour du lien de calendrier pour l'Airbnb ID ${property.id}: ${error.message}`,
        );
      }
    }

    this.logger.log('Mise à jour des liens de calendrier terminée');
  }

  async getSingleProperty(hostId: number, airbnbId: number) {
    return this.prisma.airbnbInfo.findFirst({
      where: {
        id: airbnbId,
        userId: hostId,
      },
    });
  }

  async getPastPrestationsByHostId(hostId: number) {
    try {
      const prestations = await this.prisma.prestation.findMany({
        where: {
          hostId: hostId,
          hasBeenDone: true, // Filtre pour les prestations terminées
        },
        include: {
          airbnb: true, // Inclure les détails de l'Airbnb si nécessaire
        },
      });
      return prestations;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des prestations passées');
    }
  }
}

// Vous pouvez ajouter des méthodes supplémentaires si nécessaire (updateProperty, deleteProperty, etc.)
