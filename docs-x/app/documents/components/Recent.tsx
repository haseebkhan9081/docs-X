"use client";

import { Document, User } from "@prisma/client";
import PaperSheet from "./PaperSheet";
import { Grid } from "@mui/material";
interface Recentprops{
    documents?:Document[];
}
const Recent:React.FC<Recentprops>
=({
    documents
})=>{
    
    return <>
     
    <div 
    className="p-2 font-semibold text-gray-900"
    >
Recent
    </div>
    <div
    className="flex
     flex-row 
     p-4">

<Grid container spacing={1}>
   {documents?.map((doc)=>(
    <Grid 
    key={doc?.id}
    item sm={3} lg={2} xs={6} md={2} xl={1}>
  <PaperSheet document={doc}/>
  </Grid>
   ))}
  
   
</Grid>
    </div>
     
    
    </>
}

export default Recent;