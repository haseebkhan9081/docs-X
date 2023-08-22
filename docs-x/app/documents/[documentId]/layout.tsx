import React, { useState } from 'react'
import NavBar from './component/NavBar'
import getDocumentById from '@/app/actions/getDocumentById'
import { useParams } from 'next/navigation'

export default async function layout({children}:{children:React.ReactNode}) {
   
   
  return (
   
    <div>
       
    {children}</div>
    
  )
}
