"use client";
import React from 'react'
import { GrAdd } from "react-icons/gr";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function MobileNewDocument() {
const router=useRouter();
  const handleClick=()=>{
    axios.post('/api/document')
    .then((response)=>{
    console.log(response);
    console.log(response?.data?.id);
    router.push(`/documents/${response?.data?.id}`);
    }).catch((error)=>{
      console.log("error at creating new document FrontEnd!",error);
    });
    
    
      }
  return (
    <div
    className='block fixed
    z-50
     right-10 bottom-10 text-black md:hidden
     
     '>
      <div
     
      className='
      z-50
      w-[60px]
      h-[60px]
      bg-gray-100
      flex
      items-center
       justify-center
       rounded-lg
      focus:ring-1
      focus:ring-inset
      focus:ring-black
      hover:ring-1
      hover:ring-black
       shadow-lg
       
      
    

      '>
        <button
         onClick={handleClick}
        >
        <GrAdd
      size={20}
      className='
      z-50
      '/>
      
        </button>
      </div>
      

    </div>
  )
}
