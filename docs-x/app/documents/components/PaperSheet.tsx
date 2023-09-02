"use client";
import { Document } from '@prisma/client';
import Image from 'next/image';
import { Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation'; // Correct import
import { useState } from 'react';
import {GrDocumentText} from "react-icons/gr"
import { BsThreeDotsVertical } from 'react-icons/bs';
import OptionsPopover from './OptionsPopover';

interface PaperSheetprops {
  document?: Document;
}

const PaperSheet: React.FC<PaperSheetprops> = ({ document }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
 


  const onClick = () => {
    setIsLoading(true);
    router.push(`/documents/${document?.id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 170,
          height: 150,
        },
      }}
    >
      <Paper
        className="flex flex-col 
         justify-between items-center 
           
         
           hover:cursor-pointer  
           "
        variant="outlined"
      >
        <div 
         className="
         flex flex-col  
         justify-between
         w-full
          items-center 
          h-full">
             
          <div className="
        
          width-[300px] 
          height-[150px] 
          overflow-hidden">
            <Image
            onClick={onClick}
              src={document?.thumbnail || '/images/placeholder.jpg'}
              alt="Image"
              width={50}
              height={30}
              layout="responsive"
            />
          
          </div>
          <div
          className='
          flex 
          flex-row
          w-full
          justify-between
          items-center
          '>
          <div className="
          flex 
          flex-row px-2 w-full border-t
           
           items-center
            space-x-1
            

           ">
            <GrDocumentText
            className='
            
            left-0
            ' size={15}/>
            <p className="text-sm
          
             text-gray-700">{document?.title?.slice(0,15)}</p>
             
                </div>
                <div
                className='
                hover:rounded-full
                hover:ring-[0.5px]
                hover:ring-sky-300
                hover:bg-sky-100
                border-none
                outline-none
                '
                 >
                  <OptionsPopover
                  doc={document}/>
                </div>
                </div>
        </div>
      </Paper>
    </Box>
  );
};

export default PaperSheet;
