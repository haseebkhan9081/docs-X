"use client";
import { usePopper } from 'react-popper';
import { Popover,Transition} from '@headlessui/react';
import { useState,Fragment } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { GrDownload } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
 import {MdDriveFileRenameOutline} from "react-icons/md";
 import * as html2pdf from 'html2pdf.js';
import { Document } from '@prisma/client';
import axios from 'axios';
 
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import RenamePopover from './RenamePopover';
interface OptionsPopoverprops{
  doc?:Document
} 
const OptionsPopover:React.FC<OptionsPopoverprops> =({
  doc
})=> {
    const [referenceElement,setReferenceElement]=useState<HTMLElement|null>(null);
const [popperElement,setPopperElement]=useState<HTMLElement|null>(null);
const {styles,attributes}=usePopper(referenceElement,popperElement,{
  placement:'auto',
});
const router=useRouter();
//to download and for conversation to pdf
const downloadButton= ()=>{
  const pdfOptions = {
    margin: 10,
    filename: doc?.title+'.pdf'||'document.pdf', // Specify the desired filename
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };
  const temp=document.createElement('div');
  temp.innerHTML=doc?.htmlContent!;
  html2pdf().from(temp).set(pdfOptions).save();

}
//to remove the document or delete
const removeButton=async()=>{
axios.delete(`/api/document/${doc?.id}/delete`)
.then((response:any)=>{
  toast.success('Deleted succesfully');
console.log('the deleted document is :',response.data);
}).catch((error:any)=>{
  toast.error('Something went wrong deleting');
  console.log('error deleting',error)
}).finally(()=>router.refresh());
}

  return (
    <div> 
<Popover>

<Popover.Button
ref={setReferenceElement}>
<BsThreeDotsVertical size={20}/>
</Popover.Button>
<Transition
as={Fragment}
enter="transition ease-out duration-100"
enterFrom="opacity-0 translate-y-1"
enterTo="opacity-100 translate-y-0"
leave="transition ease-in duration-50"
leaveFrom="opacity-100 translate-y-0"
leaveTo="opacity-0 translate-y-1"
>
<Popover.Panel
ref={setPopperElement}
style={styles.popper}
{...attributes.popper}>
<div
className='
bg-white
p-4
 ring-[0.75px]
 ring-gray-200
 rounded-md
flex
flex-col
gap-2
items-center
justify-start
'>
 <div
 onClick={downloadButton}
 className='
 border-none
 outline-none
 flex
 flex-row
 gap-2
 items-center
 justify-between'>
<p
className='
text-sm
font-medium'>
  Download
</p>
<GrDownload size={13}/>
 </div>
 <div
 onClick={removeButton}
 className='
 border-none
 outline-none
 flex
 flex-row
 gap-2
 items-center
 justify-between'>
<p
className='
text-sm
font-medium
text-red-500'>
  Remove
</p>
<AiOutlineDelete color={'red'} size={15}/>
 </div>
 <RenamePopover id={doc?.id}/>
</div>
</Popover.Panel>
</Transition>

</Popover>

    </div>
  )
  }
export default OptionsPopover;