import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MediaContext } from "../../MediaContext";
import { IContext } from "../../MediaContext";
interface ITV {
  number_of_seasons: number;
  name: string;
  poster_path: null | string;
  title: string;
  number_of_episodes: number;
  popularity: number | null;
  vote_average: number | null;
  release_date: string | null;
  overview: string | null;
  genres: { id: number; name: string }[];
}
export default function TvDetails() {
  const { baseImageUrl } = useContext(MediaContext) as IContext;
  const params = useParams();
  const [tvDetail, setTvDetail] = useState<ITV | null>(null);
  async function getTvDetail() {
    const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=ecc098a7ac779d34e893f3b5798353ee`);
    setTvDetail({
      poster_path: data.poster_path,
      title: data.title,
      genres: data.genres,
      popularity: data.popularity,
      vote_average: data.vote_average,
      release_date: data.release_date,
      overview: data.overview,
      number_of_seasons: data.number_of_seasons,
      number_of_episodes: data.number_of_episodes,
      name: data.name,
    });
  }
  useEffect(() => {
    getTvDetail();
  }, []);

  return (
    <>
      {tvDetail ? (
        <div className="container">
          <div className="row justify-content-center align-items-center pt-5">
            <div className="col-md-4 mb-4">
              <img className="w-75 " src={baseImageUrl + tvDetail.poster_path} alt="poster_Image" />
            </div>
            <div className="col-md-8">
              <div className="">
                <h2 className="mb-4">{tvDetail.name}</h2>

                {tvDetail.genres.map((item, index) => {
                  return (
                    <span className="badge bg-primary me-2 mb-4 " key={index}>
                      {item.name}
                    </span>
                  );
                })}
                <p className="mb-4">
                  <span className=" ">Number of Episodes : </span>
                  {tvDetail.number_of_episodes}
                </p>
                <p className="mb-4">
                  <span className=" ">Number of Seasons : </span>
                  {tvDetail.number_of_seasons}
                </p>
                <p className="mb-4">
                  <span className=" ">Popularity : </span>
                  {tvDetail.popularity}
                </p>
                <p className="mb-4">
                  <span className=" ">Vote average : </span>
                  {tvDetail.vote_average}
                </p>
                <p className="mb-4">
                  <span className=" ">Release Date : </span>
                  {tvDetail.release_date}
                </p>
                <h4>{tvDetail.overview}</h4>
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
