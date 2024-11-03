export class CreatePrestationDto {
  hostId: number;
  partnerId?: number; // Peut être optionnel si ce n'est pas nécessairement assigné au moment de la création
  airbnbId: number;
  description: string;
  price: number;
}
