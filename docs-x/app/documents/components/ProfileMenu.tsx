"use client";

import { Transition } from '@headlessui/react';
 
import ProfileAvatar from '@/app/components/ProfileAvatar';
import { Popover } from '@headlessui/react';
import { User } from '@prisma/client';
import { usePopper } from 'react-popper'
import { Fragment } from 'react';
import { useState } from 'react';
import {SlLogout} from "react-icons/sl";
import { signOut } from 'next-auth/react';
import { Tooltip } from '@mui/material';
 interface ProfileMenuprops{
    user?:User
 }
 const ProfileMenu:
 React.FC<ProfileMenuprops>=({
    user
 })=> {
    const logoutHandle=()=>{
        signOut();
    }
    let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    let [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom', // Specify the desired placement
      });
  return (
    <div className="  top-0 
    right-0
    items-center">
      <Popover >
       
          <>
            <Popover.Button
             ref={setReferenceElement}   >
             <div>
              <Tooltip title='Profile' >
             <ProfileAvatar user={user!}/>
             </Tooltip>
              </div> 
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel 
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}

              
              
              className="
               z-10 
              left-1
                    pr-0
                   
                   
                  ">
                <div className="
                overflow-hidden
                 rounded-lg
                  shadow-lg 
                  ring-1
                   ring-black 
                   ring-opacity-5">
                  
                  <div 
                  className="
                  bg-gray-50
                  items-center
                  flex
                  flex-col
                  space-y-4
                   p-4
                 "
                  >
                   <div
                   className="
                   border-b-2
                   border-gray-300
                   w-full
                   items-center
                   justify-center
                   flex
                   pb-2

                   ">
                   <ProfileAvatar user={user!}/>
                      
                    </div> 
                    <span className="
                      flex
                       items-center
                       flex-col
                       space-y-3">
                        <span className="
                        text-sm font-medium
                         text-gray-900">
                          {user?.name}
                        </span>
                        <span className="
                        text-sm font-medium
                         text-gray-900">
                          {user?.email}
                        </span>
                        <span className="
                      block
                       text-sm
                        text-gray-500
                        cursor-pointer"
                        onClick={logoutHandle}
                        >
                          <Tooltip title='Logout' >
                            <SlLogout  color='black' size={24}/>
                            </Tooltip>
                          </span>
                      </span>
                     
                    
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        
      </Popover>
    </div>
  )
}
 
export default ProfileMenu;