import React from 'react'
import prisma from "@/app/libs/prismadb";
export default async function
getAllDocumentForCurrentUserById(UserId:string|undefined) {
  
     if(!UserId){
        return [];
     }

   const ownDocuments=await 
   prisma?.document.findMany({
    where:{
        ownerId:UserId
    },
    orderBy:{
        updatedAt:'desc'
    }
    
   })
   const collabOn=await prisma.collaborator.findMany({
    where:{
        userId:UserId
    },
    include:{
        document:true
    },
    orderBy:{
        updatedAt:'desc'
    }
   })

const allDocuments=
[...ownDocuments,...collabOn.map((col)=>col.document)];

const sortedDocuments=
allDocuments.sort((a,b)=>b.updatedAt.getTime()-a.updatedAt.getTime());
if(!sortedDocuments){
    return [];
}
return sortedDocuments;



}
