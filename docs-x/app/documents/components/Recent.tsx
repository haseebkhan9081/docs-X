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
    className="recent">
    <div 
    className="
    
    p-2
    text-gray-900
    font-semibold
    "
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
    item sm={3} lg={2} xs={4} md={2}>
  <PaperSheet document={doc}/>
  </Grid>
   ))}
  
   
</Grid>
    </div>
    </div>
    
    </>
}

export default Recent;