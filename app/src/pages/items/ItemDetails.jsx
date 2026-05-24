import { useParams, useNavigate } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import { api }  from '@/services/config';
import { getDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import Pagetitle from '@/components/pagetitle';
import { Input } from '@/components/ui/input'
import Select from 'react-select'
import ComponentInfo from '@/components/componentInfo';
import ErrorPage from "../utils/ErrorPage"
import { Eye, Info, Save, ArrowUpDown, ShoppingCart } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
const styles = { menu: base => ({ ...base, marginTop: 0 }) };

const ItemDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [info, setInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(true);
  const [data, setData] = useState([]);


  const getData = async () => {
    try {
      setIsProcessing(true);

      const response = await api.get(`items/${id}`);
      setItem(response.data.item);
      var sorted = response.data.item.Movements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sorted);
      console.log(response.data.item);
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

  const getInfos = () => {
    !info ? setInfo(true) : setInfo(false);
  }

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
    <>
      {isProcessing ? (
        <div className="pl-16 pt-20">
          <Loading />
        </div>
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <div className="pl-16 pt-20">
          <div className="mt-2 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <div className='grid grid-cols-3 mb-2'>
              <div className='col-span-3 mt-2 relative'>
                <label>Componente:</label>
                <span onClick={getInfos} title="Informações sobre o componente" className='absolute text-orange-700 hover:text-lime-500 top-9 left-2 cursor-pointer'><Info className='w-4 h-4' /></span>
              </div>
              <div className='flex col-span-3'>
                <Input placeholder="Nome" className=" pl-8 mr-2" value={item.Component.description + ' - ' + item.Component.Brand.name} readOnly />
                <Link to={`/takeout/${item.id}`}>
                  <Button className="p-2 hover:bg-gray-600" title="Movimentar"><ShoppingCart /></Button>
                </Link>
              </div>
              <div className='col-span-1 mt-2'>
                <label>Endereço de estoque:</label>
              </div>
              <div className='col-span-1 mt-2 pl-4'>
                <label>Quantidade atual:</label>
              </div>
              <div className='col-span-1 mt-2 pl-4'>
                <label>Estoque mínimo:</label>
              </div>
              <div className='col-span-1'>
                <Input placeholder="Endereço" className=" text-center" value={item.adress} readOnly />
              </div>
              <div className='col-span-1 pl-4'>
                <Input placeholder="Qauntidade" className=" text-center" value={item.quantity} readOnly />
              </div>
              <div className='col-span-1 pl-4'>
                <Input placeholder="Mínimo" className=" text-center" value={item.minimum} readOnly />
              </div>
            </div>
          </div>

          {info ? (<ComponentInfo comp={item.Component.description} fab={item.Component.Brand.name} />) : null}

          <div className="mt-4 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <span className='text-gray-600 font-lg'>Movimentações: </span>
            <div className='overflow-x-auto rounded-md shadow-md m-2'>
              <table className="w-full text-xs xs:text-sm text-blue-900">
                <caption className="caption-bottom my-1 text-gray-400">
                  Total de registros: {item.Movements.length}
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
                        <td className='p-1'>{dt.quantity} </td>
                        <td className='p-1'>{dt.User.name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ItemDetails