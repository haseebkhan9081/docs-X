 import clsx from 'clsx';
import React, { useState } from 'react'
 import Email from './Email';
import { Alert, FormControlLabel, Grid, Switch } from '@mui/material';
import Button from '@/app/(site)/components/Button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Select from '@/app/components/Select';
import { User } from '@prisma/client';
import { FieldValues, useForm,SubmitHandler } from 'react-hook-form';
import { FcCheckmark, FcGlobe } from 'react-icons/fc';
import { BsGlobeAmericas } from 'react-icons/bs';
 import {RxCross1} from "react-icons/rx";
interface ShareInputFormprops{
  onClose:()=>void;
  Title?:string;
  users:User[]
}

 const  ShareInputForm:React.FC<ShareInputFormprops>=(
  {onClose,
     users,
     Title
  }

 )=> {
const {documentId}=useParams();
const router=useRouter(); 
const [isLoading,setIsLoading]=useState(false);
const [isEveryone,setIsEveryone]=useState(false);
 

const {
handleSubmit,

setValue,
watch,
formState:{
  errors
}
}=useForm<FieldValues>({
  defaultValues:{
   
    members:[]
  }
})

const members=watch('members');
const onSubmit:
SubmitHandler<FieldValues>=(data)=>{
setIsLoading(true);
axios.post(`/api/document/
${documentId}/share`,{
  ...data,
  everyOne:isEveryone
}).
then((response)=>{
console.log(response.data);
toast.success('Shared');
  router.refresh();
  onClose();
})
.catch((error:any)=>{
console.log(error,"error from groupchatModl");
toast.error('Something went wrong')}
)
.finally(()=>setIsLoading(false))

}
 

return <>
     <div>
      <form onSubmit={handleSubmit(onSubmit)}>
     
      <Select
     disabled={isLoading}
     label="Users"
     options={users?.map((user)=>({
       value:user.id,
       label:user.name
     }))}
     onChange={(value)=>setValue('members',value,{
       shouldValidate:true
     })}
     value={members}
    
      />

     <div
     className='
     w-full
     flex
     flex-row
     items-center
     justify-between
     mt-4
     gap-2'>
      <div>
   <span>Share with everyone: </span>
  <Switch 
  onChange={()=>setIsEveryone(!isEveryone)}
  />
      </div>
      <div
      >
        <Button
        small
        type='submit'
        text='share'/>
 
      </div>

     </div>
     </form>
     </div>
     
   </>
   
 }


 export default ShareInputForm;
 