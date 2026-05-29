import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api }  from '@/services/config';
import Loading from '@/components/loading';
import ButtonAdd from '@/components/buttonAdd';
import ErrorPage from "../utils/ErrorPage"
import { LocalAdd } from './LocalAdd';
import { Filter, ListFilter, X, RotateCcw } from 'lucide-react';

const Locals = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('locals');
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
          <div className="mx-2 my-4 p-4 shadow-md rounded-xl bg-gray-50 border border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className="w-64 px-3 py-1.5 pl-8 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Buscar por local..."
                />
                <ListFilter size={14} className="absolute left-2.5 top-2 text-gray-400" />
                {searchItem && (
                  <RotateCcw
                    size={14}
                    className="absolute right-2.5 top-2 text-gray-600 hover:text-red-500 cursor-pointer"
                    onClick={clearSearchItem}
                  />
                )}
              </div>
            </div>
            <div>
              <LocalAdd />
            </div>
          </div>
          <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4">
            {filteredData.map((dt, index) => (
              <li key={index} className='w-80 grid grid-cols-3 shadow-lg rounded-md bg-indigo-100 p-2'>
                <div className=''>
                  <Link to={`/locals/${dt.id}`}>
                    <img src="src/assets/armazem.png" alt="user" width={80} height={80} className='rounded-full border-2 border-white origin-center hover:rotate-45' />
                  </Link>
                </div>
                <div className='col-span-2'>
                  <div className='h-12 flex items-end'><span className='text-blue-400 font-semibold'>{dt.name}</span></div>
                  <div className='h-12 flex items-start'><span className='text-white italic'>{dt.website}</span></div>
                </div>
                <div className='col-span-3 h-6 text-center'><span className='text-gray-400 text-xs'>Itens no estoque: {dt.Items.length}</span></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Locals;