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
       <Card className="
       hover:shadow-xl
        hover:shadow-gray-300
         hover:cursor-pointer 
         hover:ring-1 hover:ring-black
          w-[128px]
           h-[155px]
            lg:w-[150px]
             lg:h-[155px]">
      <CardContent>
       <Image src={document?.thumbnail! || `/images/placeholder.jpg`}  
       alt='thumb'
       width={100}
       height={1}
     />
        <Typography variant="h2" component="h2"
         className="
         text-base
          font-medium 
          text-center">
          {document?.title}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          className="font-light text-gray-500 text-[10px]"
        >
          {document?.createdAt.getDate().toLocaleString()}
        </Typography>

        
      </CardContent>
      <CardActions
      >
      <div className="
      flex flex-row border-t-2
       items-center lg:fixed lg:mt-10 lg:mb-0">
          <div>
            <GrDocumentText size={20} className="p-1" />
          </div>
          <div>
            <Typography variant="body2" color="textSecondary" className="text-[10px] text-gray-400">
              Created at
            </Typography>
          </div>
        </div>
      </CardActions>
    </Card>
    </>
  );
}

export default PaperSheet;
