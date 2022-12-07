import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { IMovies, MediaContext } from "../../MediaContext";
import { Link } from "react-router-dom";
import { IContext } from "../../MediaContext";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
export default function Movies() {
  const { baseImageUrl } = useContext(MediaContext) as IContext;
  const [trendingMovies, setTrendingMovies] = useState<IMovies[] | []>([]);
  const [page, setPage] = useState(1);

  async function getTrending(pageNumber: number) {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=90142caa6b0287afefb2bd4ad6d11624&page=${pageNumber}`);
    setTrendingMovies(data.results);
  }
  useEffect(() => {
    getTrending(page);
  }, [page]);

  return (
    <>
      {trendingMovies.length > 0 ? (
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div className="w-100">
              <div className="w-25 brdr mb-3"></div>
              <h2>Trending</h2>
              <h2>Movies</h2>
              <h2>To watch now</h2>
              <p className="secondColor">Most watched movies by day</p>
              <div className="mb-3 brdr"></div>
            </div>
          </div>
          {trendingMovies.map((movie, index) => (
            <div className="col-md-2 my-3" key={index}>
              <div>
                <Link to={`/moviedetails/${movie.id}`}>
                  <img className="img-fluid" src={baseImageUrl + movie.poster_path} alt="poster_Image" />
                  <h5>{movie.title}</h5>
                </Link>
              </div>
            </div>
          ))}
          <Pagination page={page} update={setPage} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
