import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

@Injectable()
export class NotificationService {
  private expo: Expo;

  constructor(private readonly prisma: PrismaService) {
    this.expo = new Expo(); // Initialize the Expo SDK instance
  }
  //TDO : Add token only if not already present and partner available. If partner switch to unavailbel delete token

  async addPushTokenToAllPartners(token: string) {
    console.log(token);

    try {
      const result = await this.prisma.partnerInfo.updateMany({
        data: {
          pushToken: token,
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

  async sendNotificationToAllPartners(title: string, body: string, data?: any) {
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

      const partnerNotificationTokens = partners
        .map((partner) => partner.pushToken)
        .filter((token) => Expo.isExpoPushToken(token)); // Validate tokens with Expo SDK

      const messages: ExpoPushMessage[] = partnerNotificationTokens.map(
        (token) => ({
          to: token,
          sound: 'default',
          title: title,
          body: body,
          data: { title, body, data },
        }),
      );

      // Chunk messages to respect Expo's limits
      const chunks = this.expo.chunkPushNotifications(messages);

      // Send notifications in chunks
      for (const chunk of chunks) {
        try {
          const tickets = await this.expo.sendPushNotificationsAsync(chunk);
          console.log('Tickets:', tickets);
        } catch (error) {
          console.error(
            "Erreur lors de l'envoi de la notification avec Expo SDK:",
            error,
          );
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
