interface Image {
  medium: string;
  original: string;
}

interface Rating {
  average: number;
}

interface Network {
  name: string;
}

export interface Show {
  id: number;
  name: string;
  image?: Image;
  summary: string;
  genres: string[];
  rating?: Rating;
  network?: Network;
  runtime?: string;
  language?: string;
  officialSite?: string;
}

export interface ListProps {
  shows: Show[];
}
