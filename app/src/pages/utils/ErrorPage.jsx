import { CircleX } from 'lucide-react'
import React from 'react'

const ErrorPage = ({ error }) => {
  return (

      <div className="fixed z-0 bottom-0 align-middle border-2 border-red-700 rounded-lg bg-gray-300 opacity-40 p-4 w-96 m-2">
          <CircleX className='text-red-700 mr-2 mt-1' /> 
        <span className='font-semibold text-xl text-red-700'>
          {error.message}
        </span>
      </div>

  )
}

export default ErrorPage