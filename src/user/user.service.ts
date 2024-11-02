import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async createUser(data: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: 'PARTNER' | 'HOST';
    phone: string;
    siret?: string;
    city?: string;
    iban?: string;
  }): Promise<User> {
    // Hachage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // Création de l'utilisateur dans la base de données
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword, // Stocke le mot de passe haché
        firstname: data.firstname,
        lastname: data.lastname,
        Role: data.role,
        phone: data.phone,
      },
    });

    // Si l'utilisateur a le rôle PARTNER, créer une entrée dans PartnerInfo
    if (data.role === 'PARTNER') {
      await this.prisma.partnerInfo.create({
        data: {
          user: {
            connect: {
              id: newUser.id, // Connecte l'entrée PartnerInfo au nouvel utilisateur créé
            },
          },
          siret: data.siret,
          city: data.city,
          iban: data.iban || '', // Ajouter l'IBAN
        },
      });
    }

    return newUser;
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
