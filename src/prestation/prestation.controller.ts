import {
  Controller,
  Post,
  Body,
  Put,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { PrestationsService } from './prestation.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { Get, Param, ParseIntPipe } from '@nestjs/common';
import { parse } from 'path';

@Controller('prestations')
export class PrestationsController {
  constructor(private readonly prestationService: PrestationsService) {}

  @Post()
  create(@Body() createPrestationDto: CreatePrestationDto) {
    return this.prestationService.create(createPrestationDto);
  }
  @Get('user/:userId')
  async findPrestationsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.prestationService.findPrestationsByUserId(userId);
  }

  @Put(':id')
  async updatePrestation(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    try {
      const updatedPrestation = await this.prestationService.updatePrestation(
        parseInt(id),
        parseInt(userId),
      );
      return updatedPrestation;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la mise à jour de la prestation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
