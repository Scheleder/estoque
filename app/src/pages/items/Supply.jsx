import { React, useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router';
import { api }  from '@/services/config';
import Select from 'react-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ButtonAdd from '@/components/buttonAdd'
import Loading from '@/components/loading';
import { Check, CircleCheck } from 'lucide-react';
import { CategoryAdd } from '../categories/CategoryAdd';
import { BrandAdd } from '../brands/BrandAdd';
import ErrorPage from "../utils/ErrorPage"
import { ComponentAdd } from '../components/ComponentAdd';
import { useToast } from "@/components/ui/use-toast"

const Supply = (props) => {
  const { control, register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [unity, setUnity] = useState('')
  const styles = { menu: base => ({ ...base, marginTop: 0 }) };
  const { toast } = useToast()
  const navigate = useNavigate()

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('components');
      const sortedComponents = response.data
        .map(item => ({ value: item.id, label: item.description, unity: item.Unity.abrev }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setComponents(sortedComponents);

    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const mySubmit = async (values) => {
    console.log(values);
    try {
      setIsProcessing(true);
      const response = await api.post('/items', values);
      console.log(response);
      if (response.status === 201) {
        setData(response.data.item);
        toast({
          title: "Sucesso!",
          description: response.data.msg,
        });
      } else {
        toast({
          title: "Falha!",
          description: response.data.msg,
        });
      }
      setTimeout(function () {
        navigate(0);
      }, 1500);
    } catch (err) {
      setError(err);
      console.log(err);
      toast({
        title: "Erro!",
        description: err,
      });
    } finally {
      setIsProcessing(false);
    }
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
              <div className='grid grid-cols-4 mb-2'>
                <div className='relative col-span-4 mt-2'>
                  <label>Componente:</label>
                  <div className='absolute top-4 right-0'><ComponentAdd /></div>
                </div>
                <div className='flex col-span-4'>
                  <Controller
                    name="componentId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={categories.find(option => option.value === field.value)}
                        options={components}
                        placeholder="Selecione o componente"
                        className="w-full mr-36"
                        styles={styles}
                        onChange={(selected) => field.onChange(selected.value).then(setUnity(selected.unity))}
                      />
                    )}
                  />
                </div>
                <div className='col-span-1 mt-2 relative'>
                  <label>Quantidade:</label>
                  <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                </div>
                <div className='col-span-1 mt-2 relative'>
                  <label>Quantidade mínima:</label>
                  <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                </div>
                <div className='col-span-1 mt-2'>
                  <label>Endereço:</label>
                </div>
                <div></div>
                <div className='mr-4'><Input {...register("quantity", { required: true })} placeholder="0" type="number" min="0" max="999999999" ></Input></div>
                <div className='mr-4'><Input {...register("minimum", { required: true })} placeholder="0" type="number" min="0" max="999999999" ></Input></div>
                <div className='mr-4'><Input {...register("adress", { required: true })} placeholder="Endereço de estoque" className=" text-center"></Input></div>
                <div className='mr-2'><Button className="w-full hover:bg-gray-500"> <Check className='w-5 h-5 mr-2' /> Confirmar</Button></div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Supply