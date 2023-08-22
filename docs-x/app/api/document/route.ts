import getCurrentUser from "@/app/actions/getCurrentUser";
import {   NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export  async function POST(
    request:Request
){
    try{ 
        const currentUser=await getCurrentUser();
        if(!currentUser?.email || !currentUser?.id){
            return new NextResponse('Unauthorized ',{status:400});
        }
         
        const newDocument=await prisma.document.create({
            data:{
                ownerId:currentUser?.id,
                content:{},
                
            }
        });
        if(!newDocument){
            return new NextResponse('Failde to Create a New Document',{status:401});
        }
         return NextResponse.json(newDocument);
    }catch(error:any){
        console.log(error);
        return new NextResponse('Internal error while Creating a New Document',{status:500});
    }

}