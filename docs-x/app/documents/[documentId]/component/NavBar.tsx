"use client"
import {IoIosArrowBack} from "react-icons/io";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {BsShareFill} from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import ProfileAvatar from "@/app/components/ProfileAvatar";
import Button from "@/app/(site)/components/Button";
import { useEffect, useState } from "react";
import ShareModal from "./ShareModal";
import { Document, User, collaborator } from "@prisma/client";
import { useParams } from "next/navigation";
import Collab from "./Collab";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import axios from "axios";
import Link from "next/link";
interface NavBarprops{
  user?:User,
  document?:Document &{
    collabUsers:CollaboratorWithUser[]
},
users?:User[]
}
interface CollaboratorWithUser extends collaborator {
  user: User;
}
const  
 NavBar:React.FC<NavBarprops>
 =({
  user,
  document,
  users
 })=> {

  const [inputValue,setInputValue]=
  useState(document?.title);
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .post(`/api/document/${document?.id}/title`, { Title: inputValue })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error: any) => {
          console.log(error, 'error from Navbar while saving the title');
        });
    }, 2000);
  
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [document?.id, inputValue]);


  const handleChange=(evt:any)=>{
setInputValue(evt.target.value);
  }
  console.log(document?.ownerId);
  console.log(user?.id);
  const isOwner = document?.ownerId === user?.id;
   console.log(isOwner);
  const collaborators=document?.collabUsers;
  
  const
  [isModalOpen,setIsModalOpen]
  =useState(false);
  const closeModal=()=>{
    setIsModalOpen(false);
  }
  const handleShare=()=>{
    setIsLoading(true);
    setIsModalOpen(true);
  }
  const 
  [isLoading,setIsLoading]
  =useState(false);
  return <>
  <ShareModal
    isOpen={isModalOpen}
  onClose={closeModal}
  users={users}
   
  />
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
  items-center
  w-full
  ">
     <Link
     href={'/documents'}
     >
     <IoIosArrowBack/>
     </Link> 
      <div
      className="
      font-semibold
      text-2xl"
      >Docs-X  </div>

      <div>
        <GrDocumentText 
      className="text-white" size={36}/></div>
      
    <input 
    className="
    border-none
    outline-none
    shadow-none
     ring-1
     rounded-md
     ring-gray-300
    focus:ring-1
    focus:ring-black
    focus:rounded-md
    "
    type="text" 
    placeholder="Title.."
    value={inputValue!}
    onChange={handleChange}
    />
  
  </div>
  
  {/* here is the Avatar */}
  <div
  className="
  pr-2
 md:flex
 flex-row
 items-center
 justify-center
 gap-2
 hidden

  ">
    
    <AvatarGroup max={4}>
      {collaborators?.map((user)=>(
        
        <span
        className="flex
        w-[35px]"
        key={user?.id}>
     <Tooltip title={user?.user?.name} 
     placement="top">
      <div>  <Avatar 
     src={user?.user?.image!} /></div>
      </Tooltip>
      </span>
))}
    </AvatarGroup>
    
     
     <div
     className="
     hidden
     md:block
     ml-2
     "
 >
  
{isOwner && ( <Button
 onClick=
 {handleShare}
      text="share"
       secondary 
       small iconSize={15} 
       Icon={BsShareFill}
       />
 )}     
       
       </div> 
  </div>
 </div>
 
  
  </>
}
export default NavBar;