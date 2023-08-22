"use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GrDocumentText } from "react-icons/gr";
import { Document } from '@prisma/client';
import Image from 'next/image';
import { Box,Paper } from '@mui/material';
interface PaperSheetprops {
  document?: Document;
}

const PaperSheet: React.FC<PaperSheetprops> = (
  {
    document
  }
) => {
 

  return (
    <>
        <Box
     
     sx={{
       display: 'flex',
       flexWrap: 'wrap',
       '& > :not(style)': {
         m: 1,
         width: 170,
         height: 180,
         
       },
     }}
   >
     
     <Paper
     className="
    hover:shadow-xl
    hover:shadow-gray-500
      hover:cursor-pointer
     flex
     flex-col
     items-center
     justify-center
     focus: cursor-wait
     " 
     variant="outlined"
      >
      <div
      className='
      flex
      flex-col
      items-center
      justify-center
      h-full'>
<div
className='
width-[300px]
height-[200px]
overflow-hidden
'>
<Image
src={document?.thumbnail! || '/images/placeholder.jpg'}
alt="Image"
width={100} // Set the desired width of the cropped area
height={50} // Set the desired height of the cropped area
layout="responsive" // Maintain aspect ratio

>
 
</Image>

</div>
 <div
 className='
 border-t
 
 px-2
 border-gray-400
 w-full
 '>
  <p
  className='
  text-gray-500
  text-sm
  '>
    {document?.title}
  </p>
  <p
  className='
  text-xs
  text-gray-300'>
  {document?.createdAt.toJSON().slice(0,10)}
  </p>
 </div>
      </div>
        
     </Paper>
     
   </Box>
    </>
  );
}

export default PaperSheet;
