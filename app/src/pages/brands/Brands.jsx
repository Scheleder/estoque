import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api }  from '@/services/config';
import Loading from '@/components/loading';
import ButtonAdd from '@/components/buttonAdd';
import { BrandAdd } from './BrandAdd';
import { useToast } from "@/components/ui/use-toast"
import { Filter, ListFilter, X, RotateCcw } from 'lucide-react';

const Brands = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast()
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('brands');
      var sorted = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setData(sorted);
      setFilteredData(sorted)
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
  }, [searchItem]);

  const filterItems = () => {
    const filteredItems = data.filter(a =>
        a.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredData(filteredItems);
};

const clearSearchItem = () => {
    setSearchItem('')
    setFilteredData(data)
}

  return (
    <>
      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <div>
          <div className='grid grid-cols-2'>
            <div className='text-left items-center'>
              <span className='relative'>
                <input
                  type="text"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className='w-40 h-6 pl-2 m-4 rounded-sm text-xs bg-gray-100 text-orange-600 border border-gray-300'
                  placeholder='Filtrar...'
                />
                {searchItem ?
                  <RotateCcw size={16} className='absolute left-36 top-1 text-gray-600 hover:text-red-400 cursor-pointer' onClick={clearSearchItem} /> :
                  <ListFilter size={16} className='absolute left-36 top-1 text-gray-600' />
                }
              </span>
            </div>
            <div className='text-right'>
              <BrandAdd />
            </div>
          </div>
          <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4">
            {filteredData.map((dt, index) => (
              <li key={index} className='w-80 grid grid-cols-3 shadow-lg rounded-md bg-indigo-100 p-2'>
                <div className=''>
                  <Link to={`/brands/${dt.id}`}>
                    <img src="src/assets/brand.png" alt="user" width={80} height={80} className='rounded-full border-2 border-white hover:border-blue-300 origin-center hover:rotate-45' />
                  </Link>
                </div>
                <div className='col-span-2'>
                  <div className='h-12 flex items-end'><span className='text-blue-400 font-semibold'>{dt.name}</span></div>
                  <div className='h-12 flex items-start'>
                    <a href={dt.website} target="_blank" rel="noopener noreferrer">
                      <span className='text-orange-400 hover:text-orange-300 text-xs italic'>{dt.website}</span>
                    </a>
                  </div>
                </div>
                <div className='col-span-3 h-6 text-center'><span className='text-gray-400 text-xs'>Componentes cadastrados no sistema: {dt.Components.length}</span></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Brands;