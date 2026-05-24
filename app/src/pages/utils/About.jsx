import WareHouse from '@/assets/warehouse'
import React from 'react'

const About = (props) => {
  return (
    <div className="pl-16 pt-20 text-center justify-center">
      <a href="/api-docs" target='_blank' className='hover:bg-lime-500 hover:text-white text-lime-500 cursor-pointer bg-white p-2 border-1 rounded-md mt-16 ml-2' type='button'>{'{...} SWAGGER'}</a>
    </div>
  )
}

export default About