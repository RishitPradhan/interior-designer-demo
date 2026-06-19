export interface ServiceItem {
  id: string;
  name: string;
  image: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Living Room" | "Bedroom" | "Kitchen" | "Office";
  image: string;
  description: string;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  category: string;
  budget: string;
  quote: string;
  clientName: string;
  clientRole: string;
  image: string;
  beforeNotes: string;
  afterNotes: string;
}

export interface ColorPaletteItem {
  name: string;
  hex: string;
  usage: string;
}

export interface KeyFurnitureItem {
  item: string;
  description: string;
  materialHint: string;
}

export interface AIRecommendation {
  conceptName: string;
  editorialIntro: string;
  colors: ColorPaletteItem[];
  furniture: KeyFurnitureItem[];
  materials: string[];
  architecturalAdvice: string[];
}

export interface SavedMoodboard extends AIRecommendation {
  id: string;
  roomType: string;
  stylePreference: string;
  timestamp: string;
}

export interface ConsultationRequest {
  id: string;
  clientName: string;
  phone: string;
  requirement: string;
  notes?: string;
  submissionTime: string;
}
