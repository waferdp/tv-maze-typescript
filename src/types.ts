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

interface Externals {
  imdb: string;
  thetvdb: number;
  tvrage: number;
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
  externals?: Externals;
}

export interface ListProps {
  shows: Show[];
}
