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
   className="flex flex-row justify-between items-center w-full border-b-2  shadow-black">
   <div
    className="flex flex-row p-4 space-x-2 w-full">
        <div
        className="text-2xl font-medium"
        >Docs-X  </div>
        <div><GrDocumentText size={32}/></div>
    </div>
    {/* here is the Avatar */}
    <div
    className="flex flex-col justify-center items-center pr-2">
      
       
        
       <ProfileMenu user={user!} />
       
        
          
    </div>
   </div>
   
    
    </>
}


export default NavBar;