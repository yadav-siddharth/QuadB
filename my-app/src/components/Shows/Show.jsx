import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar,FaLink } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";


const BASE_URL = 'https://api.tvmaze.com/search/shows?q=all';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchShow = async()=> { 
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}`);
        const shows = (await response.json()) ;
        setShows(shows);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShow();
  }, []);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='font-[Nunito,san-serif] mt-5 font-bold text-lg '>Show List </h1>
      <div className='w-[100px] bg-blue-400 h-2 rounded-md'></div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className=' flex flex-wrap justify-center items-center p-2 m-4 font-[Nunito,sans-serif]'>
        {shows.map((show) => (
          <div key={show.show.id} className='w-[300px] flex flex-col justify-center items-center p-2 m-4 bg-slate-100 rounded-md shadow-md'>
           
            {show.show.image && show.show.image.medium ? (
              <img src={show.show.image.medium} className='w-full h-1/2' alt="" />
            ):( <img src='No image Found' alt='No Image Found'/>)}
            
            <div className='flex justify-between w-full p-2'>
              <h3 className=' block  text-xl font-semibold text-[#2D3250] leading-snug tracking-normal 
              text-blue-gray-900 antialiased'>{show.show.name}</h3>
              <h3 className='flex items-center text-base font-semibold leading-snug tracking-normal 
              text-blue-gray-900 antialiased'><FaStar className='fill-yellow-500 mr-2'/>{show.show.rating.average}</h3>
            </div>

            <h3 className='flex space-x-5 '>{show.show.genres.map((genres) => (<p className='bg-gray-600 rounded-md text-white mb-2 px-2 py-1'>{genres}</p>))}</h3>

            <div className='flex justify-between items-center w-full my-2 text-sm'>
              <h3 className='flex items-center text-gray-500'><BsCalendar2DateFill className='mr-2'/>{show.show.premiered}</h3>
              <a href={show.show.premiered} className='flex items-center text-gray-500 hover:text-blue-700'><FaLink className='mr-1'/>Visit Site</a>
            </div>
            

            <Link to={`/show/${show.show.id}`}>
              <button className='mb-5  mt-2 select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle 
              text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all 
              hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
              active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Show Summary</button>
            </Link>
          </div>
        ))}
        </div>
        )}
    </div>
  );
};

export default ShowList;
