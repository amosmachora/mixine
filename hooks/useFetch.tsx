"use client";

import axios, { AxiosHeaders, AxiosRequestConfig, Method } from "axios";
import { useEffect, useState } from "react";

export function useFetch<T>(
  url: string,
  method: Method,
  headers: object | null
) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<Error | any>(null);

  const fetchFunction = async () => {
    setIsFetching(true);
    const options: AxiosRequestConfig<T> = {
      method,
      url,
      headers: headers || {},
    };
    try {
      const { data } = await axios.request<T>(options);
      setData(data);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isFetching,
    data,
    errors,
    fetchFunction,
  };
}
