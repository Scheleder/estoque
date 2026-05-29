import React, { useEffect, useState } from 'react';
import { api }  from '@/services/config';
import Loading from '@/components/loading';
import { Eye, CloudDownload, ArrowUpDown, Filter } from "lucide-react"
import { Link } from 'react-router-dom';
import { getDate, formatQuantity } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ErrorPage from "../utils/ErrorPage"
import ButtonExport from '@/components/buttonExport';
import { Button } from '@/components/ui/button';

const Movements = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(true);

  const [dataIni, setDataIni] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchSku, setSearchSku] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchDest, setSearchDest] = useState('');

  const getData = async (params = {}) => {
    try {
      setIsProcessing(true);
      const response = await api.get('movements', { params });
      var sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sorted);
      console.log(response.data);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFilter = () => {
    const params = {};
    if (dataIni) params.dataIni = dataIni;
    if (dataFim) params.dataFim = dataFim;
    getData(params);
  };

  const handleClear = () => {
    setDataIni('');
    setDataFim('');
    setSearchUser('');
    setSearchSku('');
    setSearchType('');
    setSearchDest('');
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const orderByDate = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByType = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByDestination = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.destination.localeCompare(b.destination)
        : b.destination.localeCompare(a.destination);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderBySku = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.itemId - b.itemId
        : b.itemId - a.itemId;
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByUser = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.User.name.localeCompare(b.User.name)
        : b.User.name.localeCompare(a.User.name);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const filteredData = data.filter(dt => {
    const typeMatch = !searchType || (dt.type || '').toLowerCase().includes(searchType.toLowerCase());
    const destMatch = !searchDest || (dt.destination || '').toLowerCase().includes(searchDest.toLowerCase());
    const skuMatch = !searchSku || (dt.Item?.Component?.sku || '').toLowerCase().includes(searchSku.toLowerCase());
    const userMatch = !searchUser || (dt.User?.name || '').toLowerCase().includes(searchUser.toLowerCase());
    return typeMatch && destMatch && skuMatch && userMatch;
  });

  return (
    <div className="pl-16 pt-20">
      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <div className="mt-2 shadow-md rounded-xl p-6 bg-gray-50 border border-gray-100 mr-2 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-gray-700">Data Inicial:</label>
                <input
                  type="date"
                  value={dataIni}
                  onChange={(e) => setDataIni(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-gray-700">Data Final:</label>
                <input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-gray-700">Colaborador:</label>
                <input
                  type="text"
                  placeholder="Filtrar por colaborador..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-gray-700">Item SKU:</label>
                <input
                  type="text"
                  placeholder="Filtrar por SKU..."
                  value={searchSku}
                  onChange={(e) => setSearchSku(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-gray-700">Tipo de Movimentação:</label>
                <input
                  type="text"
                  placeholder="Filtrar por tipo..."
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-gray-700">Destino:</label>
                <input
                  type="text"
                  placeholder="Filtrar por destino..."
                  value={searchDest}
                  onChange={(e) => setSearchDest(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex gap-2 justify-end mt-4 sm:mt-0">
                <Button
                  onClick={handleFilter}
                  className="bg-blue-700 hover:bg-blue-600 text-white font-semibold text-xs py-1.5 px-4 rounded-md flex items-center gap-1.5 h-8"
                >
                  <Filter className="w-3.5 h-3.5" /> Filtrar
                </Button>
                <Button
                  onClick={handleClear}
                  variant="ghost"
                  className="text-gray-700 bg-gray-300 hover:text-gray-950 font-medium text-xs py-1.5 px-4 rounded-md h-8"
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 relative overflow-x-auto shadow-md rounded-xl p-6 bg-gray-50 border border-gray-100 mr-2">
            <div className='overflow-x-auto rounded-md shadow-md'>
              <table className="w-full text-xs xs:text-sm text-blue-900">
                <caption className="caption-bottom my-1 text-gray-400">
                  Total de registros: {filteredData.length}
                </caption>
                <thead>
                  <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                    <th>
                      <ArrowUpDown size={12} className='ml-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByDate} />
                      <span className='ml-6'>Data</span>
                    </th>
                    <th><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByType} />
                      <span className='ml-4'>Tipo</span></th>
                    <th><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByDestination} />
                      <span className='ml-4'>Destino</span></th>
                    <th>Quantidade</th>
                    <th><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderBySku} />
                      <span className='ml-4'>Item SKU</span></th>
                    <th><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByUser} />
                      <span className='ml-4'>Colaborador</span></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredData.map((dt, index) => (
                      <tr key={index} className='odd:bg-stone-200 even:bg-stone-300 hover:bg-blue-100 font-semibold'>
                        <td className='px-2 py-1'>{getDate(dt.createdAt)}</td>
                        <td className='p-1'>{dt.type}</td>
                        <td className='p-1'>{dt.destination}</td>
                        <td className='p-1'>{formatQuantity(dt.quantity, dt.Item?.Component?.Unity?.decimal)} {dt.Item?.Component?.Unity?.abrev}</td>
                        <td className='p-1'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link to={`/items/${dt.Item.id}`}>
                                  <span>{dt.Item.Component.sku}</span>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-white">{dt.Item.Component.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                        <td className='p-1'>{dt.User.name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <ButtonExport />
          </div>
        </>
      )}
    </div>
  );
};

export default Movements;
