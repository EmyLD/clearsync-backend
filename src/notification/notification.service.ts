import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async addPushTokenToAllPartners(token: string) {
    try {
      const result = await this.prisma.partnerInfo.updateMany({
        data: {
          pushToken: token, // Mettez à jour la propriété `pushToken` de chaque partenaire
        },
      });
      console.log(`Token ajouté à ${result.count} partenaires.`);
      return result;
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour des tokens pour tous les partenaires:',
        error,
      );
      throw new Error(
        'Une erreur est survenue lors de la mise à jour des tokens.',
      );
    }
  }

  async sendNotificationToAllPartners(title: string, body: string) {
    try {
      // Récupérer les tokens de notification depuis la base de données
      const partners = await this.prisma.partnerInfo.findMany({
        where: {
          pushToken: {
            not: null, // S'assurer que seuls les tokens valides sont sélectionnés
          },
        },
        select: {
          pushToken: true,
        },
      });

      const partnerNotificationTokens = partners.map(
        (partner) => partner.pushToken,
      );

      for (const token of partnerNotificationTokens) {
        if (token) {
          try {
            await axios.post(
              'https://fcm.googleapis.com/fcm/send',
              {
                to: token,
                notification: {
                  title: title,
                  body: body,
                },
              },
              {
                headers: {
                  Authorization: `key=${process.env.SERVER_KEY}`,
                  'Content-Type': 'application/json',
                },
              },
            );
          } catch (error) {
            console.error("Erreur lors de l'envoi de la notification :", error);
          }
        }
      }

      console.log(
        `Notifications envoyées à ${partnerNotificationTokens.length} partenaires.`,
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des tokens:', error);
      throw new Error(
        "Une erreur est survenue lors de l'envoi des notifications.",
      );
    }
  }
}
