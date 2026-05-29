import { React, useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/services/config';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import { ArrowRightLeft, Milestone, Shuffle, SquarePlus, SquareMinus, PlaneLanding, PlaneTakeoff, CircleMinus, CirclePlus, Check, FileText, Warehouse, SlidersVertical, Replace, ReplaceAll } from 'lucide-react';
import ErrorPage from "../utils/ErrorPage";
import { useToast } from "@/components/ui/use-toast";
import Scanner from '@/components/scanner';

const userId = localStorage.userId ?? 1;
const localId = localStorage.localId ?? 1;

const types = [
  { id: 1, value: 'Ajuste de estoque', label: 'Ajuste de estoque' },
  { id: 2, value: 'Alterar endereço de estoque', label: 'Alterar endereço de estoque' },
  { id: 3, value: 'Consumo na ordem', label: 'Consumo na ordem' },
  { id: 4, value: 'Entrada de material', label: 'Entrada de material' },
  { id: 5, value: 'Saída de material', label: 'Saída de material' },
  { id: 6, value: 'Transferência para outro estoque', label: 'Transferência para outro estoque' },
]

const Takeout = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { control, register, handleSubmit, setValue } = useForm();
  const [items, setItems] = useState([]);
  const [locals, setLocals] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [unity, setUnity] = useState('');
  const [qtde, setQtde] = useState('');
  const [adress, setAdress] = useState('');
  const [type, setType] = useState(null);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && (user.admin === true || user.admin === 1);
  const availableTypes = isAdmin ? types : types.filter(t => t.id !== 1);
  const styles = {
    menu: base => ({
      ...base,
      marginTop: 0,
      zIndex: 9999
    }),
    control: (base) => ({
      ...base,
      paddingLeft: '2.5rem'
    }),
    option: (base) => ({
      ...base,
      paddingLeft: '2.5rem'
    }),
    singleValue: (base) => ({
      ...base,
      paddingLeft: '2.5rem'
    }),
    placeholder: (base) => ({
      ...base,
      paddingLeft: '2.5rem'
    }),
  };

  const getData = async () => {
    try {
      setIsProcessing(true);

      const [response1, response2] = await Promise.all([
        api.get('items'),
        api.get('locals')
      ]);

      const sortedItems = response1.data
        .map(item => ({
          value: item.id,
          label: `${item.adress} ░ ${item.Component.description} ░ ${item.Component.Brand.name}`,
          unity: item.Component.Unity.abrev,
          adress: item.adress,
          qtde: item.quantity
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setItems(sortedItems);

      const sortedLocals = response2.data
        .map(item => ({ value: item.id, label: item.name }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setLocals(sortedLocals);

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
    setValue("userId", userId);
    setValue("localId", localId);
    if (id) {
      const defaultValue = items.find(item => item.value == id); 
      console.log(defaultValue)
      if (defaultValue) {
        setValue('itemId', defaultValue.value);
        changeUnity(defaultValue)
      }
    }

  }, [setValue, items]);


  const changeUnity = (option) => {
    console.log(option);
    setUnity(option.unity);
    setQtde(option.qtde);
    setAdress(option.adress);
    setValue("itemId", option.value);
    if (type?.id != 3) {
      setValue("destination", option.adress)
    }
    setValue("quantity", option.qtde)
  };

  const changeType = (option) => {
    setType(option);
    setValue("type", option.value);
  };

  const mySubmit = async (values) => {
    try {
      setIsProcessing(true);
      const response = await api.post('/movements', values);
      console.log('API response:', response);
      if (response.status === 201) {
        toast({
          title: "Sucesso!",
          description: response.data.msg,
        });
        setTimeout(function () {
          navigate(0);
        }, 1500);
      } else {
        toast({
          title: "Falha!",
          description: response.data.msg,
        });
      }
    } catch (err) {
      setError(err);
      console.log(err);
      toast({
        title: "Erro!",
        description: err.message || "Ocorreu um erro",
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
            <div className='grid grid-cols-1 gap-4 mb-4'>
              <div className='flex flex-col gap-1.5 relative'>
                <label className="font-semibold text-sm text-gray-700">Item:</label>
                <div className='relative w-full'>
                  <span className='absolute z-10 top-2 left-2' title="Scanner"><Scanner /></span>
                  <Controller
                    name="itemId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={items.find(option => option.value === field.value)}
                        options={items}
                        placeholder="Selecione o item"
                        className="w-full text-sm"
                        styles={styles}
                        onChange={(selected) => {
                          field.onChange(selected.value);
                          changeUnity(selected);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              {unity && (
                <div className='flex flex-col gap-1.5 mt-2 relative'>
                  <label className="font-semibold text-sm text-gray-700">Tipo de movimentação:</label>
                  <div className='relative w-full'>
                    <span className='absolute z-10 top-2.5 left-3 text-gray-400'>
                      {type && type.id === 1 && (<SlidersVertical className="w-5 h-5 text-gray-500" />)}
                      {type && type.id === 2 && (<Shuffle className="w-5 h-5 text-gray-500" />)}
                      {type && type.id === 3 && (<FileText className="w-5 h-5 text-gray-500" />)}
                      {type && type.id === 4 && (<PlaneLanding className="w-5 h-5 text-gray-500" />)}
                      {type && type.id === 5 && (<PlaneTakeoff className="w-5 h-5 text-gray-500" />)}
                      {type && type.id === 6 && (<ArrowRightLeft className="w-5 h-5 text-gray-500" />)}
                    </span>
                    <Controller
                      name="type"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={availableTypes.find(option => option.value === field.value)}
                          options={availableTypes}
                          placeholder="Selecione o tipo de movimentação"
                          className="w-full text-sm"
                          styles={styles}
                          onChange={(selected) => {
                            field.onChange(selected.value);
                            changeType(selected);
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
            {type && (
              <form onSubmit={handleSubmit(mySubmit)}>
                <input type="hidden" {...register("userId", { required: true })} />
                {type.id === 1 && (
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2'>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade atual:</label>
                      <div className="relative">
                        <Input value={qtde} readOnly className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Nova quantidade:</label>
                      <div className="relative">
                        <Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0} className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex items-end mt-4 sm:mt-0'>
                      <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-700 text-white font-semibold flex items-center justify-center gap-2">
                        <Check className='w-5 h-5' /> Confirmar
                      </Button>
                    </div>
                  </div>
                )}
                {type.id === 2 && (
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2'>
                    <div className='flex flex-col gap-1.5 mt-2'>
                      <label className="font-semibold text-sm text-gray-700">Endereço atual:</label>
                      <Input className="text-center bg-white" value={adress} readOnly />
                    </div>
                    <div className='flex flex-col gap-1.5 mt-2'>
                      <label className="font-semibold text-sm text-gray-700">Novo endereço:</label>
                      <Input {...register("destination", { required: true })} placeholder="Novo endereço" type="text" defaultValue="" className="text-center bg-white" />
                    </div>
                    <div className='flex items-end mt-4 sm:mt-0'>
                      <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-700 text-white font-semibold flex items-center justify-center gap-2">
                        <Check className='w-5 h-5' /> Confirmar
                      </Button>
                    </div>
                  </div>
                )}
                {type.id === 3 && (
                  <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2'>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade em estoque:</label>
                      <div className="relative">
                        <Input value={qtde} readOnly className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade utilizada:</label>
                      <div className="relative">
                        <Input {...register("quantity", { required: true })} type="number" min="0" max="999999" className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex flex-col gap-1.5 mt-2'>
                      <label className="font-semibold text-sm text-gray-700">Número da ordem:</label>
                      <Input {...register("destination", { required: true })} type="text" className="text-center bg-white" placeholder="Ex: OS-1234" />
                    </div>
                    <div className='flex items-end mt-4 sm:mt-0'>
                      <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-700 text-white font-semibold flex items-center justify-center gap-2">
                        <Check className='w-5 h-5' /> Confirmar
                      </Button>
                    </div>
                  </div>
                )}
                {type.id === 4 && (
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2'>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade atual:</label>
                      <div className="relative">
                        <Input value={qtde} readOnly className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade adicionada:</label>
                      <div className="relative">
                        <Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0} className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex items-end mt-4 sm:mt-0'>
                      <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-700 text-white font-semibold flex items-center justify-center gap-2">
                        <Check className='w-5 h-5' /> Confirmar
                      </Button>
                    </div>
                  </div>
                )}
                {type.id === 5 && (
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2'>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade atual:</label>
                      <div className="relative">
                        <Input value={qtde} readOnly className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade retirada:</label>
                      <div className="relative">
                        <Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0} className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex items-end mt-4 sm:mt-0'>
                      <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-700 text-white font-semibold flex items-center justify-center gap-2">
                        <Check className='w-5 h-5' /> Confirmar
                      </Button>
                    </div>
                  </div>
                )}
                {type.id === 6 && (
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2'>
                    <div className='col-span-1 sm:col-span-3 mt-2 flex flex-col gap-1.5 relative'>
                      <label className="font-semibold text-sm text-gray-700">Estoque destino:</label>
                      <div className="relative">
                        <span className='absolute z-10 top-2.5 left-3 text-gray-400' title="Scanner"><Warehouse className="w-5 h-5" /></span>
                        <Controller
                          name="destination"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={locals.find(option => option.value === field.value)}
                              options={locals}
                              placeholder="Estoque destino"
                              className="w-full text-sm"
                              styles={styles}
                              onChange={(selected) => field.onChange(selected.label)}
                            />
                          )}
                        />
                      </div>
                               <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade atual:</label>
                      <div className="relative">
                        <Input value={qtde} readOnly className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>
                    <div className='flex flex-col gap-1.5 mt-2 relative'>
                      <label className="font-semibold text-sm text-gray-700">Quantidade transferida:</label>
                      <div className="relative">
                        <Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0} className="bg-white pr-12 text-center" />
                        {unity && <span className='absolute right-3 top-2.5 text-gray-400 text-sm font-medium'>{unity}</span>}
                      </div>
                    </div>            </div>
                    <div className='flex items-end mt-4 sm:mt-0'>
                      <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-700 text-white font-semibold flex items-center justify-center gap-2">
                        <Check className='w-5 h-5' /> Confirmar
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default Takeout;
