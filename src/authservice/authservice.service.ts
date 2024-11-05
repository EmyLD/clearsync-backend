import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Supprimer le mot de passe avant de renvoyer l'utilisateur
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    try {
      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    } catch (error) {
      throw new Error('Erreur lors de la connexion');
    }
  }

  async createUser(data: {
    email: string;
    password: string;
    Role: 'HOST' | 'PARTNER';
    firstname?: string;
    lastname?: string;
    phone?: string;
  }): Promise<{ access_token: string; user: User }> {
    // Hachage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // Création de l'utilisateur dans la base de données
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        Role: data.Role === 'HOST' ? 'HOST' : 'PARTNER',
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
      },
    });

    // Génération du token JWT
    const access_token = this.jwtService.sign({ sub: newUser.id });

    return {
      access_token,
      user: newUser,
    };
  }
}
