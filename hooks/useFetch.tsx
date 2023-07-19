"use client";

import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  Method,
} from "axios";
import { useEffect, useState } from "react";

export function useFetch<T>(
  url: string,
  method: Method,
  headers: object | null,
  fetchOnMount: boolean | undefined,
  body: object | null
): [T | null, boolean, AxiosError | null, () => Promise<T | null>] {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<AxiosError | null>(null);

  const fetchFunction = async (): Promise<T | null> => {
    setIsFetching(true);
    const options: AxiosRequestConfig<T> = {
      method,
      url,
      headers: headers || {},
    };
    try {
      if (method === "POST") {
        // @ts-ignore
        const { data } = await axios.post(url, body, options);
        setData(data);
        return data;
      } else {
        const { data } = await axios.request<T>(options);
        setData(data);
        return data;
      }
    } catch (error) {
      setErrors(error as AxiosError);
      return null;
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (fetchOnMount) {
      fetchFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, isFetching, errors, fetchFunction];
}
