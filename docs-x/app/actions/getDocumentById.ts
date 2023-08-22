
import prisma from "@/app/libs/prismadb";


export default async function getDocumentById(documentId:string|undefined){


    if(!documentId){
        return null;
    }
    const document=await prisma.document.findUnique({
        where:{
            id:documentId
        }, 
        include:{
            owner:true,
            collabUsers:{
                include:{
                    user:true,
                }
            }
        }
    });

if(!document){
    return null;
}
return document;

}