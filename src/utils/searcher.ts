import { Show } from "../types";

export interface SearchCallbacks {
    setShows: Function,
    setError: Function,
    setIsLoading: Function,
    setIsSearched: Function
}

export const handleSearch = async (search: string, callbacks: SearchCallbacks): Promise<void> => {
    callbacks.setIsLoading!(true);
    callbacks.setIsSearched!(true);
    try {
      const response = await fetch(
        `http://api.tvmaze.com/search/shows?q=${search}`
      );
      const data = await response.json();
      const allShows = data.map((result: any) => result.show);
      callbacks.setShows!(filterResults(allShows));
      callbacks.setIsLoading!(false);
      callbacks.setError!("");
    } catch (error) {
        callbacks.setError!(
        "An error occurred while fetching search results. Please try again later."
      );
      callbacks.setIsLoading!(false);
    }
  };
  
  const filterResults = (unfiltered: Show[]): Show[] => {
    const noImages = unfiltered.filter(show => !show.image);
    const noSummary = unfiltered.filter(show => !show.summary);
    const noGenre = unfiltered.filter(show => show.genres == null || show.genres.length === 0)
    const badShows = [...noImages, ...noSummary, ...noGenre];
  
    const filtered = unfiltered.filter(show => !badShows.includes(show));
  
    return filtered;
  }