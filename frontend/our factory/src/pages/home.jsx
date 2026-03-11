import React from 'react'
import carpenter from '../assets/carpenter.jpeg';
import painter from '../assets/painter.jpeg';
import plumber from '../assets/plumber.jpeg';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home   () {
    const images = [carpenter, painter, plumber];
    const nav = useNavigate();

    const [index, setIndex] = React.useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => (index + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images.length]);
  return (
    <div className= 'bg-[#0077b6] h-screen'>
        <div className='bg-[#2d3d55] w-screen h-10 flex gap-18 font-medium justify-center'>
           
            <p className="cursor-pointer hover:text-white mt-1.5">Home</p>
             <p className="cursor-pointer hover:text-white mt-1.5">contact us</p>
              <p className="cursor-pointer hover:text-white mt-1.5" 
              onClick={()=>{
                nav('/login')
              }}>Login</p>
               <p className="cursor-pointer hover:text-white mt-1.5"
               onClick={()=>{
                nav('/signup')
              }}
               >Register</p>
        </div>
        <h1 className='text-4xl text-white font-bold text-center pt-20'>Welcome to Our Builder</h1>
        <p className='text-xl text-white text-center mt-4'>Your one-stop solution for all your building needs!!</p>
        <button className='bg-white text-[#0077b6] font-bold py-2 px-19 rounded-3xl hover:bg-gray-200 flex justify-items-center mx-auto mt-5 '>Explore</button>

       <div className="flex justify-center mt-10">
       <div className="w-40 h-40 rounded-full overflow-hidden">
    <img 
      src={images[index]}  
      
    />
  </div>
</div>
    </div>
    
  )
}

export default Home