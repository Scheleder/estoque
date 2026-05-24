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
import { EllipsisVertical, Link as WWW, Save, ArrowUpDown, PenBox, Eye } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form";

const BrandDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(false);
  const [data, setData] = useState([]);
  const { register, handleSubmit } = useForm();
  const { toast } = useToast();

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get(`brands/${id}`);
      setBrand(response.data.brand);
      console.log(response.data.brand);
      var sorted = response.data.brand.Components.sort((a, b) => a.description.localeCompare(b.description));
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

    try {
      setIsProcessing(true);
      const response = await api.put(`brands/${id}`, values);
      setBrand(response.data.brand);
      console.log(response.data.brand);
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
  const handleContact = (web) => {
    console.log("Contato enviado!");
    return navigate(web);
  };

  const orderByDescription = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderBySku = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.sku.localeCompare(b.sku)
        : b.sku.localeCompare(a.sku);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByCategory = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.Category.name.localeCompare(b.Category.name)
        : b.Category.name.localeCompare(a.Category.name);
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
        <div className="error">Erro ao carregar os dados: {error.message}</div>
      ) : (
        <div className="pl-16 pt-20">
          <div className="mt-2 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <form onSubmit={handleSubmit(mySubmit)}>
              <div className='grid grid-cols-3 mb-2'>
                <div className='col-span-2 mt-2'>
                  <label>Fabricante:</label>
                </div>
                <div className='mt-2'>
                  <label className='mt-2'>Data do cadastro:</label>
                </div>
                <div className='flex col-span-2'>
                  <Input {...register("name", { required: true })} className=" mr-4" defaultValue={brand.name} />
                </div>
                <div className='col-span-1'>
                  <Input className=" text-center" value={getDate(brand.createdAt)} readOnly />
                </div>
                <div className='col-span-3 mt-2 relative'>
                  <label>Website:</label>
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" title="Visitar" className='absolute text-blue-500 hover:text-blue-400 top-9 left-2 cursor-pointer'><WWW className='w-4 h-4' /></a>
                </div>
                <div className='flex col-span-3'>
                  <Input {...register("website", { required: true })} className=" pl-8" defaultValue={brand.website} />
                  <Button type="submit" className="ml-4 bg-blue-700 hover:bg-blue-500"><Save className='w-4 h-4 mr-2' /> Salvar alterações</Button>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-4 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <span className='text-gray-600 font-lg'>Componentes do Fabricante {brand.name}</span>
            <div className='overflow-x-auto rounded-md shadow-md mt-2'>
              <table className="w-full text-xs xs:text-sm text-blue-900">
                <caption className="caption-bottom my-1 text-gray-400">
                  Total de registros: {data.length}
                </caption>
                <thead>
                  <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                    <th className=''><ArrowUpDown size={12} className='ml-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByCategory} />
                      <span className='ml-6'>Categoria</span><FilterList /></th>
                    <th className=''><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByDescription} />
                      <span className='ml-4'>Descrição</span><FilterList /></th>
                    <th className=''><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderBySku} />
                      <span className='ml-4'>SKU</span><FilterList /></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((dt, index) => (
                      <tr key={index} className='odd:bg-stone-300 even:bg-stone-200 hover:bg-blue-100 font-semibold'>
                        <td className='p-1'>{dt.Category.name}</td>
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
                                  <span className="flex"><Eye className='w-4 h-4 mt-0.5 mr-2 text-gray-400' />
                                    Visualizar
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
        </div>
      )}
    </>
  )
}

export default BrandDetails