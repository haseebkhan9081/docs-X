import React, { Children } from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div
    className=" 
    h-full">{children}</div>
  )
}
