"use client";
import { Paper,Box} from "@mui/material";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { GrAdd } from "react-icons/gr";

const NewDocument=()=>{
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
    return <>
     <Box
     
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 120,
          height: 138,
          
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
      onClick={handleClick} >
        
        <GrAdd  size={32}/>
      </Paper>
      
    </Box>
    </>
}

export default NewDocument;