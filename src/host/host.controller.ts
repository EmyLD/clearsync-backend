// host/host.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Res,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { HostService } from './host.service';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';
import { log } from 'console';

@Controller('host')
export class HostController {
  private readonly httpService: HttpService;
  constructor(private readonly hostService: HostService) {}
  @Get(':hostId/past-prestations')
  async getPastPrestations(@Param('hostId', ParseIntPipe) hostId: number) {
    try {
      const prestations =
        await this.hostService.getPastPrestationsByHostId(hostId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Prestations passées récupérées avec succès',
        data: prestations,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            error.message ||
            'Erreur lors de la récupération des prestations passées',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('link')
  async getCalendarLink(@Query('id') id: number) {
    const calendarLink = await this.hostService.getCalendarLink(Number(id));

    if (!calendarLink) {
      throw new Error('Erreur lors de la récupération du lien du calendrier');
    }

    const response = await fetch(calendarLink.toString());
    const data = await response.text();
    console.log(data);
    const startDateMatch = data.match(/DTSTART;VALUE=DATE:(\d{8})/);
    const endDateMatch = data.match(/DTEND;VALUE=DATE:(\d{8})/);

    if (startDateMatch && endDateMatch) {
      const start = this.formatDate(startDateMatch[1]);
      const end = this.formatDate(endDateMatch[1]);
      log(`Start date: ${start}, End date: ${end}`);
      return { start, end };
    } else {
      throw new Error(
        "Les dates de début ou de fin n'ont pas été trouvées dans les données iCal.",
      );
    }
  }

  private formatDate(dateString: string): string {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  @Post(':hostId')
  async addProperty(@Param('hostId') hostId: string, @Body() body: any) {
    // Assurez-vous que `hostId` est bien passé en tant que paramètre de la route
    return this.hostService.addProperty(hostId, body);
  }

  @Get(':hostId/properties')
  async getProperties(@Param('hostId', ParseIntPipe) hostId: number) {
    try {
      const properties = await this.hostService.getPropertiesByHostId(hostId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Logements récupérés avec succès',
        data: properties,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message:
            error.message || 'Erreur lors de la récupération des logements',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get(':hostId/property/:airbnbId')
  async getSingleAirbnb(
    @Param('hostId', ParseIntPipe) hostId: number,
    @Param('airbnbId', ParseIntPipe) airbnbId: number,
  ) {
    try {
      const property = await this.hostService.getSingleProperty(
        hostId,
        airbnbId,
      );
      if (!property) {
        throw new Error('Aucune propriété trouvée avec cet identifiant Airbnb');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Propriété récupérée avec succès',
        data: property,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message:
            error.message || 'Erreur lors de la récupération de la propriété',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
