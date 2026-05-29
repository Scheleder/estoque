import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api }  from '@/services/config';
import Loading from '@/components/loading';
import { PenBox, Eye, ArrowUpDown, EllipsisVertical, ListFilter, X, RotateCcw } from "lucide-react"
import ButtonAdd from '@/components/buttonAdd';
import { ComponentAdd } from './ComponentAdd';
import ErrorPage from "../utils/ErrorPage"
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

const Components = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [searchSku, setSearchSku] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('components');
      var sorted = response.data.sort((a, b) => a.description.localeCompare(b.description));
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
  }, [searchItem, searchBrand, searchCategory, searchSku]);

  const orderByBrand = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return asc
        ? a.Brand.name.localeCompare(b.Brand.name)
        : b.Brand.name.localeCompare(a.Brand.name);
    });
    setFilteredData(sortedData);
    setAsc(!asc);
  };

  const orderByDescription = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return asc
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description);
    });
    setFilteredData(sortedData);
    setAsc(!asc);
  };

  const orderBySku = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return asc
        ? a.sku.localeCompare(b.sku)
        : b.sku.localeCompare(a.sku);
    });
    setFilteredData(sortedData);
    setAsc(!asc);
  };

  const orderByCategory = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return asc
        ? a.Category.name.localeCompare(b.Category.name)
        : b.Category.name.localeCompare(a.Category.name);
    });
    setFilteredData(sortedData);
    setAsc(!asc);
  };

  const filterItems = () => {
    const filteredItems = data.filter(a =>
      a.description.toLowerCase().includes(searchItem.toLowerCase()) &&
      a.Brand.name.toLowerCase().includes(searchBrand.toLowerCase()) &&
      a.Category.name.toLowerCase().includes(searchCategory.toLowerCase()) &&
      a.sku.toLowerCase().includes(searchSku.toLocaleLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const clearSearchItem = () => {
    setSearchItem('')
    setFilteredData(data)
  }

  const clearSearchSku = () => {
    setSearchSku('')
    setFilteredData(data)
  }

  const clearSearchCategory = () => {
    setSearchCategory('')
    setFilteredData(data)
  }

  const clearSearchBrand = () => {
    setSearchBrand('')
    setFilteredData(data)
  }

  return (
    <>
      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />) : (
        <div className="relative overflow-x-auto shadow-lg rounded-md">
          <div className="mx-2 my-4 p-4 shadow-md rounded-xl bg-gray-50 border border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1">
              <div className="relative">
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">Categoria</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full px-3 py-1.5 pl-8 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Filtrar categoria..."
                  />
                  <ListFilter size={14} className="absolute left-2.5 top-2 text-gray-400" />
                  {searchCategory && (
                    <RotateCcw
                      size={14}
                      className="absolute right-2.5 top-2 text-gray-600 hover:text-red-500 cursor-pointer"
                      onClick={clearSearchCategory}
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">Fabricante</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                    className="w-full px-3 py-1.5 pl-8 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Filtrar fabricante..."
                  />
                  <ListFilter size={14} className="absolute left-2.5 top-2 text-gray-400" />
                  {searchBrand && (
                    <RotateCcw
                      size={14}
                      className="absolute right-2.5 top-2 text-gray-600 hover:text-red-500 cursor-pointer"
                      onClick={clearSearchBrand}
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">Descrição</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    className="w-full px-3 py-1.5 pl-8 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Filtrar descrição..."
                  />
                  <ListFilter size={14} className="absolute left-2.5 top-2 text-gray-400" />
                  {searchItem && (
                    <RotateCcw
                      size={14}
                      className="absolute right-2.5 top-2 text-gray-600 hover:text-red-500 cursor-pointer"
                      onClick={clearSearchItem}
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">SKU</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchSku}
                    onChange={(e) => setSearchSku(e.target.value)}
                    className="w-full px-3 py-1.5 pl-8 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Filtrar SKU..."
                  />
                  <ListFilter size={14} className="absolute left-2.5 top-2 text-gray-400" />
                  {searchSku && (
                    <RotateCcw
                      size={14}
                      className="absolute right-2.5 top-2 text-gray-600 hover:text-red-500 cursor-pointer"
                      onClick={clearSearchSku}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ComponentAdd />
            </div>
          </div>
          <div className='overflow-x-auto rounded-md shadow-md m-2'>
            <table className="w-full text-xs xs:text-sm text-blue-900">
              <caption className="caption-bottom my-1">
                {searchItem || searchBrand || searchCategory || searchSku ?
                  <span className='text-orange-600'>Total de registros com filtro: {filteredData.length}</span> :
                  <span className='text-gray-500'>Total de registros: {filteredData.length}</span>
                }
              </caption>
              <thead>
                <tr className="text-xs h-8 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                  <th className="py-2 pl-2 pr-4 relative">
                    <ArrowUpDown size={12} className="inline-block mr-1 hover:text-lime-400 cursor-pointer" onClick={orderByCategory} />
                    <span>Categoria</span>
                  </th>
                  <th className="py-2 px-4 relative">
                    <ArrowUpDown size={12} className="inline-block mr-1 hover:text-lime-400 cursor-pointer" onClick={orderByBrand} />
                    <span>Fabricante</span>
                  </th>
                  <th className="py-2 px-4 relative">
                    <ArrowUpDown size={12} className="inline-block mr-1 hover:text-lime-400 cursor-pointer" onClick={orderByDescription} />
                    <span>Descrição</span>
                  </th>
                  <th className="py-2 px-4 relative">
                    <ArrowUpDown size={12} className="inline-block mr-1 hover:text-lime-400 cursor-pointer" onClick={orderBySku} />
                    <span>SKU</span>
                  </th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredData.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-300 even:bg-stone-200 hover:bg-blue-100 font-semibold'>
                      <td className='px-2 py-1'>{dt.Category.name}</td>
                      <td className='p-1'>{dt.Brand.name}</td>
                      <td className='p-1'>{dt.description}</td>
                      <td className='p-1'>{dt.sku}</td>
                      <td className='p-1'>
                        <DropdownMenu className="z-0">
                          <DropdownMenuTrigger asChild>
                            <EllipsisVertical className='text-gray-500 cursor-pointer' />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link to={`/components/${dt.id}`}>
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

export default Components;