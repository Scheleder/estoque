import React from 'react'
import { CloudDownload, Loader } from 'lucide-react'

const Loading = ({ title }) => {
  return (
    <div className="flex text-lime-600 animate-bounce p-16">
      <Loader className='animate-spin mt-1 mr-2 mb-2 h-4 w-4 bold' /><span className='font-thin'>Carregando...</span>
    </div>
  )
}

export default Loading