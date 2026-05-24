import { useParams, useNavigate } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import { api }  from '@/services/config';
import { getDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import Pagetitle from '@/components/pagetitle';
import { Input } from '@/components/ui/input'
import FilterList from '@/components/filterList';
import { Link as WWW, Send, Save, ArrowUpDown, ShieldCheck, UserRound, KeyRound } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ErrorPage from "../utils/ErrorPage"
import { SendMail } from '../utils/SendMail';
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form";

const UserDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [asc, setAsc] = useState(true);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get(`users/${id}`);
      setUser(response.data.user);
      console.log(response.data.user);
      var sorted = response.data.user.Movements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sorted);
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

  const mySubmit = async (values) => {
    console.log(values)
    try {
      setIsProcessing(true);
      const response = await api.put(`users/${id}`, values);
      setUser(response.data.user);
      console.log(response.data.user);
      if (response.status === 200) {
        toast({
          title: "Atualizado!",
          description: response.data.msg,
        })
      } else {
        toast({
          title: "Falha!",
          description: response.data.msg,
        })
      }
    } catch (err) {
      setError(err);
      console.log(err);
      toast({
        title: "Erro!",
        description: err,
      })
    } finally {
      setIsProcessing(false);
    }
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

  const handleContact = () => {
    console.log("Contato enviado!");
    return navigate("/");
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
            <form onSubmit={handleSubmit(mySubmit)}>
              <div className='grid grid-cols-3 mb-2'>
                <div className='col-span-2 mt-2'>
                  <label>Nome:</label>
                </div>
                <div className='mt-2'>
                  <label className='mt-2'>Data do cadastro:</label>
                </div>
                <div className='flex col-span-2'>
                  <Input {...register("name", { required: true })} className=" mr-4" defaultValue={user.name} />
                </div>
                <div className='col-span-1'>
                  <Input placeholder="Registro" className=" text-center" value={getDate(user.createdAt)} readOnly />
                </div>
                <div className='col-span-3 mt-2'>
                  <label>E-mail:</label>
                </div>
                <div className='flex col-span-3 relative'>
                  <SendMail user={user.name} />
                  <Input {...register("email", { required: true })} className=" pl-8 mr-4" defaultValue={user.email} />
                  {user.admin ?
                    <Button className="bg-yellow-600 hover:bg-yellow-500"><ShieldCheck className='w-4 h-4 mr-2' />Adiministrador</Button> :
                    <Button className="bg-gray-500 :hover:bg-gray-400"><UserRound className='w-4 h-4 mr-2' />Usuário Padrão</Button>
                  }
                  <Button className="ml-4 bg-red-700 hover:bg-red-500"><KeyRound className='w-4 h-4 mr-2' /> Alterar senha</Button>
                  <Button type="submit" className="ml-4 bg-blue-700 hover:bg-blue-500"><Save className='w-4 h-4 mr-2' /> Salvar alterações</Button>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-4 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <span className='text-gray-600 font-lg'>Movimentações de {user.name}</span>
            <div className='overflow-x-auto rounded-md shadow-md mt-2'>
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

export default UserDetails