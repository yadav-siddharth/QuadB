import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { FaLanguage,FaStar } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";


const BookingForm = () => {
const { id } = useParams();
const [show, setShow] = useState(null);
const [showDetails, setShowDetails] = useState(null);
const [formSubmitted, setFormSubmitted] = useState(false);
const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
  };



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
    <div  className='flex flex-col justify-center items-center font-[Nunito,san-serif] '>
      <h1 className=' mt-5 font-bold text-lg '>Show List </h1>
      <div className='w-[100px] bg-blue-400 h-2 rounded-md'></div>
      {show && (
        <div className='w-[500px] flex flex-col justify-center items-center mt-10 '>
          {show.image && show.image.medium && (
              <img src={show.image.medium} alt="" />
          )}
          <div className='flex justify-between items-center w-[200px] p-2'>
            <h3 className='text-base font-semibold'>{show.name}</h3>
            <h3 className='flex items-center'><FaLanguage className='mr-2' size={20}/>{show.language}</h3>
          </div>

          <div className='flex justify-center items-center space-x-6'>
            <h3 className='flex justify-center items-center'><MdAccessTimeFilled className='fill-gray-300 mr-2'/>{show.runtime}</h3>
            <h3 className='flex items-center justify-center'><FaStar className='fill-yellow-500 mr-2'/>{show.rating.average}</h3>
          </div>    

        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center items-center'>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className=' mt-2 ml-2 bg-slate-200 border-gray-200 focus:outline-none p-2 rounded-md shadow-md'
        />
        </div>
       
        <div className='flex justify-center items-center mt-2'>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className=' mt-2 ml-2 bg-slate-200 border-gray-200 focus:outline-none p-2 rounded-md shadow-md'
        />
        </div>
        
        <div className='flex justify-center items-center mt-4'>
        <button 
        type="submit" className='mb-5  mt-2 select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle 
              text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all 
              hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
              active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
                Book Ticket
        </button>
        </div>
      </form>
   
      
      {formSubmitted && (
        <div className='bg-[#E1F0DA] p-2 rounded-md text-[#12372A] font-bold flex flex-col justify-center items-center'>
          <p>Form submitted with the following details:</p>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
