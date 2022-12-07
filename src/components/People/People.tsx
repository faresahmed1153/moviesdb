import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { IPeople, MediaContext } from "../../MediaContext";
import { Link } from "react-router-dom";
import { IContext } from "../../MediaContext";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
export default function People() {
  const { baseImageUrl } = useContext(MediaContext) as IContext;
  const [trendingPeople, setTrendingPeople] = useState<IPeople[] | []>([]);
  const [page, setPage] = useState(1);

  async function getTrending(pageNumber: number) {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=90142caa6b0287afefb2bd4ad6d11624&page=${pageNumber}`);
    setTrendingPeople(data.results);
  }
  useEffect(() => {
    getTrending(page);
  }, [page]);
  return (
    <>
      {trendingPeople.length>0 ? (
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div className="w-100">
              <div className="w-25 brdr mb-3"></div>
              <h2>Trending</h2>
              <h2>Tv People</h2>
              <h2>To watch now</h2>
              <p className="secondColor">Most watched People by day</p>
              <div className="mb-3 brdr"></div>
            </div>
          </div>
          {trendingPeople.map((person, index) => (
            <div className="col-md-2 my-3" key={index}>
              <div>
                <Link to={`/persondetails/${person.id}`}>
                  <img className="img-fluid" src={baseImageUrl + person.profile_path} alt="poster_Image" />
                  <h5>{person.name}</h5>
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
