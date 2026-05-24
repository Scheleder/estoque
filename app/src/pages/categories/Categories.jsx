import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api }  from '@/services/config';
import Loading from '@/components/loading';
import { PenBox, Plus, ArrowUpDown, EllipsisVertical, ListFilter, X, RotateCcw } from "lucide-react"
import ButtonAdd from '@/components/buttonAdd';
import { CategoryAdd } from './CategoryAdd';
import FilterList from '@/components/filterList';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx"

const Categories = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('categories');
      var sorted = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setData(sorted);
      setFilteredData(sorted);
      console.log(response.data);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchItem]);

  const orderByName = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return asc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    });
    setFilteredData(sortedData);
    setAsc(!asc);
  };

  const filterItems = () => {
    const filteredItems = data.filter(a =>
      a.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const clearSearchItem = () => {
    setSearchItem('')
    setFilteredData(data)
  }

  return (
    <>

      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <div className="relative overflow-x-auto shadow-lg rounded-md">
          <div className='text-right'>
            <CategoryAdd />
          </div>
          <div className='overflow-x-auto rounded-md shadow-md m-2'>
            <table className="w-full text-xs xs:text-sm text-blue-800">
              <caption className="caption-bottom my-1">
                {searchItem ?
                  <span className='text-orange-600'>Total de registros com filtro: {filteredData.length}</span> :
                  <span className='text-gray-500'>Total de registros: {filteredData.length}</span>
                }
              </caption>
              <thead>
                <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                  <th className=''><ArrowUpDown size={12} className='ml-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByName} />
                    <span className='ml-6'>Categories</span>
                    <span className='relative'>
                      <input
                        type="text"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        className='w-32 ml-2 pl-2 rounded-sm text-xs text-orange-600'
                        placeholder='Filtrar...'
                      />
                      {searchItem ?
                        <RotateCcw size={12} className='absolute right-2 top-0.5 text-gray-600 hover:text-red-400 cursor-pointer' onClick={clearSearchItem} /> :
                        <ListFilter size={12} className='absolute right-2 top-0.5 text-gray-600' />
                      }
                    </span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredData.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-300 even:bg-stone-200 hover:bg-blue-100 font-semibold'>
                      <td className='px-2'>{dt.name}</td>
                      <td className='p-1'>
                        <DropdownMenu className="z-0">
                          <DropdownMenuTrigger asChild>
                            <EllipsisVertical className='text-gray-500 cursor-pointer' />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link to={`/categories/${dt.id}`}>
                                <span className="flex"><PenBox className='w-4 h-4 mt-0.5 mr-2 text-gray-400' />
                                  Editar
                                </span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;