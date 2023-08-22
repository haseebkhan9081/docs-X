"use client";

import { AiOutlineClose } from "react-icons/ai";

interface Emailprops{
    key:number,
    mail:string,
    Delete:()=>void
}
const Email:
React.FC<Emailprops>=({
    mail,
    Delete
})=>{
    const handleClick=()=>{
  Delete();
    }
    return <>
    <div
    className="
    text-sm
    text-green-500
    p-1
    bg-green-200/10
    rounded-md
relative
text-center
overflow-hidden
w-max

    "><span>{mail}</span>
    <button
    className="
    hover:text-red-600"
    type="button"
    onClick={handleClick}
    ><AiOutlineClose/></button></div>
    </>
}


export default Email;