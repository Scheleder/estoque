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
          <div className="mx-2 my-4 p-4 shadow-md rounded-xl bg-gray-50 border border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className="w-64 px-3 py-1.5 pl-8 border border-gray-200 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Buscar por usuário..."
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
              <span className='text-gray-500 text-xs font-medium bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200'>
                {searchItem ? `Filtro: ${filteredData.length} de ${data.length} usuários` : `Total: ${data.length} usuários`}
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
