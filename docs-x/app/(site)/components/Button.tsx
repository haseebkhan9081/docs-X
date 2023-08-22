import clsx from "clsx";
 
interface Buttonprops{
    disabled?:boolean,
    primary?:boolean,
    secondary?:boolean
    type?:"button" | "submit" | "reset" | undefined,
    text?:string,
    Icon?:React.ElementType,
    onClick?:()=>void,
    iconSize?:Number,
    small?:boolean
}
const Button:React.FC<Buttonprops>=({
    disabled,
    primary,
    secondary,
    type,
    text,
    Icon,
    onClick,
    iconSize,
    small
})=>{


return <>
<div
className="
text-lg
font-semibold
 text-center
 justify-center
flex
">
   
   <div
   onClick={onClick}
   className={clsx(
    `
    items-center
    ring-inset
    ring-1
    rounded-lg
    ring-opacity-100
    ring-my-black
    p-2
    flex
    flex-row
    gap-2
      hover:cursor-pointer
    
      
    `,
    primary && `
     hover:text-my-white
    hover:bg-my-black`,
    disabled && 'cursor-wait text-gray-500 opacity-80'
 ,  secondary && 'text-my-white bg-my-black',
 small && `
 text-md font-normal
  text-white bg-my-black 
   rounded-md 
 p-1 gap-1 py-[2px] ring-1
  hover:bg-white
   hover:text-black 
    hover:ring-1
  hover:ring-black ring-inset
   transition`
   )}
   >
    <button
    className="
    
    gap-2
    items-center
    flex
    flex-row"
    type={type}>
    {text}
     {Icon && <Icon size={iconSize}/>}</button>
   </div>
    
</div>
</>
}

export default Button;