import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const ShowSummary = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
      });
  }, [id]);

  return (
    <div className='flex flex-col justify-center items-center font-[Nunito,san-serif]'>
      <h1 className=' mt-5 font-bold text-lg '>Show List </h1>
      <div className='w-[100px] bg-blue-400 h-2 rounded-md'></div>
      {show && (
        <div key={show.id} className='flex w-[500px] flex-col justify-center items-center p-2 m-4 bg-slate-100 rounded-md shadow-md'>
          {show.image && show.image.medium ? (
              <img src={show.image.medium} className=' h-[450px]' alt="" />
          ):( <img src='No image Found' alt='No Image Found'/>)}

          <h3 className='mt-4 mb-2 block  text-xl font-semibold text-[#2D3250] leading-snug tracking-normal 
              text-blue-gray-900 antialiased'>
                {show.name}
          </h3>
          <p className='p-2'>{show.summary && show.summary.replace(/<[^>]*>/g, '')}</p>
          <Link to={`/booking/${id}`}>
            <button className='mb-5  mt-2 select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle 
              text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all 
              hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
              active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              >Book Movie Ticket
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowSummary;
