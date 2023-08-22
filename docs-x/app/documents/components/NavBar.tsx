import { Profiler } from "react";
import {GrDocumentText} from "react-icons/gr";
import ProfileAvatar from "@/app/components/ProfileAvatar";
import { useSession } from "next-auth/react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileMenu from "./ProfileMenu";
const NavBar=async()=>{
  const user= await getCurrentUser();
    return <>
   <div
   className="
   flex
   flex-row
   w-full
   justify-between
   items-center
   border-b-2
   shadow-lg
   shadow-black">
   <div
    className="
    flex
    flex-row
    p-4
    space-x-2
    
    w-full
    ">
        <div
        className="
        font-medium
        text-2xl"
        >Docs-X  </div>
        <div><GrDocumentText size={32}/></div>
    </div>
    {/* here is the Avatar */}
    <div
    className="
    pr-2
    flex  
    flex-col 
    items-center
    justify-center
    ">
      
       
        
       <ProfileMenu user={user!} />
       
        
          
    </div>
   </div>
   
    
    </>
}


export default NavBar;