import { Popover, Transition } from "@headlessui/react"
import { useState,Fragment } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Popper, usePopper } from "react-popper";
import axios from "axios";
import { useRouter } from "next/navigation";
 import toast from "react-hot-toast";
interface RenamePopoverprops{
    id?:string
}
const RenamePopover:React.FC<RenamePopoverprops>=({
    id
})=>{
const [referenceElement,setReferenceElement]=useState<HTMLElement|null>(null);
const [popperElement,setPopperElement]=useState<HTMLElement|null>(null);
const {attributes,styles}=usePopper(referenceElement,popperElement,{
    placement:'auto'
})
const router=useRouter();
const [value,setValue]=useState('');
const RenameButton=()=>{
axios.post(`/api/document/${id}/title`,{Title:value})
.then((response)=>{
toast.success('Renamed successfully')
}).catch((error:any)=>{
    toast.error('error while renaming')
}).then(()=>{
    router.refresh();
})
}
const handleChange=(e:any)=>{
     
setValue(e.target.value);
}

return <>
<Popover>
    {({close})=>(
        <>
<Popover.Button
ref={setReferenceElement}>
<div
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
  Rename
</p>
 <MdDriveFileRenameOutline size={15}/>
 </div>
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
className="
rounded-lg
border-none
outline-none
p-4
bg-white
ring-[0.75px]
ring-gray-200
flex
flex-col
">
<p
className="
text-gray-600

">
    Rename the Document!
</p>
    <input
    value={value}
    onChange={handleChange}
    className="
    bg-white
    ring-1
    ring-gray-300
    rounded-lg
    mt-1
    focus:ring-green-500
    outline-none
    border-none
    " type="text" />
    <div
    className="
    mt-2
    flex
    flex-row
    bg-white
    items-centre
    justify-between

    ">
<button
onClick={RenameButton}
className="
hover:bg-green-500
hover:text-white
ring-1
px-1
rounded-md
ring-green-500
text-md
font-md
text-green-500">Ok</button>
<button
 onClick={()=>close()}
className="
hover:bg-red-500
hover:text-white
ring-1
px-1
rounded-md
ring-red-500
text-md
font-md
text-red-500">Cancel</button>
    </div>

</div>
    </Popover.Panel>
</Transition>
</>
)}
</Popover>

</>



}
export default RenamePopover;