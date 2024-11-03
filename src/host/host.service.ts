// host/host.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HostService {
  constructor(private prisma: PrismaService) {}

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
      throw new Error('Aucune information trouvée pour cet ID.');
    }

    return airbnbInfo.calendarlink;
  }

  
}
// Vous pouvez ajouter des méthodes supplémentaires si nécessaire (updateProperty, deleteProperty, etc.)
