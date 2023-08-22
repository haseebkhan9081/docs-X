
"use client";
 
import Avatar from '@mui/material/Avatar';
import { User } from "@prisma/client";
import Image from 'next/image';

interface ProfileAvatarprops{
    user?: User;
}
const ProfileAvatar:React.FC<ProfileAvatarprops>
=({
    user
})=>{
    console.log(user?.image);
    return <>
    <Avatar
     alt='profile' 
     src={user?.image!}></Avatar>
      </>
}

export default ProfileAvatar;