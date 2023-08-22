"use client";
import React, { Ref, useCallback, useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import io,{Socket} from "socket.io-client";
import { Document } from '@prisma/client';
import axios from 'axios';

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]
interface EditorProps{
  doc?:Document
}
const Editor:React.FC<EditorProps>=({
  doc
})=>{
  const [thumbNailUrl,setThumbNailUrl]=useState("");
    const [socket,setSocket]=useState
    <Socket|undefined>(undefined);
   const [quill,setQuill]=useState<Quill>();
   const generateThumbNail=useCallback(async()=>{
if(!quill){
  return;
}

try{
const canvas=await html2canvas(quill?.root);
setThumbNailUrl(canvas.toDataURL('image/png'));


}catch (error) {
  console.error('Error generating thumbnail:', error);
}
   },[quill]);


useEffect(()=>{
const s=io("http://localhost:3001");
console.log("connect from frontEnd");
setSocket(s);
return ()=>{
  s.disconnect()
}
},[])

useEffect(()=>{

  if(!doc||!quill||!socket){
    return ;
  }
  socket?.once('recieve-document',docu=>{
quill?.setContents(docu);

  });
  console.log("this is the doc we are sending to Server",doc);
  socket?.emit('send-document',doc);
  return ()=>{
    socket?.off('recieve-document',docu=>{
      
      
        });
  }
},[socket,quill,doc]);

useEffect(()=>{
  
  if(!doc||!quill||!socket){
    return ;
  }
 
  const interval=setInterval(()=>{
    generateThumbNail();
    console.log(thumbNailUrl,'this  is the generated url for thumbnail');

     axios.post(`/api/document/${doc.id}`,{data:quill?.getContents(),
      id:doc.id,thumbNail:thumbNailUrl})
     .then((response)=>{
console.log(response);
     }).catch((error:any)=>{
console.log(error);
     })
  },12000);
  return ()=>{
    clearInterval(interval);
  }
},[quill,socket,doc,thumbNailUrl]);

useEffect(()=>{
  if(socket===null||quill===null)return;
  const handler=(delta:any)=>{ 
console.log(delta);
quill?.updateContents(delta);
  }
  socket?.on('recieve-changes',handler);
  return ()=>{
    socket?.off('recieve-changes',handler);
  }
},[socket,quill]);


useEffect(()=>{
  if(socket===null||quill===null)return;

  const handler=(delta:any,oldDelta:any,source:any)=>{
if(source!=='user'){return}
socket?.emit('send-changes',delta);
  }
  quill?.on('text-change',handler);
  return ()=>{
    quill?.off('text-change',handler);
  }
},[socket,quill]);
const wrapperRef =useCallback(
      
      (wrapper:HTMLDivElement)=>{
       if(wrapper===null){
        return;
       }

        wrapper.innerHTML="";
  const editor=document.createElement("div");
  wrapper.appendChild(editor);
const q=new Quill(editor,{theme:"snow",modules:{toolbar:TOOLBAR_OPTIONS}});
setQuill(q);
},[])
  return<>
   
  <div
  className='container'
  ref={wrapperRef}>

  </div>
    </>
}


export default Editor;