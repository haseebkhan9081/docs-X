import AuthForm from "./components/AuthForm";
import Footer from "./components/Footer";

const Login=()=>{
    return <>
    
    <div
    className="h-full
    w-full
    bg-my-white
   
    ">
     
    <div
    className="
    h-full
    text-center
    justify-center
    flex
    flex-col
    gap-36
    "
    >
     <div
     className="
     font-bold
     text-6xl
     
     "
     >
      Docs-X </div> 
  <AuthForm/>
   
    </div>
    <div
    className="
    w-full
    fixed
    text-center
    left-0
    bottom-0
    ">
    <Footer/>
    </div>
    </div>
    </>
}

export default Login;