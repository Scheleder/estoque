import React from 'react'
import { Eye, Search, ListFilter, Filter, BaggageClaim, ArrowUpDown } from "lucide-react"

function FilterList() {
    return (
        <>
            <span className='relative'><input type="text" className='w-32 ml-2 pl-2 rounded-sm text-xs' /><ListFilter size={12} className='absolute right-2 top-0.5 text-gray-600' /></span>
        </>
    )
}

export default FilterList
