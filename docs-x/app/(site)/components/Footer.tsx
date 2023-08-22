"use client";
import {AiFillHeart} from "react-icons/ai";
const Footer=()=>{
    return <>
    <div
    className="
    flex 
    flex-row
    items-center
    justify-center
    gap-1
    text-gray-500
    ">
        Built with <AiFillHeart  size={24} className="text-red-500"/>  By Haseeb Khan
    </div>
    </>
}

export default Footer;