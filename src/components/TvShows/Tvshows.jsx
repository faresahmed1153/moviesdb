import React from 'react';
import {useContext } from 'react';
import { MediaContext } from '../../MediaContext';
import { Link } from 'react-router-dom';

export default function TvShows() {
  const {trendingTvShows, baseImageUrl} = useContext(MediaContext);

  return (
    <>
     {
        trendingTvShows?  <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className="w-25 brdr mb-3"></div>
            <h2>Trending</h2>
            <h2>Tv shows</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched tvShows by day</p>
            <div className="mb-3 brdr"></div>
          </div>
        </div>
        {trendingTvShows.map((tv, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
            <Link to={`/tvdetails/${tv.id}`}>
                <img className='img-fluid' src={baseImageUrl+ tv.poster_path} alt='poster path'/>
                <h5>{tv.name}</h5>
              </Link>
            </div>
          </div>
        )}
      </div>:''
      }
    </>
  )
}
