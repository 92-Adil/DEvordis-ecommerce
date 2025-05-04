import { Button } from '@/components/ui/button'
import React from 'react'
import {  useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate =useNavigate()
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center p-4">
    <h1 className="text-8xl font-extrabold  mb-4">404</h1>
    <p className="text-lg text-gray-700 mb-6">Your visited page not found. You may go home page.</p>
    <Button className={"bg-red-500 px-3 py-4 hover:bg-red-600 cursor-pointer"} onClick={()=>navigate("/")}>
        Go Back to Home
    </Button>
  </div>
  )
}

export default NotFound