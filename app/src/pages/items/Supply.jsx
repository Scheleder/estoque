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
import { LocalAdd } from '../locals/LocalAdd';
import { useToast } from "@/components/ui/use-toast"

const Supply = (props) => {
  const { control, register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [components, setComponents] = useState([]);
  const [locals, setLocals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [unity, setUnity] = useState('')
  const styles = {
    menu: base => ({ ...base, marginTop: 0 }),
    control: base => ({ ...base, backgroundColor: 'white' })
  };
  const { toast } = useToast()
  const navigate = useNavigate()

  const getData = async () => {
    try {
      setIsProcessing(true);
      const [responseComponents, responseLocals] = await Promise.all([
        api.get('components'),
        api.get('locals')
      ]);

      const sortedComponents = responseComponents.data
        .map(item => ({ value: item.id, label: item.description, unity: item.Unity.abrev }))
        .sort((a, b) => a.label.localeCompare(b.label));

      const sortedLocals = responseLocals.data
        .map(item => ({ value: item.id, label: item.name }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setComponents(sortedComponents);
      setLocals(sortedLocals);

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
        <div className="pl-16 pt-20 pr-4 pb-6">
          <div className="mt-2 shadow-md rounded-xl p-6 bg-gray-50 border border-gray-100 mr-2">
            <form onSubmit={handleSubmit(mySubmit)}>
              <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2'>
                <div className='col-span-1 sm:col-span-4 flex flex-col gap-1.5'>
                  <label className="font-semibold text-sm text-gray-700">Estoque:</label>
                  <div className='flex gap-2 items-center w-full'>
                    <div className='flex-1'>
                      <Controller
                        name="localId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={locals.find(option => option.value === field.value)}
                            options={locals}
                            placeholder="Selecione o estoque (Local)"
                            className="w-full text-sm"
                            styles={styles}
                            onChange={(selected) => field.onChange(selected.value)}
                          />
                        )}
                      />
                    </div>
                    <div className='flex-shrink-0'>
                      <LocalAdd />
                    </div>
                  </div>
                </div>
                
                <div className='col-span-1 sm:col-span-4 flex flex-col gap-1.5 mt-2'>
                  <label className="font-semibold text-sm text-gray-700">Componente:</label>
                  <div className='flex gap-2 items-center w-full'>
                    <div className='flex-1'>
                      <Controller
                        name="componentId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={components.find(option => option.value === field.value)}
                            options={components}
                            placeholder="Selecione o componente"
                            className="w-full text-sm"
                            styles={styles}
                            onChange={(selected) => {
                              field.onChange(selected.value);
                              setUnity(selected.unity);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className='flex-shrink-0'>
                      <ComponentAdd />
                    </div>
                  </div>
                </div>

                 <div className='col-span-1 sm:col-span-1 mt-2 flex flex-col gap-1.5 relative'>
                  <label className="font-semibold text-sm text-gray-700">Quantidade:</label>
                  <div className="relative">
                    <Input {...register("quantity", { required: true })} placeholder="0" type="number" min="0" max="999999999" className="pr-12 bg-white" />
                    {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                  </div>
                </div>

                <div className='col-span-1 sm:col-span-1 mt-2 flex flex-col gap-1.5 relative'>
                  <label className="font-semibold text-sm text-gray-700">Quantidade mínima:</label>
                  <div className="relative">
                    <Input {...register("minimum", { required: true })} placeholder="0" type="number" min="0" max="999999999" className="pr-12 bg-white" />
                    {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                  </div>
                </div>

                <div className='col-span-1 sm:col-span-1 mt-2 flex flex-col gap-1.5'>
                  <label className="font-semibold text-sm text-gray-700">Endereço:</label>
                  <Input {...register("adress", { required: true })} placeholder="Endereço de estoque" className="text-center bg-white" />
                </div>

                <div className='col-span-1 sm:col-span-1 flex items-end mt-4 sm:mt-0'>
                  <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-700 text-white font-semibold flex items-center justify-center gap-2">
                    <Check className='w-5 h-5' /> Confirmar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Supply