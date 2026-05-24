import axios from 'axios';
import { useNavigate } from 'react-router';
import React, { useEffect } from 'react';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use(
  config => {    
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers.Accept = '*/*';
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

// Hook customizado para adicionar o redirecionamento
const useApiInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 400 || error.response.status === 401) {
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export { api, useApiInterceptor };
