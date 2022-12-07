import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MediaContext } from "../../MediaContext";
import { IContext } from "../../MediaContext";
interface IMovie {
  poster_path: string | null;
  title: string | null;
  genres: { id: number; name: string }[];
  popularity: number | null;
  vote_average: number | null;
  release_date: string | null;
  overview: string | null;
}
export default function MovieDetails() {
  const params = useParams();
  const { baseImageUrl } = useContext(MediaContext) as IContext;
  const [movieDetail, setMovieDetail] = useState<IMovie | null>(null);
  async function getMovieDetail() {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=ecc098a7ac779d34e893f3b5798353ee`);
    setMovieDetail({ poster_path: data.poster_path, title: data.title, genres: data.genres, popularity: data.popularity, vote_average: data.vote_average, release_date: data.release_date, overview: data.overview });
  }
  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <>
      {movieDetail ? (
        <div className="container">
          <div className="row justify-content-center align-items-center pt-5">
            <div className="col-md-4 mb-4">
              <img className="w-75 " src={baseImageUrl + movieDetail.poster_path} alt="poster_Image" />
            </div>
            <div className="col-md-8">
              <div className="">
                <h2 className="mb-4">{movieDetail.title}</h2>

                {movieDetail.genres.map((item, index) => {
                  return (
                    <span className="badge bg-primary me-2 mb-4 " key={index}>
                      {item.name}
                    </span>
                  );
                })}
                <p className="mb-4">
                  <span className=" ">Popularity : </span>
                  {movieDetail.popularity}
                </p>
                <p className="mb-4">
                  <span className=" ">Vote average : </span>
                  {movieDetail.vote_average}
                </p>
                <p className="mb-4">
                  <span className=" ">Release Date : </span>
                  {movieDetail.release_date}
                </p>
                <h4>{movieDetail.overview}</h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
