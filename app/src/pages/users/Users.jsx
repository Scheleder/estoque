import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api }  from '@/services/config';
import Loading from '@/components/loading';
import ErrorPage from "../utils/ErrorPage"
import { Filter, ListFilter, X, RotateCcw } from 'lucide-react';

const Users = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('users');
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
      ) : data.length === 0 ? (
        <div className="zeroItems">Não há items.</div>
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
            <div className='text-right items-center p-4'>
              <span className='text-gray-400 text-sm'>
                Total de {data.length} usuários cadastrados no sistema.
              </span>
            </div>
          </div>
          <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4">
            {filteredData.map((dt, index) => (
              <li key={index} className='w-80 grid grid-cols-3 shadow-lg rounded-md bg-indigo-100 p-2'>
                <div className='col-span-1 h-24'>
                  <Link to={`/users/${dt.id}`}>
                    <img src="src/assets/usuario.png" alt="user" width={80} height={80} className='rounded-full border-2 hover:border-blue-300 border-white origin-center hover:-rotate-45' />
                  </Link>
                </div>
                <div className='col-span-2'>
                  <div className='h-8 flex items-end'><span className='text-blue-400 font-semibold'>{dt.name}</span></div>
                  <a href={`mailto:${dt.email}`} target="_blank" rel="noopener noreferrer">
                    <span className='text-gray-500 hover:text-orange-300 text-xs italic'>{dt.email}</span>
                  </a>
                  {dt.admin ? <p className='text-yellow-600 text-xs font-bold'>Administrador do sistema</p> : ''}
                </div>
                <div className='col-span-3 h-6 text-center'><span className='text-gray-400 text-xs'>Movimentações de estoque nos ultimos 30 dias: {dt.Movements.length}</span></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Users;
