import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';

const Pagetitle = ({title}) => {
  const navigate = useNavigate();

  return (
    <>
        <Button variant="ghost" className="ml-8 px-1 text-gray-500 hover:bg-blue-100" title="Voltar" onClick={() => navigate(-1)}><ChevronLeft className='hover:animate-ping'/> </Button><span className="ml-2 text-2xl text-gray-500">{title}</span>
    </>
  )
}

export default Pagetitle