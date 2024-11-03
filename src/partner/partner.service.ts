import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from '../prisma/prisma.service';
import { elementAt } from 'rxjs';
import { PartnerInfo } from '@prisma/client';

@Injectable()
export class PartnerService {
  async create(createPartnerDto: CreatePartnerDto) {
    const { userId, iban, siret } = createPartnerDto;

    // Vérifier si l'utilisateur existe avant de créer l'entrée
    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Créer l'entrée dans la table `partnerInfo`
    return await this.prisma.partnerInfo.create({
      data: {
        userId: Number(userId),
        iban,
        siret,
      },
    });
  }
  findAll() {
    return `This action returns all partner`;
  }

  constructor(private prisma: PrismaService) {}

  async hasPartnerInfo(userId: number): Promise<boolean | PartnerInfo> {
    const partnerInfo = await this.prisma.partnerInfo.findFirst({
      where: { userId: userId },
    });
    console.log(partnerInfo);

    if (partnerInfo) {
      return partnerInfo;
    } else {
      return false;
    }
  }
  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
