import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface Iparams{
    documentId:string
}

export async function DELETE(
    request:Request,
    {params}:{params:Iparams}

){

    try{
        const currentUser=await getCurrentUser();
    if(!currentUser?.email){
        return new NextResponse('Unauthorized',{status:200});
    }
    
    const documentId=params.documentId;
    if(!documentId){
        return new NextResponse('Invalid documentId',{status:400});
    }


    const deletedCollab=await prisma.collaborator.deleteMany({
        where:{
            documentId:documentId
        }
    }) 

    const deletedDocument=await prisma.document.delete({
        where:{
            id:documentId
        }
    })
    if(!deletedDocument){
        return new NextResponse('No such document',{status:402});
    }
    return NextResponse.json(deletedDocument);
    
    }
    catch(error:any){
        console.log('error while deleting',error);
        return new NextResponse('Internal Error',{status:500});
    }
    

}