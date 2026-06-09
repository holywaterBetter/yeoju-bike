import { toMobileTourCard, tourCatalog, type MobileTourCard } from "./tours";

export type { MobileTourCard };

export const mobileTourCards: MobileTourCard[] = tourCatalog.map(toMobileTourCard);
