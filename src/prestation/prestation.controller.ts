import { Controller, Post, Body } from '@nestjs/common';
import { PrestationsService } from './prestation.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';

@Controller('prestations')
export class PrestationsController {
  constructor(private readonly prestationService: PrestationsService) {}

  @Post()
  create(@Body() createPrestationDto: CreatePrestationDto) {
    return this.prestationService.create(createPrestationDto);
  }
}
