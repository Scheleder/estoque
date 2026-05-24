import React from 'react'
import { Download, Plus } from "lucide-react"
import { Button } from '@/components/ui/button';

const ButtonExport = () => {
  return (
    <div className='flex text-right'><Button variant="outline" className="m-2 bg-red-600 hover:bg-red-500 text-white hover:text-white"><Download className="mr-2 w-4 h-4"/>Exportar PDF</Button></div>
  )
}

export default ButtonExport