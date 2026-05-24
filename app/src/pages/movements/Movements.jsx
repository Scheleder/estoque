import React, { useEffect, useState } from 'react';
import { api }  from '@/services/config';
import Loading from '@/components/loading';
import { Eye, CloudDownload, ArrowUpDown, Filter } from "lucide-react"
import { Link } from 'react-router-dom';
import { getDate } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ErrorPage from "../utils/ErrorPage"
import ButtonExport from '@/components/buttonExport';

const Movements = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(true);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('movements');
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

  return (
    <div className="pl-16 pt-20">
      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <div className="mt-2 relative overflow-x-auto shadow-lg rounded-md mr-2 p-2 pb-0 bg-gray-200">
            FILTRAR
          </div>

          <div className="mt-2 relative overflow-x-auto shadow-lg rounded-md mr-2 p-2 pb-0 bg-gray-200">
            <div className='overflow-x-auto rounded-md shadow-md'>
              <table className="w-full text-xs xs:text-sm text-blue-900">
                <caption className="caption-bottom my-1 text-gray-400">
                  Total de registros: {data.length}
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
                    data.map((dt, index) => (
                      <tr key={index} className='odd:bg-stone-200 even:bg-stone-300 hover:bg-blue-100 font-semibold'>
                        <td className='px-2 py-1'>{getDate(dt.createdAt)}</td>
                        <td className='p-1'>{dt.type}</td>
                        <td className='p-1'>{dt.destination}</td>
                        <td className='p-1'>{dt.quantity} {dt.Item.Component.Unity.abrev}</td>
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
