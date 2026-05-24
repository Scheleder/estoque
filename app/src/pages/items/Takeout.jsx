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
  const styles = {
    menu: base => ({
      ...base,
      marginTop: 0,
      zIndex: 9999
    }),
    control: (base) => ({
      ...base,
      paddingLeft: '1rem'
    }),
    option: (base) => ({
      ...base,
      paddingLeft: '1rem'
    }),
    singleValue: (base) => ({
      ...base,
      paddingLeft: '1rem'
    }),
    placeholder: (base) => ({
      ...base,
      paddingLeft: '1rem'
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
        <div className="pl-16 pt-20">
          <div className="mt-2 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <div className='grid grid-cols-3'>
              <div className='relative col-span-3 mt-2'>
                <label>Item:</label>
                <span className='absolute z-10 top-8 left-2' title="Scanner"><Scanner /></span>
              </div>
              <div className='col-span-3'>
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
                      className="w-full"
                      styles={styles}
                      onChange={(selected) => field.onChange(selected.value).then(changeUnity(selected))}
                    />
                  )}
                />
              </div>
              {unity && (
                <>
                  <div className='relative col-span-3 mt-2'>
                    <label>Tipo de movimentação:</label>
                    <span className='absolute z-10 top-8 left-2 text-gray-400'>
                      {type && type.id === 1 && (<><SlidersVertical /></>)}
                      {type && type.id === 2 && (<><Shuffle /></>)}
                      {type && type.id === 3 && (<><FileText /></>)}
                      {type && type.id === 4 && (<><PlaneLanding /></>)}
                      {type && type.id === 5 && (<><PlaneTakeoff /></>)}
                      {type && type.id === 6 && (<><ArrowRightLeft /></>)}
                    </span>
                  </div>
                  <div className='flex col-span-3'>
                    <Controller
                      name="type"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={types.find(option => option.value === field.value)}
                          options={types}
                          placeholder="Selecione o tipo de movimentação"
                          className="w-full"
                          styles={styles}
                          onChange={(selected) => field.onChange(selected.value).then(changeType(selected))}
                        />
                      )}
                    />
                  </div>
                </>
              )}
            </div>
            {type && (
              <form onSubmit={handleSubmit(mySubmit)}>
                <input type="hidden" {...register("userId", { required: true })} />
                {type.id === 1 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='relative mt-2'>
                      <label>Quantidade atual:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Nova quantidade:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 2 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='mt-2'>
                      <label>Endereço atual:</label>
                    </div>
                    <div className='relative mt-2'>
                      <label>Novo endereço:</label>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input className=" text-center" value={adress} readOnly /></div>
                    <div className='mr-4'><Input {...register("destination", { required: true })} placeholder="Novo endereço" type="text" defaultValue="" className="text-center" /></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 3 && (
                  <div className='grid grid-cols-4 mb-2'>
                    <div className='relative mt-2'>
                      <label>Quantidade em estoque:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade utilizada:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Número da ordem:</label>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999"></Input></div>
                    <div className='mr-4'><Input {...register("destination", { required: true })} type="text" className="text-center"></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className="mr-2" />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 4 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='relative mt-2'>
                      <label>Quantidade atual:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade adicionada:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 5 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='relative mt-2'>
                      <label>Quantidade atual:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade retirada:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 6 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='relative col-span-3 mt-2'>
                      <label>Estoque destino:</label>
                      <span className='absolute z-10 top-8 left-2 text-gray-400' title="Scanner"><Warehouse /></span>
                    </div>
                    <div className='col-span-3'>
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
                            className="w-full"
                            styles={styles}
                            onChange={(selected) => field.onChange(selected.label)}
                          />
                        )}
                      />
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade atual:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade transferida:</label>
                      <span className='absolute top-8 left-16 text-gray-900 text-sm'>{unity}</span>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
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
