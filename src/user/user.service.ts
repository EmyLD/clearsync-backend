import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  // Méthode pour trouver un utilisateur par email
  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error('Email must be provided');
    }

    // Récupérer l'utilisateur avec son mot de passe
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user; // `user` contient le mot de passe, à comparer dans le service d'authentification
  }

  // Méthode pour trouver un utilisateur par ID
  async findById(id: number): Promise<User | null> {
    if (!id) {
      throw new Error('ID must be provided');
    }

    // Récupérer l'utilisateur par son ID
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Si un mot de passe est fourni, le hacher avant la mise à jour
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
    }

    // Mettre à jour l'utilisateur avec les données fournies
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
