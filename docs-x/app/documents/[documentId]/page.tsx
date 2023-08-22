import getCurrentUser from "@/app/actions/getCurrentUser";
import getDocumentById from "@/app/actions/getDocumentById";
import io,{Socket} from "socket.io-client";
import Editor from "./component/editor";
import ShareModal from "./component/ShareModal";
import NavBar from "./component/NavBar";
import getUsers from "@/app/actions/getUsers";
import { useState } from "react";
import EmptyState from "@/app/components/EmptyState";
interface props{
    documentId?:string;
}

const documentId=
async({params}:{params:props})=>
{
    const document=await getDocumentById(params.documentId);
    const currentUser=await getCurrentUser();
    const users=await getUsers();
    console.log("User email in collabUsers:", document?.collabUsers[0]?.user?.email);
    console.log("Current user email:", currentUser?.email);
    console.log(
        "Is current user in collabUsers array:",
        document?.collabUsers.some((collab) =>
            collab?.user?.email === currentUser?.email
        )
    );
     if(!document){
    return <>
    <EmptyState text="No such document Exists!"/>
     
     </>
   }
   if(currentUser?.id===document?.ownerId
    ||document?.collabUsers.some((collab) =>
    collab?.user?.email === currentUser?.email
)||document.isEveryOne){
    console.log("Owner Confirmed Now Loading the Editor!");
   return <>
   <NavBar document={document!} users={users} user={currentUser!}/>
   <Editor doc={document!}/>
   </>
   }else{
return <>
<EmptyState text="you dont have permissions to open this document!"/>
     </>
   }

}

export default documentId;