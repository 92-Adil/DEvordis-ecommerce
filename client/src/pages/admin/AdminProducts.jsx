import { Button } from '@/components/ui/button'
import React from 'react'
import CreatedProductTables from './CreatedProductTables'
import { useNavigate } from 'react-router-dom'

const AdminProducts = () => {
    const navigate=useNavigate()
  return (
    <div className='p-5'>
        <div className='flex-col space-y-4'>
            <Button onClick={()=>navigate("/admin/create")} className={"p-3 cursor-pointer"}>Create the New Products</Button>
            <div>
                <CreatedProductTables/>
            </div>
        </div>
    </div>
  )
}

export default AdminProducts