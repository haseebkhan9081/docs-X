import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
interface Iparams{
  documentId?:string;
}

export async function POST(
    request:Request,
    {params}:{params:Iparams}
){
     try{
const documentId=params.documentId;
const body=await request.json();
console.log(body);
const {
     
    
    Title
}=body;
 
    const existingDocument
=await 
prisma.document.update({
        where:{
            id:documentId
        },
        data:{
            title:Title
        }
    });
    
 
 

if(!existingDocument){
    return new NextResponse('Invalid Id',{status:402});
}
return NextResponse.json(existingDocument);
}
     catch(error:any){
console.log("error at saving the document ",error);
return new NextResponse('Internal error while saving the Document',{status:500});
     }

}