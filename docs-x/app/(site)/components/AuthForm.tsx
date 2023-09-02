"use client";
import {redirect, useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "./Button";
import {FcGoogle} from "react-icons/fc";
import {BsGithub} from "react-icons/bs";
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

const handleClick=(action:string)=>{
    setIsLoading(true);
    signIn(action,{
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
 <div
 className="
 flex
 flex-col
 gap-3
 ">
<Button
text="Continue with google"
Icon={FcGoogle}
disabled={isLoading}
onClick={()=>{handleClick("google")}}
primary
iconSize={30}
/>
<Button
text="Continue with github"
Icon={BsGithub}
disabled={isLoading}
onClick={()=>{handleClick("github")}}
primary
iconSize={30}
/>
</div> 
</>

}


export default AuthForm;