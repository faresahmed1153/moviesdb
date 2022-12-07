import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MediaContext } from "../../MediaContext";
import { IContext } from "../../MediaContext";
interface IPerson {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: null;
  gender: number;
  homepage: null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: null;
  popularity: number;
  profile_path: null | string;
  title:string
};
export default function PersonDetails() {
  const { baseImageUrl } = useContext(MediaContext) as IContext;
  const params = useParams();
  const [personDetails, setPersonDetails] = useState<IPerson|null>(null);
  async function getPersonDetails() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${params.id}?api_key=ecc098a7ac779d34e893f3b5798353ee`
    );
    setPersonDetails(data);
  }
  useEffect(() => {
    getPersonDetails();
  }, []);

  return (
    <>
      {personDetails ? (
        <div className="container">
          <div className="row justify-content-center align-items-center pt-5">
            <div className="col-md-4 mb-4">
              <img
                className="w-75 "
                src={baseImageUrl + personDetails.profile_path}
                alt="poster_Image"
              />
            </div>
            <div className="col-md-8">
              <div className="">
                <h2 className="mb-4">{personDetails.title}</h2>

                <p className="mb-4">
                  <span className=" ">Name : </span>
                  {personDetails.name}
                </p>
                <p className="mb-4">
                  <span className=" ">Birthday : </span>
                  {personDetails.birthday}
                </p>
                <p className="mb-4">
                  <span className=" ">Place Of Birth : </span>
                  {personDetails.place_of_birth}
                </p>
                <p className="mb-4">
                  <span className=" ">Popularity : </span>
                  {personDetails.popularity}
                </p>
                <h4>{personDetails.biography.substring(0, 800)}</h4>
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
