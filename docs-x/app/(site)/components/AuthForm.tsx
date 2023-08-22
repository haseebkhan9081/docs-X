"use client";
import {redirect, useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "./Button";
import {FcGoogle} from "react-icons/fc";
import toast from "react-hot-toast";

function AuthForm(){
const router=useRouter();
const session=useSession()
const [isLoading,setIsLoading]=useState(false);
useEffect(()=>{
    if(session.status==='authenticated'){
router.push("/documents");
    }
},[session.status,router]);

const handleClick=()=>{
    setIsLoading(true);
    signIn("google",{
        redirect:false

    }).then((response)=>{
        if(response?.error){
            console.log("Lgin Failed!");
            toast.error('Failed to sign you In');
        }
        if(response?.ok && !response?.error ){
            console.log("SignIn seccessfull!")
            toast.success('LogedIn successfully!');
        }

    }).finally(()=>setIsLoading(false)) 
}
   

return<>
 
<Button
text="Continue with google"
Icon={FcGoogle}
disabled={isLoading}
onClick={handleClick}
primary
iconSize={30}
/>
 
</>

}


export default AuthForm;