import { Controller, Post, Body } from '@nestjs/common';
import { PrestationsService } from './prestation.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { Get, Param, ParseIntPipe } from '@nestjs/common';

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
}
