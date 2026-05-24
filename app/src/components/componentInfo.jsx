import React from 'react'

const ComponentInfo = ({ comp, fab }) => {
    console.log(comp, fab)
    return (
        <div className="mt-4 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <span className='text-gray-600 font-lg'>Detalhes do componente  {comp}</span>
        </div>
    )
}

export default ComponentInfo