import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, ChangeEvent } from "react";
import { MediaContext } from "../../MediaContext";
import { IContext, IMovies, IPeople, ITV } from "../../MediaContext";
export default function Search() {
  const { baseImageUrl } = useContext(MediaContext) as IContext;
  const [searching, setSearching] = useState("");
  const [result, setResult] = useState<(IMovies[] | IPeople[] | ITV[]) | []>([]);
  function getInput(e: ChangeEvent<HTMLInputElement>) {
    const word = e.target.value;
    setSearching(word);
  }

  async function getData(searched: string, callBack: Function) {
    if (searched === "") {
      return;
    }
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=ecc098a7ac779d34e893f3b5798353ee&language=en-US&page=1&include_adult=false&query=${searched}`);
    console.log(data.results);
    callBack(data.results);
  }
  useEffect(() => {
    getData(searching, setResult);
  }, [searching]);

  return (
    <>
      <input type="text" className="form-control my-3 text-center" name="search" id="search" placeholder="search" onChange={getInput} />
      <div className="row">
        {result.map((item, index) => {
          if (item.media_type == "tv" && "name" in item && "poster_path" in item) {
            return (
              <div className="col-md-2 my-3 " key={index}>
                <div>
                  <Link to={`/tvdetails/${item.id}`}>
                    <img className="img-fluid" src={baseImageUrl + item.poster_path} alt="poster_Image" />
                    <h5>{item.name}</h5>
                  </Link>
                </div>
              </div>
            );
          } else if (item.media_type === "movie" && "title" in item && "poster_path" in item) {
            return (
              <div className="col-md-2 my-3" key={index}>
                <div>
                  <Link to={`/moviedetails/${item.id}`}>
                    <img className="img-fluid" src={baseImageUrl + item.poster_path} alt="poster_Image" />
                    <h5>{item.title}</h5>
                  </Link>
                </div>
              </div>
            );
          } else {
            if ("name" in item && "profile_path" in item) {
              return (
                <div className="col-md-2 my-3" key={index}>
                  <div>
                    <Link to={`/persondetails/${item.id}`}>
                      <img className="img-fluid" src={baseImageUrl + item.profile_path} alt="poster_Image" />
                      <h5>{item.name}</h5>
                    </Link>
                  </div>
                </div>
              );
            }
          }
        })}
      </div>
    </>
  );
}
