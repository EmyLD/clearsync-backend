import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Endpoint pour récupérer un utilisateur par ID
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (
      !createUserDto.email ||
      !createUserDto.password ||
      !createUserDto.firstname ||
      !createUserDto.lastname ||
      !createUserDto.phone ||
      !createUserDto.role
    ) {
      throw new BadRequestException(
        'Tous les champs requis doivent être remplis.',
      );
    }

    try {
      const user = await this.userService.createUser(createUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la création de l'utilisateur : ${error.message}`,
      );
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
