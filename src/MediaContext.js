import { createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
export const MediaContext = createContext([]);
export function MediaContextProvider(props) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  const baseImageUrl = "https://image.tmdb.org/t/p/original/";
  async function getTrendingItems(mediaType, callback) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=ecc098a7ac779d34e893f3b5798353ee`
    );

    callback(data.results);
  }
  useEffect(() => {
    getTrendingItems("movie", setTrendingMovies);
    getTrendingItems("tv", setTrendingTvShows);
    getTrendingItems("person", setTrendingPeople);
  }, []);
  return (
    <MediaContext.Provider
      value={{
        trendingMovies,
        trendingTvShows,
        trendingPeople,
        baseImageUrl,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
}
